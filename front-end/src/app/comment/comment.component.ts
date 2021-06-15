import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() { }

  comment: string = 'sample comment';

  ngOnInit(): void {
  }

  postComment(): void {
    console.log(this.comment)
  }
}
