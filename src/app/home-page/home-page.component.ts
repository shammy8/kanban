import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(private db: AngularFirestore) {}

  onClickMe() {
    const password = this.db
      .collection('posts')
      .doc('1')
      .valueChanges()
      .pipe(
        switchMap((post: { password: string }) => {
          return this.db
            .collection('posts with secret data')
            .doc(post.password)
            .valueChanges();
        })
      )
      .subscribe(data => console.log(data));
  }
}

interface Post {
  tags: string[];
}
