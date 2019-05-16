import { Component, OnInit } from '@angular/core';
import { PostDataService } from '../post-data.service';
import { Observable } from 'rxjs';
import { Post } from '../posts/post.model';
import { CurrentUserService } from '../current-user.service';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent{

  private _fetchPosts$: Observable<Post[]>
  = this._postDataService.posts$;
  
    constructor(private _postDataService: PostDataService, private userService: PostDataService, private us: AuthenticationService) {
     
    
   //   this.userService.getUser$(this.us.user$.getValue()).subscribe(val => console.log(val));
 /*  console.log("naam van:"+this.us.user$.getValue());

              this.userService.getUser$(this.us.user$.getValue()).subscribe(val => console.log(val));*/

    }
  
    get posts$(): Observable<Post[]> {
      return this._fetchPosts$;
    }
  
    addNewPost(post) {
      this._postDataService.addNewPost(post).subscribe();
    }
    
}

