import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { sign } from 'fake-jwt-sign'
import { Observable, Subject, map, of, pipe, switchMap, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { $enum } from 'ts-enum-util'

import { IUser, User } from '../user/user/user'
import { Role } from './auth.enum'
import {
  AuthService,
  IAuthStatus,
  IServerAuthResponse,
  defaultAuthStatus,
} from './auth.service'

interface IJwtToken {
  email: string
  first_name: string
  last_name: string
  username: string
  user_type: string
  photoURL: string
  role: string
}

interface FrappeResponse {
  message: string
  home_page: string
  full_name: string
}

@Injectable()
export class FrappeAuthService extends AuthService {
  returnedFrappeUser!: User

  constructor(private httpClient: HttpClient) {
    super()
  }

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    const serverResponse$ = new Subject<IServerAuthResponse>()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      observe: 'response' as 'response',
    }

    this.httpClient
      .post<FrappeResponse>(
        `${environment.apiURL}/api/method/login`,
        {
          usr: email,
          pwd: password,
        },
        httpOptions
      )
      .subscribe((data) => {
        if (data.body?.message == 'Logged In') {
          console.log('***************login in subscribe: ', data)
        }
      })

    this.httpClient
      .get<any>(`${environment.apiURL}/api/resource/User/${email}`, httpOptions)
      .pipe(
        map((data) => {
          console.log('get user from frappe: ', data)
          let frappeUser = data.body.data

          return {
            userId: frappeUser.name,
            first_name: frappeUser.first_name,
            last_name: frappeUser.last_name,
            email: frappeUser.email,
            username: frappeUser.username,
            user_type: frappeUser.user_type,
            photoURL: frappeUser.image,
            role: 'manager',
          }
        })
      )
      .subscribe((data) => {
        this.returnedFrappeUser = this.transformFrappeUser(data)
        //console.log('get user after loggin: ', this.returnedFrappeUser)
        const authResponse = {
          accessToken: sign(data, 'secret', {
            expiresIn: '1h',
            algorithm: 'none',
          }),
        } as IServerAuthResponse
        serverResponse$.next(authResponse)
      })

    return serverResponse$
  }
  protected transformJwtToken(token: IJwtToken): IAuthStatus {
    if (!token) {
      defaultAuthStatus
    }
    //console.log('Frappe ****** transformJwtToken: ', token)
    return {
      isAuthenticated: token.email ? true : false,
      userId: token.email,
      userRole: $enum(Role).asValueOrDefault(token.role, Role.None),
      userEmail: token.email,
      userPicture: token.photoURL,
    } as IAuthStatus
  }
  protected getCurrentUser(): Observable<User> {
    console.log('curent user: ', this.returnedFrappeUser)
    return of(this.returnedFrappeUser)
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
}
