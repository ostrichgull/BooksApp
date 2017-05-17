import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GenericService<T> {

    private apiUrl : string;

    constructor (private http: Http) { }

    //private apiUrl = `http://localhost/CoreApiBooks/api/${this.getController()}`;

    setUrl(controller: string) {
        this.apiUrl = `http://localhost/CoreApiBooks/api/${controller}`
    }


    
    getList() : Observable<T[]> {  
        return this.http.get(this.apiUrl)                        
                        .map((res:Response) => res.json())                 
                        .catch((error:any) => Observable.throw(error.json().error || error));                        
    }   

    addItem (body: Object): Observable<T> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiUrl, body, options)
                         .map((res:Response) => res.json()) 
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }     
    
    getItem (id: string) : Observable<T> {
        return this.http.get(`${this.apiUrl}/${id}`)                        
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || error));

     }      

    updateItem (body: Object): Observable<T> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.apiUrl}/${body['id']}`, body, options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));
    }  

    removeItem (id:string): Observable<T> {
        return this.http.delete(`${this.apiUrl}/${id}`)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || error));                       
    }
}