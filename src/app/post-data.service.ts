import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './posts/post.model';
import { Observable, Subject, of } from 'rxjs';

import { environment } from '../environments/environment';
import { User } from './user-model';
import { AuthenticationService } from './user/authentication.service';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  handleError: any;
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient, private currentUser: AuthenticationService) { }

  get posts$(): Observable<Post[]> {
    return this.http.get(`${environment.apiUrl}/posts/`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map((list: any[]): Post[] => list.map(Post.fromJSON)),
      map(lessons => lessons.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime()))
    );
  }


  addNewPost(post: Post) {
    console.log("post om te versturen:")
    console.log(post);
    return this.http.post(`${environment.apiUrl}/posts/`, post.toJSON());
  }


  updatePost(post: Post) {
    console.log(post);


    return this.http.put(`${environment.apiUrl}/posts/${post.id}`, post.toJSON());


  }




  verwijderPost$(id:number) {
    console.log("in verwijderpost:" + id)
    return this.http.delete(`${environment.apiUrl}/posts/${id}`);
  }



  get UserPosts$(): Observable<Post[]> {


    let params = new HttpParams().set("email", this.currentUser.user$.getValue());

    /* return this.http.get(`${environment.apiUrl}/user/`, { params: params }).pipe(
       catchError(error => {
 
         this.loadingError$.next(error.statusText);
         return of(null);
       }), map((p: any) => User.fromJSON(p)));*/


    return this.http.get(`${environment.apiUrl}/posts/userposts/${this.currentUser.user$.getValue()}`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map((list: any[]): Post[] => list.map(Post.fromJSON)),
      map(lessons => lessons.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime()))
    );
    /*let params = new HttpParams().set("email", this.currentUser.user$.getValue());
    
    
      return this.http.get(`${environment.apiUrl}/user/`, { params: params }).pipe(
    
        map((list: any[]): Post[] => list.map(Post.fromJSON)),
        map(lessons => lessons.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime()))
      );*/


  }

}
