import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private authService: AuthService, private router: Router) { }

  isExpanded = false;
  isLoggedIn$ = this.authService.isLoggedIn$;

  navigate(path: string) {
    this.router.navigate([path]);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;

  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
      console.log("You are successfully logged out!")
    }).catch(error => {
      console.error('Logout error', error);
    });
  }

}
