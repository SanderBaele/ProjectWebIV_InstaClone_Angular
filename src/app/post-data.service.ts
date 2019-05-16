import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './posts/post.model';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './user-model';


@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  handleError: any;
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) { }

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

  getUser$(email: string): Observable<User> {

    let params = new HttpParams().set("email",email);

    return this.http.get(`${environment.apiUrl}/user/`,{params: params}).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }), map((p: any) => User.fromJSON(p)));
}







  getPost$(id): Observable<Post> {
    console.log(`${environment.apiUrl}/posts/${id}`);
    return this.http
      .get(`${environment.apiUrl}/recipes/${id}`)
      .pipe(map((rec: any): Post => Post.fromJSON(rec)));
  }



}
