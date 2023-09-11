import { Component, OnInit } from '@angular/core';
import { News } from '../news.model';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  public newsList: News[] = [];

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews() {
    this.newsService.getAllNews().subscribe((response) => {
      this.newsList = response;
    });
  }

  onDelete(newsId: number) {
    this.newsService.deleteNews(newsId).subscribe((response) => {
      this.getAllNews();
    });
  }
}
