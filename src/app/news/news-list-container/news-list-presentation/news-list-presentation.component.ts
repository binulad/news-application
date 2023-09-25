import { Component, OnDestroy, OnInit } from '@angular/core';
import { News } from '../../news.model';
import { NewsService } from '../../news.service';
import { Subscription, debounce, interval } from 'rxjs';
import { Constants } from '../../news.constant';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-news-list-presentation',
  templateUrl: './news-list-presentation.component.html',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ transform: 'translateY(10%)' }),
        animate(100),
      ]),
      transition(':leave', [
        animate(100, style({ transform: 'translateY(10%)' })),
      ]),
    ]),
  ],
})
export class NewsListPresentationComponent implements OnInit, OnDestroy {
  public newsList: News[] = [];
  newsListSub!: Subscription;
  isOpenConfirmation: boolean = false;
  confirmationHeader: string = '';
  confirmationMessage: string = '';
  deletedNewsId?: number;
  isOpenDropdown: boolean = false;
  activeIndex?: number;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsListSub = this.newsService.newsList.subscribe((response) => {
      this.newsList = response;
    });
  }

  onDelete(newsId: number) {
    this.deletedNewsId = newsId;
    this.isOpenConfirmation = true;
    this.confirmationHeader = Constants.DELETE_HEADER;
    this.confirmationMessage = Constants.DELETE_MESSAGE;
    // this.newsService.deletedNewsId.next(newsId);
  }

  handleYes() {
    this.isOpenConfirmation = false;
    if (this.deletedNewsId) {
      this.newsService.deletedNewsId.next(this.deletedNewsId);
    }
    this.deletedNewsId = undefined;
  }

  getTimeSince(date: any) {
    const now = new Date();
    const timeStamp = new Date(date);
    const secondAgo = Math.floor((+now - +timeStamp) / 1000);

    if (secondAgo < 60) {
      return `${secondAgo} sec ago`;
    } else if (secondAgo < 3600) {
      const minuteAgo = Math.floor(secondAgo / 60);
      return `${minuteAgo} min ago`;
    } else if (secondAgo < 86400) {
      const hourAgo = Math.floor(secondAgo / 3600);
      return `${hourAgo} hr ago`;
    } else {
      const daysAgo = Math.floor(secondAgo / 86400);
      return `${daysAgo} day ago`;
    }
  }

  handleDropdown(activeIndex: number) {
    this.activeIndex = activeIndex;
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  changeSlide() {
    if (this.activeIndex && this.activeIndex < 5) {
      this.isOpenDropdown = false;
    }
  }

  onSearch(searchText: string) {
    this.newsService.searchData.next(searchText);
  }

  ngOnDestroy(): void {
    this.newsListSub.unsubscribe();
  }
}
