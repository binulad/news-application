import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsFormContainerComponent } from './news-form-container/news-form-container.component';
import { NewsListContainerComponent } from './news-list-container/news-list-container.component';
import { NewsDetailContainerComponent } from './news-detail-container/news-detail-container.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: '',
        component: NewsListContainerComponent,
      },
      {
        path: 'new',
        component: NewsFormContainerComponent,
      },
      {
        path: ':id',
        component: NewsDetailContainerComponent,
      },
      {
        path: 'edit/:id',
        component: NewsFormContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
