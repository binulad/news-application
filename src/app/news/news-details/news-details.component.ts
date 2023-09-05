import { Component, OnInit } from '@angular/core';
import { News } from '../news.model';
import { NewsService } from '../news.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements OnInit {
  newsDetails!: News;
  id!: number;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newsService.isAddEditView.next(true);

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      // Call the service
      this.getNewsByID();
    });
  }

  getNewsByID() {
    console.log(this.id);
    this.newsService.getNewsById(this.id).subscribe((response) => {
      this.newsDetails = response;
      console.log(response);
    });
  }
}
