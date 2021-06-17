import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class NewsFeedApiService {

  constructor(private http: HttpClient) {}

  initPosts() {
    return this.http.get(
      "http://localhost:4000/posts" 
    );
  }

  addNewPost(post: any) {
    return this.http.post(
      "http://localhost:4000/post",
      post
    );
  }

  searchPostsByID(title: string) {
    return this.http.get(
      "http://localhost:4000/post/?title=" + title 
    );
  }

  deletePostByID(id: string) {
    return this.http.delete(
      "http://localhost:4000/post/" + id 
    );
  }

  updatePostById(id: string, comment: string) {
    return this.http.put(
      "http://localhost:4000/post/" + id,
      {comment}
    );
  }
}
