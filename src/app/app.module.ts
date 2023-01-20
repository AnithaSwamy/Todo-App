import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TodoformComponent } from './components/todo/todoform/todoform.component';
import { TodolistComponent } from './components/todo/todolist/todolist.component';
import { NotfoundComponent } from './components/others/notfound/notfound.component';
import { NetworkerrorComponent } from './components/others/networkerror/networkerror.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';

import { TodoService } from './services/todo.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    TodoformComponent,
    TodolistComponent,
    NotfoundComponent,
    NetworkerrorComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      // disableTimeOut: true,
      positionClass: 'toast-bottom-center',
      closeButton: true,
      progressBar: false,
      preventDuplicates: true,
    }),
  ],
  providers: [TodoService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
