import { DatePipe, formatDate } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, catchError, map, tap } from 'rxjs'
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

interface FrappeUser {
  name: string
  email: string
  first_name: string
  last_name: string
  //gender: string
  middle_name?: string
  birth_date: Date | null | string
  mobile_no: string
  phone: string
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends CacheService implements IUserService {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    public authService: AuthService
  ) {
    super()
  }
  getUser(): Observable<IUser> {
    return this.authService.currentUser$
  }

  updateUser(id: string, user: IUser): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      observe: 'response' as 'response',
    }
    if (!user) {
      throw new Error('User not is not set')
    }
    // cache user data in case of errors
    this.setItem('draft-user', Object.assign(user, { _id: user._id }))

    const updateResponse$ = this.httpClient
      .put<IUser>(
        `${environment.apiURL}/api/resource/User/${id}`,
        this.buildFrappeUser(user)
      )
      .pipe(
        map((data) => {
          return this.transformFrappeUser(data)
        }),
        catchError(transformError)
      )

    updateResponse$.subscribe(
      (res) => {
        console.log('PUT map operation: ', res)
        this.authService.currentUser$.next(res)
        this.removeItem('draft-user')
      },
      (err) => {
        console.log(err)
        throw new Error(err)
      }
    )
    return updateResponse$
  }

  private transformFrappeUser(frappeUser: any | null): User {
    if (!frappeUser) {
      return new User()
    }

    return User.Build({
      name: {
        first: frappeUser?.first_name || 'Firebase',
        last: frappeUser?.last_name || 'User',
      },
      picture: frappeUser.photoURL,
      email: frappeUser.email,
      _id: frappeUser.userId,
      role: $enum(Role).asValueOrDefault(frappeUser.role, Role.None),
    } as IUser)
  }

  private buildFrappeUser(data: IUser): FrappeUser {
    console.log('buildFrappeUSer: ', data)
    let convertedDate = formatDate(data.dateOfBirth!, 'yyyy-MM-dd', 'en_US')
    return {
      name: data._id,
      email: data.email,
      first_name: data.name.first,
      last_name: data.name.last,
      middle_name: data.name.middle,
      birth_date: convertedDate,
      phone: '',
      mobile_no: '',
    }
  }

  registerNewUser(name: string, email: string) {
    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
    })
    let options = {
      headers: headers,
      withCredentials: true,
      observe: 'response' as 'response',
    }

    let body = new URLSearchParams()
    body.set('email', email)
    body.set('full_name', name)
    body.set('redirect_to', '')
    this.httpClient
      .post(
        `${environment.apiURL}/api/method/frappe.core.doctype.user.user.sign_up/`,
        body,
        options
      )
      .pipe(
        tap((data: any) => {
          console.log('Trying to register', data)
        })
      )
      .subscribe(
        (data) => {
          console.log('In subscribe', data)
          this.router.navigate(['/login'])
        },
        (err) => this.router.navigate(['/signup'])
      )
  }
}
