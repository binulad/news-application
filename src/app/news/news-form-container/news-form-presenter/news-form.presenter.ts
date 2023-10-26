import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class NewsPresenterService {
  public newsFormUpdated$ = new Subject<FormGroup>();
  public isFormUpdated$ = new BehaviorSubject<boolean>(false);

  constructor(private formBuilder: FormBuilder) {}

  /**
   * This method creates a News FormGroup
   * @returns News FormGroup
   */
  createNewsForm(): FormGroup {
    return this.formBuilder.group({
      subject: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      days: [null, [Validators.required]],
      noOfPeople: [null, [Validators.required]],
      anchorName: ['', [Validators.required]],
      departmentOrWing: [null],
      newsDescription: ['', [Validators.required]],
      guestDetails: this.formBuilder.array([]),
      centerDetails: this.formBuilder.group({
        centreName: ['', [Validators.required]],
        centreIncharge: ['', [Validators.required]],
        zoneName: ['', [Validators.required]],
        district: ['', [Validators.required]],
        areaName: ['', [Validators.required]],
      }),
      files: this.formBuilder.array([]),
    });
  }

  /**
   * This method creates a FormGroup for guest details
   * @param guestName The guest name
   * @param identification The identification of the guest
   * @param speechDescription The speechDescription of the guest
   * @returns A FormGroup
   */
  createGuestFormGroup(
    guestName = '',
    identification = '',
    speechDescription = ''
  ): FormGroup {
    return this.formBuilder.group({
      guestName: [guestName, Validators.required],
      identification: [identification, Validators.required],
      speechDescription: [speechDescription],
    });
  }

  /**
   * This method creates a FormGroup for file details
   * @param fileName The file name
   * @param fileURL The file URL
   * @param fileDescription The file description
   * @returns A FormGroup
   */
  createFileGroup(
    fileName = '',
    fileURL: string | SafeResourceUrl = '',
    fileDescription = ''
  ): FormGroup {
    return this.formBuilder.group({
      fileName: [fileName],
      fileURL: [fileURL],
      fileDescription: [fileDescription],
    });
  }
}
