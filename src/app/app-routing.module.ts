import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./news/news.module').then((m) => m.NewsModule),
        // data: { preload: true }, // Custom Preloading strategy for specific lazy module
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
