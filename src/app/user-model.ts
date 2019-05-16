import { Post } from './posts/post.model';

export class User {



    [x: string]: any;
    constructor(
        
        private _firstName: string,
        private _lastName: string,
        private _id: number

       

    ) {

    }

    static fromJSON(json: any): User {
        var rec;
        if (json != null) {
            rec = new User(
                json.firstName,
                json.lastName,
                json.id
                //,
                // json.posts.map(Post.fromJSON)
            );
        }
        else {
            rec = null;
        }



        return rec;
    }
    toJSON(): any {
        return {

            firstname: this._firstName,
            lastname: this._lastName,
            id:this._id
        };
    }




    /*  get posts(): Post[] {
          return this._posts;
      }*/
    get firstName(): string {
        return this._firstName;
    }
    get lastName(): string {
        return this._lastName;
    }

    get id(): number{
        return this._id;
    }
    /*  addPost(post: Post) {
          this._posts.push(post);
      }*/
}
