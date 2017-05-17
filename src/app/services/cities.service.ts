import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { City } from '../models/city.model';

@Injectable()
export class StatesService {

    constructor (private http: Http) { }

    private apiUrl = 'http://localhost/CoreApiBooks/api/cities';
    
    getList() : Observable<City[]> {  
        return this.http.get(this.apiUrl)                        
                        .map((res:Response) => res.json())                 
                        .catch((error:any) => Observable.throw(error.json().error || error));                        
    }   

    addItem (body: Object): Observable<City> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiUrl, body, options)
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }     
    
    getItem (id: string) : Observable<City> {
        return this.http.get(`${this.apiUrl}/${id}`)                        
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || error));

     }      

    updateItem (body: Object): Observable<City> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.apiUrl}/${body['id']}`, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }  

    removeItem (id:string): Observable<City> {
        return this.http.delete(`${this.apiUrl}/${id}`)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));                       
    }
}