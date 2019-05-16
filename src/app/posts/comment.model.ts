export class Comment {
    constructor(
      /*  private _posterId: Number,*/
        private _posterNaam: string,
        private _beschrijving: string,
        private _datum = new Date()
    ) { }

    static fromJSON(json: any): Comment {
        const ing = new Comment(/*json.posterId, */json.posterNaam, json.beschrijving, json.datum);
        return ing;
    }

    toJSON(): any {
        return {/* posterId: this._posterId, */posterNaam: this._posterNaam, beschrijving: this._beschrijving, datum: this._datum };
    }

    get posterNaam() {
        return this._posterNaam;
    }
    get beschrijving() {
        return this._beschrijving;
    }
    get datum() {
        return this._datum;
    }
}
