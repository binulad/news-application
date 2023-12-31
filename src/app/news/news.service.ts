import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departments, News, QueryParams } from './news.model';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject, map } from 'rxjs';

const API_URL = 'http://localhost:3000/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  public newsList = new Subject<News[]>();
  public getNews = new Subject<any>();
  public submitNews = new Subject<any>();
  public deletedNewsId = new Subject<number>();
  public searchData = new BehaviorSubject<string>('');
  public filterDepartment = new Subject<
    string[] | Departments[] | number[] | undefined
  >();

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
    let filter = params.category;
    let filterData = '';

    if (Array.isArray(filter)) {
      const filterArr = filter.map((element) => {
        return '&departmentOrWing=' + element;
      });

      filterData = filterArr.join('');
    }
    return this.http.get<News[]>(
      `${API_URL}?q=${search}&_sort=${sortBy}&_order=${direction}${filterData}`
    );
  }

  /**
   * This method called to get the News details from ID
   * @param id News Id
   * @returns News details of the id
   */
  getNewsById(id: number) {
    return this.http.get<News>(`${API_URL}/${id}`);
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
