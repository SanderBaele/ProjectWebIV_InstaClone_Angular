import { Injectable } from '@angular/core';
import { User } from './user-model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {


  private _userNaam: String;

  constructor(private http: HttpClient) {

  }

  set userNaam(naam: String) {
    this._userNaam = naam;
  }


  get userNaam(): String {
    return this._userNaam;
  }

}
