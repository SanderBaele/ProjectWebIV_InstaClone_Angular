import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../comment.model';
import { PostDataService } from '../../post-data.service';
import { CurrentUserService } from '../../current-user.service';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../user-model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() public post: Post;
  myForm: FormGroup;


  constructor(private fb: FormBuilder,
     private _postDataService: PostDataService,
    private _currentUser: AuthenticationService) {

  }

  onSubmit(post: Post) {
    let u: User;
    
    this._currentUser.geefDetails().subscribe(val =>{ 
      u=val;
      post.addComment(new Comment(u.firstName.toString()+" "+u.lastName.toString(),this.myForm.value.reactie));
      this.voegToeAanDatabase(post);
    });



  

  }
  voegToeAanDatabase(post:Post){
     this._postDataService.updatePost(post).subscribe(console.log);
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      reactie: ''

    })

    this.myForm.valueChanges.subscribe(console.log);
  }

}
