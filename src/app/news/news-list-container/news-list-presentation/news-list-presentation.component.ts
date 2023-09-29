import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { News } from '../../news.model';
import { NewsService } from '../../news.service';
import { Subscription } from 'rxjs';
import { Constants } from '../../news.constant';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalHostDirective } from 'src/app/shared/directives/modal-host.directive';
import { ConfirmationModal } from 'src/app/shared/models/common.model';
import { ConfirmationModalService } from 'src/app/shared/components/confirmation-modal/confirmation-modal.service';

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
  @ViewChild(ModalHostDirective) modalHost!: ModalHostDirective;

  public newsList: News[] = [];
  newsListSub!: Subscription;
  isOpenConfirmation: boolean = false;
  confirmationHeader: string = '';
  confirmationMessage: string = '';
  deletedNewsId?: number;
  isOpenDropdown: boolean = false;
  activeIndex?: number;
  confirmationYesSub!: Subscription;

  constructor(
    private newsService: NewsService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.newsListSub = this.newsService.newsList.subscribe((response) => {
      this.newsList = response;
    });

    this.confirmationYesSub =
      this.confirmationModalService.onClickYes.subscribe((value) => {
        if (value) {
          this.handleYes();
        }
      });
  }

  onDelete(newsId: number) {
    this.deletedNewsId = newsId;

    const modalData: ConfirmationModal = {
      title: Constants.DELETE_HEADER,
      content: Constants.DELETE_MESSAGE,
    };
    this.confirmationModalService.loadConfirmationComponent(
      this.modalHost,
      modalData
    );
  }

  handleYes() {
    if (this.deletedNewsId) {
      this.newsService.deletedNewsId.next(this.deletedNewsId);
    }
    this.deletedNewsId = undefined;
  }

  onSearch(searchText: string) {
    this.newsService.searchData.next(searchText);
  }

  ngOnDestroy(): void {
    this.newsListSub.unsubscribe();
    this.confirmationYesSub.unsubscribe();
  }
}
