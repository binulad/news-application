import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-list-container',
  templateUrl: './news-list-container.component.html',
})
export class NewsListContainerComponent implements OnInit, OnDestroy {
  deletedNewsSub!: Subscription;
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getAllNews();

    this.deletedNewsSub = this.newsService.deletedNewsId.subscribe(
      (newsId: number) => {
        if (newsId) {
          this.onDelete(newsId);
        }
      }
    );
  }

  getAllNews() {
    this.newsService.getAllNews().subscribe((response) => {
      this.newsService.newsList.next(response);
    });
  }

  onDelete(newsId: number) {
    this.newsService.deleteNews(newsId).subscribe(() => {
      this.getAllNews();
    });
  }

  ngOnDestroy(): void {
    this.deletedNewsSub.unsubscribe();
  }
}
