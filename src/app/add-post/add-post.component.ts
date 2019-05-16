import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PostDataService } from '../post-data.service';
import { HttpClient } from '@angular/common/http';
import { Post } from '../posts/post.model';
import { Router } from '@angular/router';
import { CurrentUserService } from '../current-user.service';
import { AuthenticationService } from '../user/authentication.service';
import { User } from '../user-model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
 //@Output() public newPost = new EventEmitter<Post>();
  image;
  myForm: FormGroup;
  


  changeListener($event) : void {
      this.readThis($event.target);
    }

    readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    // console.log(myReader.result/*.replace("data:image/png;base64,", "")*/);
    console.log(this.image);
    
    }
    myReader.readAsDataURL(file);}
  

    onSubmit() {
      let data:string;
        if (this.image != null){
      data = this.image;     
        }
        else{
          data="leeg";
        }
   //   console.log(data);
  //
      
   //  this._currentUser.geefDetails().subscribe(val => console.log(val));
      //this.addNewPost(new Post(this._currentUser.user.id,this._currentUser.user.naam,this.myForm.value.caption, data));
      //this.addNewPost(new Post(2,this._currentUser.userObject$.getValue().firstName.toString()+" "+this._currentUser.userObject$.getValue().lastName,this.myForm.value.caption, data));
   
      this._currentUser.geefDetails().subscribe(val => 
        this.addNewPost(new Post(val.id,val.firstName+" "+val.lastName, this.myForm.value.caption,data)));
      
     // this.addNewPost(new Post(2,"voorlopigeposter",this.myForm.value.caption, data));
    
    }




  constructor(private fb: FormBuilder, private _postDataService: PostDataService, private _router: Router, private _currentUser: AuthenticationService) { }

    ngOnInit() {

    this.myForm = this.fb.group({
      caption: ''
      
    })

    this.myForm.valueChanges.subscribe(console.log);
  }

  addNewPost(post) {
    this._postDataService.addNewPost(post).subscribe(()=>this.changeNavigation());
    
  }

  changeNavigation(){
    this._router.navigate(['/post-list']);
  }

}
