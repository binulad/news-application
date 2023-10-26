import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NewsService } from '../news.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ConfirmationModal } from 'src/app/shared/models/common.model';
import { ConfirmationModalService } from 'src/app/shared/components/confirmation-modal/confirmation-modal.service';
import { ModalHostDirective } from 'src/app/shared/directives/modal-host.directive';
import { IDeactivateComponent } from 'src/app/common/models/common.model';
import { CommonConstant } from 'src/app/common/constants/common.constant';
import { NewsFormPresentationComponent } from './news-form-presentation/news-form-presentation.component';

@Component({
  selector: 'app-news-form-container',
  templateUrl: './news-form-container.component.html',
})
export class NewsFormContainerComponent
  implements OnInit, OnDestroy, IDeactivateComponent
{
  @ViewChild(ModalHostDirective) modalHost!: ModalHostDirective;
  @ViewChild(NewsFormPresentationComponent)
  newsFormPresentation!: NewsFormPresentationComponent;

  id!: number;
  isEdit = false;
  private routeSub!: Subscription;
  private submitNewsSub!: Subscription;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationModalService: ConfirmationModalService
  ) {}
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEdit = !!this.id;
    });

    if (this.isEdit) {
      this.newsService.getNewsById(this.id).subscribe((response) => {
        this.newsService.getNews.next(response);
      });
    }

    this.submitNewsSub = this.newsService.submitNews.subscribe((newsData) => {
      if (this.isEdit) {
        this.updateNews(newsData);
      } else {
        this.addNews(newsData);
      }
    });
  }

  /**
   * This method used for update the News data
   * @param newsData Passed the updated news data
   */
  updateNews(newsData: FormGroup) {
    this.newsService.updateNews(newsData, this.id).subscribe(() => {
      this.router.navigate(['/news']);
    });
  }

  /**
   * This method used for add new news
   * @param newsData Passed the news data
   */
  addNews(newsData: FormGroup) {
    this.newsService.addNews(newsData).subscribe(() => {
      this.router.navigate(['/news']);
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    const isNewsFormUpdated = this.newsFormPresentation.newsForm.dirty;
    if (isNewsFormUpdated) {
      const modalData: ConfirmationModal = {
        title: 'Confirmation Modal',
        content: CommonConstant.DISCARD_CHANGES,
      };
      this.confirmationModalService.loadConfirmationComponent(
        this.modalHost,
        modalData
      );

      return this.confirmationModalService.onClickYes.asObservable();
    }
    return true;
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.submitNewsSub.unsubscribe();
  }
}
