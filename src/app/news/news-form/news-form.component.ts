import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss'],
})
export class NewsFormComponent implements OnInit {
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.isAddEditView.next(true);
  }
}
