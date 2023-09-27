import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { News } from '../../news.model';
import { NewsService } from '../../news.service';
import { Subscription } from 'rxjs';
import { Constants } from '../../news.constant';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalHostDirective } from 'src/app/shared/directives/modal-host.directive';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';

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

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsListSub = this.newsService.newsList.subscribe((response) => {
      this.newsList = response;
    });
  }

  onDelete(newsId: number) {
    this.deletedNewsId = newsId;
    this.loadComponent();
    // this.isOpenConfirmation = true;
    // this.confirmationHeader = Constants.DELETE_HEADER;
    // this.confirmationMessage = Constants.DELETE_MESSAGE;
  }

  loadComponent() {
    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();

    const modalData = {
      title: Constants.DELETE_HEADER,
      content: Constants.DELETE_MESSAGE,
    };

    const contentRef = viewContainerRef.createComponent(
      ConfirmationModalComponent
    );
    contentRef.instance.modalData = modalData;

    // Get the response(Output Event) from the confirmation modal
    contentRef.instance.closeModal.subscribe(() => {
      contentRef.destroy();
    });

    contentRef.instance.onClickYes.subscribe(() => {
      this.handleYes();
      contentRef.destroy();
    });
  }

  handleYes() {
    // this.isOpenConfirmation = false;
    if (this.deletedNewsId) {
      this.newsService.deletedNewsId.next(this.deletedNewsId);
    }
    this.deletedNewsId = undefined;
  }

  // handleDropdown(activeIndex: number) {
  //   this.activeIndex = activeIndex;
  //   this.isOpenDropdown = !this.isOpenDropdown;
  // }

  // changeSlide() {
  //   if (this.activeIndex && this.activeIndex < 5) {
  //     this.isOpenDropdown = false;
  //   }
  // }

  onSearch(searchText: string) {
    this.newsService.searchData.next(searchText);
  }

  ngOnDestroy(): void {
    this.newsListSub.unsubscribe();
  }
}
