import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddNews, News } from './news.model';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

const API_URL = 'http://localhost:3000/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  public newsList = new Subject<News[]>();
  public getNews = new BehaviorSubject<any>({});
  public submitNews = new Subject<any>();
  public deletedNewsId = new Subject<number>();

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
    return this.http.get<AddNews>(`${API_URL}/${id}`);
  }

  /**
   * This method called to add new data
   * @param newsData Passed the newsData
   * @returns Get News Details
   */
  addNews(newsData: FormGroup) {
    return this.http.post(`${API_URL}`, newsData);
  }

  /**
   * This method called to update the news data
   * @param newsData Passed the updated news
   * @param newsId Passed the news ID
   * @returns Get the Updated News
   */
  updateNews(newsData: any, newsId: number) {
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');

    // return this.http.put(`${API_URL}/${newsId}`, newsData, {
    //   headers: headers,
    // });
    return this.http.put(`${API_URL}/${newsId}`, newsData);
  }

  /**
   * This method called to delete the news
   * @param newsId Passed the news Id
   * @returns return the news List
   */
  deleteNews(newsId: number) {
    return this.http.delete(`${API_URL}/${newsId}`);
  }
}
