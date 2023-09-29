import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AddNews } from '../../news.model';
import { NewsService } from '../../news.service';
import { Subscription } from 'rxjs';
import { ModalHostDirective } from 'src/app/shared/directives/modal-host.directive';
import { Modal } from 'src/app/shared/models/common.model';
import { ModalService } from 'src/app/shared/components/modal/modal.service';

@Component({
  selector: 'app-news-detail-presentation',
  templateUrl: './news-detail-presentation.component.html',
})
export class NewsDetailPresentationComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { static: false }) modalBody!: TemplateRef<any>;
  @ViewChild('modalFooter', { static: false }) modalFooter!: TemplateRef<any>;

  @ViewChild(ModalHostDirective)
  modalHost!: ModalHostDirective;

  newsDetails!: AddNews;
  newsSub!: Subscription;
  startIndex: number = 0;

  constructor(
    private newsService: NewsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.newsSub = this.newsService.getNews.subscribe((response) => {
      this.newsDetails = response;
    });
  }

  /**
   * This method called to open the modal
   * While click on any attached image the dynamic modal will open
   * @param index Passed the attached image index
   */
  openModal(index: number) {
    const modalData: Modal = {
      modalTitle: 'Attachment',
      content: this.modalBody,
      modalFooter: this.modalFooter,
    };
    this.modalService.loadModalComponent(this.modalHost, modalData);
    this.startIndex = index;
  }

  /**
   * This method called to close the dynamic modal
   */
  closeModal() {
    this.modalHost.viewContainerRef.remove();
  }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }
}
