import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NewsFormContainerComponent } from './news-form-container/news-form-container.component';
import { NewsFormPresentationComponent } from './news-form-container/news-form-presentation/news-form-presentation.component';
import { NewsListContainerComponent } from './news-list-container/news-list-container.component';
import { NewsListPresentationComponent } from './news-list-container/news-list-presentation/news-list-presentation.component';
import { NewsDetailContainerComponent } from './news-detail-container/news-detail-container.component';
import { NewsDetailPresentationComponent } from './news-detail-container/news-detail-presentation/news-detail-presentation.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewsFormContainerComponent,
    NewsFormPresentationComponent,
    NewsListContainerComponent,
    NewsListPresentationComponent,
    NewsDetailContainerComponent,
    NewsDetailPresentationComponent,
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
})
export class NewsModule {}
