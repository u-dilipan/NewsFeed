import { Component, Inject } from '@angular/core';
import { NewsApiService } from './news-api.service';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mPosts: Array<any>;
  mComments: Array<boolean> = [];

  postTitle: string;
  postDescription: string;
  searchString: string;

  constructor(private newsapi: NewsApiService, public dialog: MatDialog) {
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {

    this.newsapi.initPosts().subscribe(data => {
      this.mPosts = data['articles'];
      if(this.mPosts) {
        for (let i = 0; i < this.mPosts.length; i++) {
          this.mComments.push(false);
        }
      }
    });
  
  }

  searchPost() {
    if(!this.searchString) 
      return;
    this.searchString = null;
    // this.newsapi.getPostByID(source).subscribe(data => this.mPosts = data['articles']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {postTitle: this.postTitle, postDescription: this.postDescription}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
    });
  }

  openComment(key: any): void {
    this.mComments[key] = !this.mComments[key];
  }

}
