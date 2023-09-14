import { Component, OnDestroy, OnInit } from '@angular/core';
import { News } from '../../news.model';
import { NewsService } from '../../news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-list-presentation',
  templateUrl: './news-list-presentation.component.html',
})
export class NewsListPresentationComponent implements OnInit, OnDestroy {
  public newsList: News[] = [];
  newsListSub!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsListSub = this.newsService.newsList.subscribe((response) => {
      this.newsList = response;
    });
  }

  onDelete(newsId: number) {
    this.newsService.deletedNewsId.next(newsId);
  }

  ngOnDestroy(): void {
    // this.newsListSub.unsubscribe();
  }
}
