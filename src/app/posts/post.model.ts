import { Comment } from './comment.model';

export class Post {
    


    constructor(
        private _eigenaarId: Number,
        private _eigenaar: string,
        private _caption: string,
        private _afbeelding: string,
        private _id = 0,
        private _comments = new Array<Comment>(),
        private _datum = new Date(),
       
        // private _afbeelding: File
    ){
        
     }

    static fromJSON(json: any): Post {
        const rec = new Post(
            json.eigenaarId,
            json.eigenaar,
            json.caption,
            json.afbeelding,
            json.id,
            json.comments.map(Comment.fromJSON),
            json.datum,
          
            //, afbeelding?
        );
       
        console.log(json);
        return rec;
    }
    toJSON(): any {
        return {
            eigenaarId: this._eigenaarId,
            eigenaar: this._eigenaar,
            caption: this._caption,
            afbeelding: this._afbeelding,
            comments: this._comments.map(ing => ing.toJSON())
            //  afb
        };
    }
    get eigenaar(): string {
        return this._eigenaar;
    }
    get afbeelding(): string {
        return this._afbeelding;
    }
    get datum(): Date {
        return this._datum;
    }
    set id(id:number){
        this._id = id;
    }
    get id(): number{
        return this._id;
    }
    get comments(): Comment[] {
        return this._comments;
    }
    get caption(): string {
        return this._caption;
    }

    get eigenaarId(): Number{
        return this._eigenaarId;
    }
    addComment( comment: Comment) {
        this._comments.push(comment);
    }
}
