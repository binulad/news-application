import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NewsService } from '../news.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-news-form-container',
  templateUrl: './news-form-container.component.html',
})
export class NewsFormContainerComponent implements OnInit, OnDestroy {
  id!: number;
  isEdit: boolean = false;
  routeSub!: Subscription;
  submitNewsSub!: Subscription;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEdit = this.id ? true : false;
    });

    if (this.isEdit) {
      this.newsService.getNewsById(this.id).subscribe((response) => {
        this.newsService.getNews.next(response);
      });
    }

    this.submitNewsSub = this.newsService.submitNews.subscribe((newsData) => {
      if (this.isEdit) {
        this.updateNews(newsData);
      } else {
        this.addNews(newsData);
      }
    });
  }

  /**
   * This method used for update the News data
   * @param newsData Passed the updated news data
   */
  updateNews(newsData: FormGroup) {
    this.newsService.updateNews(newsData, this.id).subscribe(() => {
      this.router.navigate(['/news']);
    });
  }

  /**
   * This method used for add new news
   * @param newsData Passed the news data
   */
  addNews(newsData: FormGroup) {
    this.newsService.addNews(newsData).subscribe(() => {
      this.router.navigate(['/news']);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.submitNewsSub.unsubscribe();
  }
}
