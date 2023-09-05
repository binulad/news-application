import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  isShowCancel!: boolean;
  subscription!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.subscription = this.newsService.isAddEditView.subscribe((value) => {
      this.isShowCancel = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
