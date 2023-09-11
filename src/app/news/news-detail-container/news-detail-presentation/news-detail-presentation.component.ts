import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddNews } from '../../news.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../news.constant';
import { NewsService } from '../../news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-detail-presentation',
  templateUrl: './news-detail-presentation.component.html',
})
export class NewsDetailPresentationComponent implements OnInit, OnDestroy {
  newsDetails!: AddNews;
  newsSub!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsSub = this.newsService.getNews.subscribe((response) => {
      this.newsDetails = response;
    });
  }

  getDepartmentOrWing(id: number) {
    let getDepartment;
    getDepartment = Constants.DepartmentList.find((item: any) => {
      if (item.id == +id) {
        return item.name;
      }
    });
    return getDepartment?.name;
  }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }
}
