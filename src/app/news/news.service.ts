import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from './news.model';

const API_URL = 'http://localhost:3000/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  /**
   * This method called to get all News
   * @returns News Array
   */
  getAllNews() {
    return this.http.get<News[]>(`${API_URL}`);
  }

  /**
   * This method called to get the News details from ID
   * @param id News Id
   * @returns News details of the id
   */
  getNewsById(id: number) {
    return this.http.get<News>(`${API_URL}/${id}`);
  }
}
