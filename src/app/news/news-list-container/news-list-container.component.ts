import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Subscription, debounce, debounceTime, map } from 'rxjs';
import { QueryParams } from '../news.model';

@Component({
  selector: 'app-news-list-container',
  templateUrl: './news-list-container.component.html',
})
export class NewsListContainerComponent implements OnInit, OnDestroy {
  deletedNewsSub!: Subscription;
  queryParams: QueryParams = {
    q: '',
    sortBy: 'createdOn',
    direction: 'desc',
    category: '',
  };
  searchNewsSub!: Subscription;
  filterDepartmentSub!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.deletedNewsSub = this.newsService.deletedNewsId.subscribe(
      (newsId: number) => {
        if (newsId) {
          this.onDelete(newsId);
        }
      }
    );

    this.searchNewsSub = this.newsService.searchData
      .pipe(
        debounceTime(500),
        map((searchText) => {
          this.queryParams.q = searchText;
          this.getAllNews(this.queryParams);
        })
      )
      .subscribe();

    this.filterDepartmentSub = this.newsService.filterDepartment.subscribe(
      (filterDepartment) => {
        this.queryParams.category = filterDepartment;
        this.getAllNews(this.queryParams);
      }
    );
  }

  /**
   * This method called to get all the News
   * @param queryParams Passed the query parameters
   */
  getAllNews(queryParams: QueryParams) {
    this.newsService.getAllNews(queryParams).subscribe((response) => {
      this.newsService.newsList.next(response);
    });
  }

  /**
   * This method called to delete the news record
   * @param newsId Passed the newsId
   */
  onDelete(newsId: number) {
    this.newsService.deleteNews(newsId).subscribe(() => {
      this.getAllNews(this.queryParams);
    });
  }

  ngOnDestroy(): void {
    this.deletedNewsSub.unsubscribe();
    this.searchNewsSub.unsubscribe();
    this.filterDepartmentSub.unsubscribe();
  }
}
