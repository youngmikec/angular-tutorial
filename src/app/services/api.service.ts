import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(private http: HttpClient){}

    getApi(endPointUrl: string): Observable<any>{
        const response = this.http.get(endPointUrl).pipe(
            map((res: any) => res)
        )
        return response;
    }
}