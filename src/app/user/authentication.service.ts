import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurrentUserService } from '../current-user.service';
import { PostDataService } from '../post-data.service';
import { User } from '../user-model';
/*
jwt = java web token
= username eruit halen, middenste element eruit halen
dan base 64 omzetten naar json
*/
function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {
  ngOnInit(): void {
    console.log("na refresh")
    console.log(this.user$.getValue())
  }
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;
  private _userObject$: BehaviorSubject<User>;
  public redirectUrl: string;
  public loadingError$ = new Subject<string>();
  constructor(private http: HttpClient) {
    /*kijken of token al bestaat (of al iemand ingelogd is) */
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    /*als token goed is extend lifetime*/
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    /*
behaviorsubject heeft standaard een value, als je erna subscribed zal de eerste waarde die je krijgt
deze waarde zijn
    */
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.unique_name
    );


    /* deze user is de ingelogde user, als deze veranderd zal iedereen die gesubscribed is
    deze nieuwe waarde krijgen*/
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }
  get userObject$(): BehaviorSubject<User> {
    return this._userObject$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account`,
        { email, password }, //= email:email, password:password
        { responseType: 'text' } //als je dit niet doet krijg je json, maar we krijgen een token dus we vragen een text
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(email); //de user updaten met de nieuwe
            this._userObject$ = new BehaviorSubject<User>(null);


            // KIJKEN OF DE PERSOON GOED GELADEN IS
            //  this.currentUser.getUser$(email).subscribe(val => console.log(val));
            /*   this.currentUser.getUser$(email).subscribe(val => this._userObject$.next(val));
              this.userObject$.subscribe(val => console.log(val));*/
            //     this.currentUser.getUser$(email).subscribe(val => console.log(val));
            // this.userObject$.subscribe(val => console.log(val));





            return true;
          } else {
            return false;
          }
        })
      );
  }
  geefDetails(): Observable<User> {
    // console.log("email in geefdetails="+this.user$.getValue());


    let params = new HttpParams().set("email", this.user$.getValue());

    return this.http.get(`${environment.apiUrl}/user/`, { params: params }).pipe(
      catchError(error => {

        this.loadingError$.next(error.statusText);
        return of(null);
      }), map((p: any) => User.fromJSON(p)));

  }




  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem(this._tokenKey);
      this._user$.next(null);
    }
  }

  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account/register`,
        {
          firstname,
          lastname,
          email,
          password,
          passwordConfirmation: password
        },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  checkUserNameAvailability = (email: string): Observable<boolean> => {


    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email }
      }
    );
  };

}
