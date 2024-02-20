import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<any | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // If necessary, expand this logic to include more user fields or additional user state management, e.g., querying a Firestore collection with user metadata.
          return of(user);
        } else {
          return of(null);
        }
      })
    );
  }

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
