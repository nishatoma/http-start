import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators'; 
import { throwError, Observable } from 'rxjs';


@Injectable()
export class ServerService {

    constructor(private http: Http) {}
    static readonly URL: string = 'https://udemy-ng-http-39e24.firebaseio.com/data.json';

    storeServers(servers: any[]) {
        // We can also add headers
        const hdrs = new Headers({'Content-Type': 'application/json'})
        // Returns an observable
        // return this.http.post(ServerService.URL,
        //     servers,
        //     {headers: hdrs});
        // --------------------------
        // put overrides data as opposed to appending.
        return this.http.put(ServerService.URL,
            servers,
            {headers: hdrs});
    }

    getServers() {
        return this.http.get(ServerService.URL + 'saddas').pipe(map((response: Response) => {
            // Now thanks to map, this will return JSON instead.
            const data = response.json();
            return data;
        })).pipe(catchError((error: Response) => {
            return throwError('Something went wrong :(');
        }));
    }

    getAppName() {
        return this.http.get('https://udemy-ng-http-39e24.firebaseio.com/appName.json').pipe(
            map((response: Response) => {
                return response.json();
            })
        );
    }
}