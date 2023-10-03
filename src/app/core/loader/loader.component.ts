import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  loaderSubscription!: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService
      .getLoaderStatus()
      .subscribe((value) => {
        this.isVisible = value;
      });
  }

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }
}
