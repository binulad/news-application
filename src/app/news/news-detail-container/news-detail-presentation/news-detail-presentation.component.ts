import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AddNews } from '../../news.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../news.constant';
import { NewsService } from '../../news.service';
import { Subscription } from 'rxjs';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-news-detail-presentation',
  templateUrl: './news-detail-presentation.component.html',
})
export class NewsDetailPresentationComponent implements OnInit, OnDestroy {
  @ViewChild('lgModal', { static: false }) modalRef?: ModalDirective;

  newsDetails!: AddNews;
  newsSub!: Subscription;
  startIndex!: any;

  constructor(
    private newsService: NewsService,
    private modalService: BsModalService
  ) {}

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
    console.log('Open');
    this.modalRef?.show();
    this.startIndex = index;
  }

  ngOnDestroy(): void {
    this.newsSub.unsubscribe();
  }
}
