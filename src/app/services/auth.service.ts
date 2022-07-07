import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
// import { EnvService } from './env.service';
// import {ApiResponse, LoginResponse} from '../models';
// import { getLocalStorage, setLocalStorage, localStorage.removeItem, cleanObject } from '../helpers';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token: string | null = null;
  depth = 0;
  user: any;

  constructor(private http: HttpClient,
    private router: Router,
    // private toastr: ToastrService,
    // private env: EnvService,
    ) {
      this.user = !this.user ? this.getUser() : this.user;
     }

  async postLogin(data: any, element: any): Promise<any> {
    // const payload = cleanObject(data);
    const payload = data;
    // console.log('auth.service: payload =>', payload, this.env.API_URL + '/staff/login');
    const response = this.http.post(environment.CURRENT_URL + '/erp/staff/login', payload)
    .pipe(tap(async (res: any) => {
      // element.removeClass('running');
      //  console.log('auth.service: res =>', res);
      if (res.success) {
        // this.showNotification(`Login successful<br/>Welcome! PML Terminal`);
        const { token } = res.payload;
        // setLocalStorage('token', token, null);
        localStorage.setItem('token', token);

        const userData = this.http.get(environment.CURRENT_URL + '/erp/staff/me').pipe( tap( (staffData: any) => {
          if (staffData.success) {
            this.user = staffData.payload;
            localStorage.setItem('user', this.user);
          }
        }, e => {
          console.log( 'Token error => ', e);
        }));
        await userData.toPromise();
        // const goingTo = payload.otp ? '/forgot-password' : '/dashboard';
        this.token = token;
        this.isLoggedIn = true;
        console.log('token', this.token);
        console.log('User Data', this.user);
        // this.router.navigate([goingTo]);
      } else {
        // this.showNotification(res.message);
        this.token = null;
        this.isLoggedIn = false;
      }
      }, (err) => {
      // element.removeClass('running');
    //   this.showNotification(err);
      this.token = null;
      this.isLoggedIn = false;
    }));
      return await response.toPromise();
  }


//   showNotification(message: string) {
//     this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
//       timeOut: 8000,
//       closeButton: true,
//       enableHtml: true,
//       toastClass: 'alert alert-primary alert-with-icon',
//     });
//   }

  register(data: any) {
    // const payload = cleanObject(data);
    const payload = data;
    return this.http.post(environment.CURRENT_URL + '/staff', payload);
  }

  getUser(): any {
    if(!!this.user) return this.user;
    return JSON.parse(localStorage.getItem('user') as string);
  }

  public async getToken(): Promise<any> {
    try {
      const token = JSON.parse(localStorage.getItem('token') as string);
      if (token != null) {
        this.token = token;
        this.isLoggedIn = true;
      } else {
        this.token = null;
        this.isLoggedIn = false;
      }
      return token;
    } catch (e) {
      console.log(e);
      alert(JSON.stringify(e));
      return null;
    }
  }

  userLogOut(): void {
    this.isLoggedIn = false;
    this.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return (!!JSON.parse(localStorage.getItem('user') as string)) ? true : false;
  }

}
