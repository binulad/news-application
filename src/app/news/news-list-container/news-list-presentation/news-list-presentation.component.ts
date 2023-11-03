import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Departments, News } from '../../news.model';
import { NewsService } from '../../news.service';
import { Subscription } from 'rxjs';
import { Constants } from '../../news.constant';
import { ModalHostDirective } from 'src/app/shared/directives/modal-host.directive';
import { ConfirmationModal } from 'src/app/shared/models/common.model';
import { ConfirmationModalService } from 'src/app/shared/components/confirmation-modal/confirmation-modal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-news-list-presentation',
  templateUrl: './news-list-presentation.component.html',
})
export class NewsListPresentationComponent implements OnInit, OnDestroy {
  @ViewChild(ModalHostDirective) modalHost!: ModalHostDirective;

  @ViewChild('categoryForm') categoryForm!: NgForm;

  public newsList: News[] = [];
  public categoryList: Departments[] = Constants.DepartmentList;
  public selectedCategory: any[] = [];
  public deletedNewsId?: number;

  private newsListSub!: Subscription;
  private confirmationYesSub!: Subscription;

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

  /**
   * This method called to remove the category from selected pills
   * @param category Pass the category that needs to be removed
   */
  removeCategory(categoryId: number) {
    this.selectedCategory = this.selectedCategory.filter(
      (id: any) => id != categoryId
    );

    this.categoryForm.form.patchValue({
      category: this.selectedCategory,
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
   * This method called while change the category from filter
   * @param categoryIds selected categoryIds
   */
  onChangeCategory(categoryIds: number[]) {
    this.selectedCategory = categoryIds;
    this.newsService.filterDepartment.next(categoryIds);
  }

  ngOnDestroy(): void {
    this.newsListSub.unsubscribe();
    this.confirmationYesSub.unsubscribe();
  }
}
