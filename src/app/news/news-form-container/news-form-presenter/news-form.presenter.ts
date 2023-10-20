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
      subject: [null, [Validators.required]],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      days: [null, [Validators.required]],
      noOfPeople: [null, [Validators.required]],
      anchorName: [null, [Validators.required]],
      departmentOrWing: [null],
      newsDescription: [null, [Validators.required]],
      guestDetails: this.formBuilder.array([]),
      centerDetails: this.formBuilder.group({
        centreName: [null, [Validators.required]],
        centreIncharge: [null, [Validators.required]],
        zoneName: [null, [Validators.required]],
        district: [null, [Validators.required]],
        areaName: [null, [Validators.required]],
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
  // createFileGroup(
  //   fileName?: string,
  //   fileURL?: string | SafeResourceUrl,
  //   fileDescription?: string
  // ): FormGroup {
  //   return this.formBuilder.group({
  //     fileName: [fileName ?? null],
  //     fileURL: [fileURL ?? null],
  //     fileDescription: [fileDescription ?? null],
  //   });
  // }
}
