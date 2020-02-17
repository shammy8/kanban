import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
    <h1 mat-dialog-title>Board</h1>
    <div mat-dialog-content>
      <p>Name of the Board</p>
      <mat-form-field>
        <input placeholder="Title" matInput [(ngModel)]="data.title" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button
        mat-stroked-button
        [mat-dialog-close]="data.title"
        cdkFocusInitial
      >
        Create
      </button>
      <button mat-button (click)="onNoClick()">Cancel</button>
    </div>
  `,
  styles: [],
})
export class BoardDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }
}
