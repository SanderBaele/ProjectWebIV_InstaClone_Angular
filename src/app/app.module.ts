import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';


import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './posts/post/post.component';
import { CommentComponent } from './posts/comment/comment.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './user/login/login.component';
import { PostListComponent } from './post-list/post-list.component';
import { RegisterComponent } from './user/register/register.component';
import { UserModule } from './user/user.module';
import { httpInterceptorProviders } from './interceptors';
import { ProfielComponent } from './profiel/profiel.component';


@NgModule({
  declarations: [ AppComponent, MainNavComponent, PageNotFoundComponent, PostComponent, CommentComponent,AddPostComponent, LoginComponent, PostListComponent, RegisterComponent, ProfielComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    
    UserModule
    
    
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
