import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset]) // different breakpoints for different screen sizes https://material.angular.io/cdk/layout/overview
    .pipe(
      map(result => result.matches),
      shareReplay() // subscribe to this observable multiple times using async, sharereplay make sure all of them get the newest value
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  logout() {
    this.afAuth.auth.signOut().finally(() => {
      this.router.navigate(['login']);
    });
  }
}
