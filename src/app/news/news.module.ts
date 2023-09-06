import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsFormComponent } from './news-form/news-form.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewsComponent,
    NewsListComponent,
    NewsFormComponent,
    NewsDetailsComponent,
  ],
  imports: [CommonModule, NewsRoutingModule, ReactiveFormsModule],
})
export class NewsModule {}
