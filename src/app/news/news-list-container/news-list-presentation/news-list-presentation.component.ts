import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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

  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;
  @ViewChild('allSelected') allSelected!: ElementRef;

  public newsList: News[] = [];
  public categoryList: Departments[] = Constants.DepartmentList;
  public selectedDepartmentLabel: string = Constants.SELECT_DEPARTMENT_LABEL;
  public selectedCategory: Departments[] = [];
  public isSelectAll: boolean = false;
  public isRemoveFromPills: boolean = false;
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
      this.getAvailableDepartment();
    });

    this.confirmationYesSub =
      this.confirmationModalService.onClickYes.subscribe((value) => {
        if (value) {
          this.handleYes();
        }
      });
  }

  /**
   * This method called while select any category from multiselect dropdown
   * @param category Passed the selected category
   * @param isChecked Passed the checked/unchecked value
   */
  onSelectCategory(category: Departments, isChecked: boolean) {
    if (isChecked) {
      this.selectedCategory.push(category);

      // Check if all the checkboxes are selected or not
      this.isSelectAllCheckboxes();
    } else {
      const index = this.selectedCategory.findIndex(
        (object) => object.id === category.id
      );
      this.selectedCategory.splice(index, 1);

      // If remove the category from pills then it also removed from the multiselect dropdown
      if (this.isRemoveFromPills) {
        this.checkboxes.forEach((checkbox) => {
          if (checkbox.nativeElement.id == category.id) {
            checkbox.nativeElement.checked = false;
          }
        });
      }

      // If "All" checkbox is checked and remove all the categories then "All" checkbox also needs to unchecked
      if (this.isSelectAll) {
        this.isSelectAll = false;
        this.allSelected.nativeElement.checked = false;
      }

      // If all the selected categories removed then reset the Filter
      if (!this.selectedCategory.length) {
        this.resetFilter();
      }
    }

    this.selectedDepartmentLabel = this.selectedCategory.length
      ? `${this.selectedCategory.length} Selected`
      : Constants.SELECT_DEPARTMENT_LABEL;

    // this.applyFilter();
  }

  /**
   * This method called to remove the category from selected pills
   * @param category Pass the category that needs to be removed
   */
  removeCategory(category: Departments) {
    this.isRemoveFromPills = true;
    this.onSelectCategory(category, false);
  }

  /**
   * This method called to check if all the categories are checked/unchecked
   */
  isSelectAllCheckboxes() {
    const isAllChecked = this.checkboxes.some(
      (element) => element.nativeElement.checked === false
    );

    if (isAllChecked) {
      this.isSelectAll = false;
      return;
    }
    this.isSelectAll = true;
    this.allSelected.nativeElement.checked = true;
  }

  /**
   * This method called while click on Apply button
   */
  applyFilter() {
    console.log(this.selectedCategory);
    const categoryIds = this.selectedCategory.map((element: any) => {
      return element.id;
    });

    // Passed the Array of category Ids
    this.newsService.filterDepartment.next(categoryIds);
  }

  /**
   * This method called to reset the filter
   */
  resetFilter() {
    this.selectedCategory = [];
    console.log(this.checkboxes);

    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });

    this.allSelected.nativeElement.checked = false;
    this.newsService.filterDepartment.next(this.selectedCategory);
    this.selectedDepartmentLabel = Constants.SELECT_DEPARTMENT_LABEL;
  }

  /**
   * This method called while option "All" is checked/unchecked from the multiselect dropdown
   * @param isAllSelected Pass if the option is checked/unchecked
   * @returns If unchecked the option then reset the filter and return
   */
  checkedAll(isAllSelected: boolean) {
    if (!isAllSelected) {
      this.resetFilter();
      return;
    }

    this.selectedCategory = [...this.categoryList];

    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = true;
    });
    this.isSelectAll = true;

    this.selectedDepartmentLabel = this.selectedCategory.length
      ? `${this.selectedCategory.length} Selected`
      : Constants.SELECT_DEPARTMENT_LABEL;
  }

  /**
   * This method called to filter the Available Departments from the List
   */
  getAvailableDepartment() {
    this.newsList.forEach((news) => {
      this.categoryList.forEach((department) => {
        if (department.id === +news.departmentOrWing) {
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

  ngOnDestroy(): void {
    this.newsListSub.unsubscribe();
    this.confirmationYesSub.unsubscribe();
  }
}
