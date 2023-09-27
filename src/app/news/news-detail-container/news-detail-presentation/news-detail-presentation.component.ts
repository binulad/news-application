import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AddNews } from '../../news.model';
import { Constants } from '../../news.constant';
import { NewsService } from '../../news.service';
import { Subscription } from 'rxjs';
import { ModalHostDirective } from 'src/app/shared/directives/modal-host.directive';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-news-detail-presentation',
  templateUrl: './news-detail-presentation.component.html',
})
export class NewsDetailPresentationComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { static: false }) modalBody!: TemplateRef<any>;

  @ViewChild(ModalHostDirective)
  modalHost!: ModalHostDirective;

  newsDetails!: AddNews;
  newsSub!: Subscription;
  startIndex: number = 0;
  isModalOpen: boolean = false;

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

  openModal(index: number) {
    this.loadComponent();

    this.isModalOpen = true;
    // this.modalRef?.show();
    this.startIndex = index;
  }

  loadComponent() {
    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();

    const modalData = {
      modalTitle: 'Attachment',
      content: this.modalBody,
    };

    const contentRef = viewContainerRef.createComponent(ModalComponent);
    contentRef.instance.modalData = modalData;

    // This method called to Remove the Dynamic Component
    contentRef.instance.destroyModal.subscribe((value) => {
      if (value) {
        this.removeComponent();
      }
    });
  }

  removeComponent() {
    this.modalHost.viewContainerRef.remove();
  }

  // closeModal() {
  //   this.modalRef?.hide();
  //   this.isModalOpen = false;
  // }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }
}
