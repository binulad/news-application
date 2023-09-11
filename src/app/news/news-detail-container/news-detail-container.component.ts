import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-news-detail-container',
  templateUrl: './news-detail-container.component.html',
})
export class NewsDetailContainerComponent implements OnInit {
  id!: number;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    this.getNewsByID();
  }

  getNewsByID() {
    this.newsService.getNewsById(this.id).subscribe((response) => {
      this.newsService.getNews.next(response);
    });
  }
}
