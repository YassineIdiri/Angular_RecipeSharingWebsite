import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common'; // Importez CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterLink,
    RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user:any = null;

  constructor(private router: Router,private loginService: LoginService) { }

  ngOnInit()
  {
    this.loginService.getUserProfile().subscribe();
    this.loginService.authSubject.subscribe(
        (auth)=>{
          this.user = auth.user
        })
  }

    home() {
    this.router.navigateByUrl('/');
    }

    handleLogout(){
      this.loginService.logout();
      this.router.navigateByUrl('/');
    }
}
