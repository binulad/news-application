import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Departments, News } from '../../news.model';
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
  deletedNewsId?: number;
  confirmationYesSub!: Subscription;
  categoryList: Departments[] = Constants.DepartmentList;
  selectedDepartment: any = 'All';

  constructor(
    private newsService: NewsService,
    private confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.newsListSub = this.newsService.newsList.subscribe((response) => {
      this.newsList = response;
      this.getAvailableDepartment();

      console.log('Categories::', this.categoryList);
    });

    this.confirmationYesSub =
      this.confirmationModalService.onClickYes.subscribe((value) => {
        if (value) {
          this.handleYes();
        }
      });
  }

  /**
   * This method called to filter the Available Departments from the List
   */
  getAvailableDepartment() {
    this.newsList.map((news) => {
      this.categoryList.filter((department) => {
        if (department.id == +news.departmentOrWing) {
          department.isAvailable = true;
        }
      });
    });
  }

  /**
   * This method called while delete the news
   * @param newsId Passed the newsId
   */
  onDelete(newsId: number) {
    this.deletedNewsId = newsId;

    // Set the confirmation modal data
    const modalData: ConfirmationModal = {
      title: Constants.DELETE_HEADER,
      content: Constants.DELETE_MESSAGE,
    };

    // Called the service to create Dynamic Confirmation Modal
    this.confirmationModalService.loadConfirmationComponent(
      this.modalHost,
      modalData
    );
  }

  /**
   * This method called while click "Yes" from the confirmation modal
   */
  handleYes() {
    if (this.deletedNewsId) {
      this.newsService.deletedNewsId.next(this.deletedNewsId);
    }
    this.deletedNewsId = undefined;
  }

  /**
   * This method called while search the text
   * @param searchText Passed the search text
   */
  onSearch(searchText: string) {
    this.newsService.searchData.next(searchText);
  }

  /**
   * This method called to filter the data by category
   * @param categoryId Passed the categoryId
   */
  onClickCategory(categoryId: string | number | undefined) {
    if (categoryId) {
      this.selectedDepartment = this.categoryList.find(
        (department: any) => department.id == categoryId
      )?.name;
    } else {
      this.selectedDepartment = 'All';
    }
    this.newsService.filterDepartment.next(categoryId);
  }

  ngOnDestroy(): void {
    this.newsListSub.unsubscribe();
    this.confirmationYesSub.unsubscribe();
  }
}
