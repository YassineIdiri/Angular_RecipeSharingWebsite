import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { map,tap } from 'rxjs/operators'; // Importer map depuis rxjs/operators

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password2: [null, [Validators.required]],
    });
  }

onSubmitFormLogin() {
  this.loginService.login(this.loginForm.value).subscribe({
    next:(response)=>{
      localStorage.setItem("jwt",response.jwt);
      this.loginService.getUserProfile().subscribe();
      this.router.navigateByUrl('/');
    }
  })
     
}
onSubmitFormRegister() {
  this.loginService.register(this.registerForm.value).subscribe({
    next:(response)=>{
      this.router.navigateByUrl('/');
    }
  })
}

}
