import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth) { this.isLoggedIn$ = this.afAuth.authState.pipe(
    map(user => !!user)
  ); }

  async signInWithEmail(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signUpWithEmail(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async signOut() {
    return await this.afAuth.signOut();
  }

  // Other authentication logic and methods
}
