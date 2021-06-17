import { Component, Inject } from '@angular/core';
import { NewsFeedApiService } from './newsfeed-api.service';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mPosts: Array<any> = [];
  mComments: Array<boolean> = [];

  postTitle: string;
  postDescription: string;
  searchString: string;

  constructor(private newsapi: NewsFeedApiService, public dialog: MatDialog) {
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {

    this.newsapi.initPosts().subscribe(data => {
      for(let post in data){
        this.mPosts.push(data[post]); 
      }
      if(this.mPosts) {
        for (let i = 0; i < this.mPosts.length; i++) {
          this.mComments.push(false);
        }
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {postTitle: this.postTitle, postDescription: this.postDescription}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.postTitle && result.postDescription) {
        this.mPosts = [];
        this.newsapi.addNewPost({
          title: result.postTitle,
          description: result.postDescription 
        }).subscribe(data => {
          for(let post in data){
            this.mPosts.push(data[post]); 
          }
        });
      }
      else {
        console.log('Fill all details')
      }
    });
  }

  searchPost() {
    if(!this.searchString) 
      return;
    this.mPosts = [];
    this.newsapi.searchPostsByID(this.searchString).subscribe(data => this.mPosts.push(data));
    this.searchString = null;
  }

  openComment(key: any): void {
    this.mComments[key] = !this.mComments[key];
  }

  deletePost(id: string) {
    this.mPosts = [];
    this.newsapi.deletePostByID(id).subscribe(data => {
      for(let post in data){
        this.mPosts.push(data[post]); 
      }
    });
  }

  postComment(data: any) {
    this.mPosts = [];
    this.newsapi.updatePostById(data.id, data.comment).subscribe(data => {
      for(let post in data){
        this.mPosts.push(data[post]); 
      }
    });
  }

}
