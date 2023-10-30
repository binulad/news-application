import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './http/http-auth.interceptor';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [HeaderComponent, LoaderComponent],
  imports: [RouterModule, SharedModule],
  exports: [HeaderComponent, LoaderComponent],
  providers: [
    AuthService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
