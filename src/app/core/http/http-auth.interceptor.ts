import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add loader on every api request
    this.loaderService.displayLoader(true);
    return next.handle(request).pipe(
      finalize(() => {
        // Remove the loader once get the response
        this.loaderService.displayLoader(false);
      })
    );
  }
}
