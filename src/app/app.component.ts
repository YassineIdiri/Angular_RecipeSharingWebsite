import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component'
import { RouterOutlet } from '@angular/router';
import { LoginService } from "./services/login.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  user:any = null;
  constructor(public loginService: LoginService) { }

  ngOnInit()
  {
    this.loginService.getUserProfile().subscribe();
    this.loginService.authSubject.subscribe(
        (auth)=>{
          this.user = auth.user
        })
  }
}



