import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Sports } from '../../providers/sports';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }


  async onSubmit(){
    this.loading = true;
    const payload = this.loginForm.value;
    const currentElm = document.getElementsByClassName('button');
    

    if(this.loginForm.invalid){
      this.loading = false;
      console.log('Error Message =>', 'Fill in the required fields');
      return;
    }
    
    await this.authService.postLogin(payload, currentElm);
  }

}
