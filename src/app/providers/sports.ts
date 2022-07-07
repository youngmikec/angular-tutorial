import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Sports {
    url: string = environment.BASE_URL;
    apiKey: string = environment.API_KEY;
    constructor(private apiService: ApiService){}

    retrieveSportRecords(queryString: string): Observable<any>{
        let url = `${this.url}?key=${this.apiKey}`
        url += queryString != '' ? `&q=${queryString}` : '';

        return this.apiService.getApi(url).pipe(
            map((res: any) => res)
        )
    }

    createSport(payload: any){
        return this.apiService.postApi(this.url, payload).pipe(
            map((res: any) => res)
        )
    }
}