import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, CanActivate } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './selective-preload-strategy';

import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { CurrentUserService } from './current-user.service';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './user/auth.guard';
import { ProfielComponent } from './profiel/profiel.component';


const appRoutes: Routes = [

  {
    path: '', canActivate: [AuthGuard], component: PostListComponent
  }, {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'post-list', component: PostListComponent
  },
  {
    path: 'page-not-found', component: PageNotFoundComponent
  },

  {
    path: 'add-post', canActivate: [AuthGuard], component: AddPostComponent
  },
  {
    path: 'profiel', canActivate: [AuthGuard], component: ProfielComponent
  },



  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadStrategy,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
