import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class NewsApiService {
  // Add your API key here
  api_key = "304f24d9af7546acb16cfcac067ae95a";

  constructor(private http: HttpClient) {}

  // function to get list of all news sources
  initSources() {
    return this.http.get(
      "https://newsapi.org/v2/sources?language=en&apiKey=" + this.api_key
    );
  }

  // function to get a list of headlines
  initPosts() {
    return this.http.get(
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=" +
        this.api_key
    );
  }

  // function to get a list of headlines for a user-selected source
  getPostsByID(source: String) {
    return this.http.get(
      "https://newsapi.org/v2/top-headlines?sources=" +
        source +
        "&apiKey=" +
        this.api_key
    );
  }

  postComment(source: String) {
    
  }
}
