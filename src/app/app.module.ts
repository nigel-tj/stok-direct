import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
//import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { IConfig, NgxMaskModule } from 'ngx-mask'

import { environment } from '../environments/environment'
import { AppMaterialModule } from './app-material.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthHttpInterceptor } from './auth/auth-http-interceptor'
import { authFactory } from './auth/auth.factory'
import { AuthService } from './auth/auth.service'
import { SimpleDialogComponent } from './common/simple-dialog.component'
import { HomeComponent } from './home/home.component'
import { InventoryModule } from './inventory/inventory.module'
import { LoginComponent } from './login/login.component'
import { ManagerModule } from './manager/manager.module'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { RegistrationComponent } from './registration/registration.component'
import { FieldErrorModule } from './user-controls/field-error/field-error/field-error.module'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {
  showMaskTyped: true,
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    SimpleDialogComponent,
    NavigationMenuComponent,
    RegistrationComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FieldErrorModule,
    ManagerModule,
    NgxMaskModule.forRoot(options),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAuth(() => getAuth()),
    InventoryModule,
  ],
  providers: [
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [AngularFireAuth, HttpClient],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
