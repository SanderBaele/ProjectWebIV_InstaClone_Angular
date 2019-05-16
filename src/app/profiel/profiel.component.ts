import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../posts/post.model';
import { PostDataService } from '../post-data.service';
import { AuthenticationService } from '../user/authentication.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.css']
})
export class ProfielComponent {



  private _fetchPosts$: Observable<Post[]>
   = this._postDataService.posts$;

  constructor(private _postDataService: PostDataService, private _currentUser: AuthenticationService) { }

  get posts$(): Observable<Post[]> {
   /* let n: number;
    this._currentUser.geefDetails().subscribe(val =>
      n = val.id
    );*/

    return this._fetchPosts$;/*.pipe(

     filter(item:Post => item. == 1)
    )*/


  }


}
