import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, HttpModule, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { RouteErrors, IUserLogin, IUserRegister } from '_models/interfaces';
import {  } from '_models/interfaces';

@Injectable()
export class AuthService {
    private baseUrl: string = 'http://13.93.125.180:8731';
    private loginUrl: string = this.baseUrl + '/token';
    private registerUrl: string = this.baseUrl + '/api/account/register';
    private logoutUrl: string = this.baseUrl + '/api/account/logout';
    private errMessages: string[];

    public isAuthenticated: boolean = false;
    public redirectUrl: string;
    @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: Http, private router: Router) {
        this.errMessages = [];
     }

    private userAuthChanged(status: boolean) {
        this.authChanged.emit(status); //Raise changed event
    }

    login(userLogin: IUserLogin): Observable<boolean> {
        let body = "username=" + userLogin.email + "&password=" + userLogin.password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.loginUrl, body, options)
            .map((response: Response) => {
                localStorage.setItem('accessToken', response.json().access_token);
                localStorage.setItem('expiresIn', response.json().expires_in);
                localStorage.setItem('tokenType', response.json().token_type);
                localStorage.setItem('userName', response.json().userName);
                localStorage.setItem('currentUser', JSON.stringify({ username: response.json().userName, token: response.json().access_token }));

                let loggedIn = response.ok;
                this.isAuthenticated = true;
                this.userAuthChanged(loggedIn);

                return loggedIn;
            }).catch(this.handleError);;
    }

    logout(): Observable<boolean> {
        localStorage.clear();
        return this.http.post(this.logoutUrl, null)
            .map((response: Response) => {
                const loggedOut = response.ok;
                this.isAuthenticated = !loggedOut;
                this.userAuthChanged(!loggedOut); //Return loggedIn status
                return status;
            }).catch(this.handleError);
    }

    register(userRegister: IUserRegister): Observable<boolean> {
        return this.http.post(this.registerUrl, userRegister)
            .map((response: Response) => {
                return status;
            }).catch(this.handleModelError);;
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

    handleModelError(error: any) {
        this.errMessages = [];
        console.error('server error:', error);
        if (error instanceof Response) {
            try {
                let validationErrorDictionary = JSON.parse(error.text());
                for (var key in validationErrorDictionary.ModelState) {
                    for (var i = 0; i < validationErrorDictionary.ModelState[key].length; i++) {
                        this.errMessages.push(validationErrorDictionary.ModelState[key][i]);
                    }
                }
            } catch (err) {
                this.errMessages.push(error.statusText);
            }
            return Observable.throw(this.errMessages);
        }
        return Observable.throw(error || 'Node.js server error');
    }
}