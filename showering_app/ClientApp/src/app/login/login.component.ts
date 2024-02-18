import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        console.log('You are successfully logged in!');
        this.router.navigate(['/']); // Navigate to home or dashboard page after login
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        // Update the loginError property with a user-friendly message
        if (err.code === 'auth/invalid-login-credentials' || err.code === 'auth/user-not-found') {
          this.loginError = 'Incorrect email or password. Please try again.';
        } else {
          this.loginError = 'An error occurred during login. Please try again later.';
        }
      });
  }
}
