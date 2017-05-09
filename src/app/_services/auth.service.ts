import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, HttpModule, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IUserLogin } from '_models/interfaces';

@Injectable()
export class AuthService {
    private baseUrl: string = 'http://13.93.125.180:8731';
    private authUrl: string = this.baseUrl + '/token';
    public isAuthenticated: boolean = false;
    public redirectUrl: string;
    @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: Http) { }

    private userAuthChanged(status: boolean) {
        this.authChanged.emit(status); //Raise changed event
    }

    login(userLogin: IUserLogin): Observable<boolean> {
        let body = "username=" + userLogin.email + "&password=" + userLogin.password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.authUrl, body, options)
            .map((response: Response) => {
                localStorage.setItem('access_token', response.json().access_token);
                localStorage.setItem('expires_in', response.json().expires_in);
                localStorage.setItem('token_type', response.json().token_type);
                localStorage.setItem('userName', response.json().userName);

                let loggedIn = response.ok;
                this.isAuthenticated = loggedIn;
                this.userAuthChanged(loggedIn);

                return loggedIn;
            }).catch(this.handleError);;
    }

    logout(): Observable<boolean> {
        return this.http.post(this.authUrl + '/logout', null)
            .map((response: Response) => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires_in');
                localStorage.removeItem('token_type');
                localStorage.removeItem('userName');

                const loggedOut = response.ok;
                this.isAuthenticated = !loggedOut;
                this.userAuthChanged(!loggedOut); //Return loggedIn status
                return status;
            }).catch(this.handleError);
    }

    handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error_description;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }

}