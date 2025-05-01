import { NgModule }                    from '@angular/core';
import { BrowserModule }               from '@angular/platform-browser';
import { AppRoutingModule }            from './app-routing.module';
import { MaterialModule } from './material.module';


// make sure these paths are correct!
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }            from './app.component';
import { LettersOnlyDirective }    from './shared/letters-only.directive';
import { LoginComponent }          from './Component/login/login.component';
import { RegisterComponent }       from './Component/register/register.component';
import { UserComponent }           from './Component/user/user.component';
import { NotFoundComponent }       from './Component/not-found/not-found.component';

import { RequestInterceptor }      from './services/request.interceptor';
import { ResponseInterceptor }     from './services/response.interceptor';
import { HeaderComponent } from './Component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LettersOnlyDirective,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,

    // <-- these two must be here so your login/register forms work
    FormsModule,
    ReactiveFormsModule,

    // <-- this one must be here so all HttpClient calls work
    HttpClientModule
  ],
  providers: [
    // <-- and these two so your interceptors actually get wired up
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
