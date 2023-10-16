import { Injectable } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class NewsPresenterService {
  public newsFormUpdated$ = new Subject<UntypedFormGroup>();
  public isFormUpdated$ = new BehaviorSubject<boolean>(false);

  constructor(private formBuilder: UntypedFormBuilder) {}

  /**
   * This method called to create a News FormGroup
   * @returns News FromGroup
   */
  createNewsForm(): UntypedFormGroup {
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
   * This method called to get the Form Group of Guest Array
   * @param guestName Passed the guest name
   * @param identification Passed the identification of the guest
   * @param speechDescription Passed the speechDescription of the guest
   * @returns Return a FormGroup
   */
  createGuestFormGroup(
    guestName?: string,
    identification?: string,
    speechDescription?: string
  ): UntypedFormGroup {
    return this.formBuilder.group({
      guestName: [guestName ?? null, Validators.required],
      identification: [identification ?? null, Validators.required],
      speechDescription: [speechDescription ?? null],
    });
  }

  /**
   * This method called to create the FileGroup Array
   * @param fileName Passed the file name
   * @param fileURL Passed the file url
   * @param fileDescription Passed the file description
   * @returns Return a FormGroup
   */
  createFileGroup(
    fileName?: string,
    fileURL?: string | SafeResourceUrl,
    fileDescription?: string
  ): UntypedFormGroup {
    return this.formBuilder.group({
      fileName: [fileName ?? null],
      fileURL: [fileURL ?? null],
      fileDescription: [fileDescription ?? null],
    });
  }

  setIsUpdatedFrom() {
    this.isFormUpdated$.next(false);
  }

  getIsUpdatedForm() {
    return this.isFormUpdated$.getValue();
  }
}
