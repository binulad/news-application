import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddNews, News, QueryParams } from './news.model';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject, map } from 'rxjs';

const API_URL = 'http://localhost:3000/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  public newsList = new Subject<News[]>();
  public getNews = new BehaviorSubject<any>({});
  public submitNews = new Subject<any>();
  public deletedNewsId = new Subject<number>();
  public searchData = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  /**
   * This method called to get all News
   * @returns News Array
   * q=Lorem&_sort=createdOn&_order=desc
   */
  getAllNews(params: QueryParams) {
    const search = params.q;
    const sortBy = params.sortBy;
    const direction = params.direction;
    return this.http
      .get<News[]>(`${API_URL}?q=${search}&_sort=${sortBy}&_order=${direction}`)
      .pipe(
        map((response: any) => {
          response.forEach((element: any) => {
            element.createdOn = this.getTimeSince(element.createdOn);
          });
          return response;
        })
      );
  }

  /**
   * This method called to convert the Date to Since time.
   * @param date Created Date of the news
   * @returns The time since of that created news
   */
  getTimeSince(date: any) {
    const now = new Date();
    const timeStamp = new Date(date);
    const secondAgo = Math.floor((+now - +timeStamp) / 1000);

    if (secondAgo < 60) {
      return `${secondAgo} sec ago`;
    } else if (secondAgo < 3600) {
      const minuteAgo = Math.floor(secondAgo / 60);
      return `${minuteAgo} min ago`;
    } else if (secondAgo < 86400) {
      const hourAgo = Math.floor(secondAgo / 3600);
      return `${hourAgo} hr ago`;
    } else {
      const daysAgo = Math.floor(secondAgo / 86400);
      return `${daysAgo} day ago`;
    }
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
