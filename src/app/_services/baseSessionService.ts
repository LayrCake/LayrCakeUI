import { Http, Response, Request, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class BaseSessionService {
    private errMessages: string[];
    protected baseUrl: string = 'http://13.93.125.180:8731';

	constructor() {
	}

    prepareRequest() : RequestOptions {
        let token = localStorage.getItem("accessToken");
        let headers = new Headers({ "Authorization": "Bearer " + token });
        let options = new RequestOptions({ headers: headers });
        return options;
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