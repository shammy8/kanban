import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset]) // different breakpoints for different screen sizes https://material.angular.io/cdk/layout/overview
    .pipe(
      map(result => result.matches),
      shareReplay() // subscribe to this observable multiple times using async, sharereplay make sure all of them get the newest value
    );
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
