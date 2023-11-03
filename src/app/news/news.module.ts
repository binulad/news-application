import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NewsFormContainerComponent } from './news-form-container/news-form-container.component';
import { NewsFormPresentationComponent } from './news-form-container/news-form-presentation/news-form-presentation.component';
import { NewsListContainerComponent } from './news-list-container/news-list-container.component';
import { NewsListPresentationComponent } from './news-list-container/news-list-presentation/news-list-presentation.component';
import { NewsDetailContainerComponent } from './news-detail-container/news-detail-container.component';
import { NewsDetailPresentationComponent } from './news-detail-container/news-detail-presentation/news-detail-presentation.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { SafePipe } from '../common/pipes/safe.pipe';
import { NewsPresenterService } from './news-form-container/news-form-presenter/news-form.presenter';
import { DepartmentNamePipe } from './department-name.pipe';
import { GetTimeSincePipe } from '../common/pipes/get-time-since.pipe';
import { DropdownComponent } from '../common/components/dropdown/dropdown.component';
import { MultiSelectComponent } from '../common/components/multi-select/multi-select.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewsFormContainerComponent,
    NewsFormPresentationComponent,
    NewsListContainerComponent,
    NewsListPresentationComponent,
    NewsDetailContainerComponent,
    NewsDetailPresentationComponent,
    SafePipe,
    DepartmentNamePipe,
    GetTimeSincePipe,
    DropdownComponent,
    MultiSelectComponent,
  ],
  imports: [
    SharedModule,
    NewsRoutingModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [NewsPresenterService],
})
export class NewsModule {}
