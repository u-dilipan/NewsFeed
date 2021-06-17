import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() { }

  @Input() id: string;
  @Input() comment: string;

  ngOnInit(): void {
  }

  @Output() postCommentEvent = new EventEmitter();
  postComment(): void {
    this.postCommentEvent.emit({id: this.id, comment: this.comment});
  }
}
