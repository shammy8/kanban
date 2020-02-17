import { Directive, HostListener, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private zone: NgZone
  ) {}

  @HostListener('click')
  onclick() {
    from(
      // change promise to obeservable using from
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    ) // if use .then on the above promise, it will navigate to kanban outside ngzone, causing problems
      .pipe(
        first(),
        map(() => {
          this.zone.run(() => {
            this.router.navigate(['kanban']);
          });
        })
      )
      .subscribe();
  }
}
