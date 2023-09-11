import { Component, OnInit } from '@angular/core';
import { AddNews, News } from '../news.model';
import { NewsService } from '../news.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../news.constant';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements OnInit {
  newsDetails!: AddNews;
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
}
