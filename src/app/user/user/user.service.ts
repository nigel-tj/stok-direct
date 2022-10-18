import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, map } from 'rxjs'
import { Role } from 'src/app/auth/auth.enum'
import { AuthService } from 'src/app/auth/auth.service'
import { CacheService } from 'src/app/auth/cache.service'
import { transformError } from 'src/app/common/common'
import { environment } from 'src/environments/environment'
import { $enum } from 'ts-enum-util'

import { IUser, User } from './user'

export interface IUserService {
  getUser(id: string): Observable<IUser>
  updateUser(id: string, user: IUser): Observable<IUser>
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
  observe: 'response' as 'response',
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends CacheService implements IUserService {
  constructor(private httpClient: HttpClient, public authService: AuthService) {
    super()
  }
  getUser(): Observable<IUser> {
    return this.authService.currentUser$
  }

  updateUser(id: string, user: IUser): Observable<IUser> {
    if (!user) {
      throw new Error('User not is not set')
    }
    // cache user data in case of errors
    this.setItem('draft-user', Object.assign(user, { _id: user._id }))

    const updateResponse$ = this.httpClient
      .put<IUser>(`${environment.apiURL}/resource/User/${user._id}`, user)
      .pipe(map(User.Build), catchError(transformError))

    updateResponse$.subscribe(
      (res) => {
        this.authService.currentUser$.next(res)
        this.removeItem('draft-user')
      },
      (err) => {
        throw new Error(err)
      }
    )
    return updateResponse$
  }
}
