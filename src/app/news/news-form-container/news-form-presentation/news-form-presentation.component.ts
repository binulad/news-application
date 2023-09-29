import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../news.constant';
import { AddNews, Departments } from '../../news.model';
import { NewsService } from '../../news.service';
import { ModalHostDirective } from 'src/app/shared/directives/modal-host.directive';
import { ConfirmationModal } from 'src/app/shared/models/common.model';
import { ConfirmationModalService } from 'src/app/shared/components/confirmation-modal/confirmation-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-form-presentation',
  templateUrl: './news-form-presentation.component.html',
})
export class NewsFormPresentationComponent implements OnInit, OnDestroy {
  @ViewChild('uploadFile') uploadFileInput: any;
  @ViewChild(ModalHostDirective) modalHost!: ModalHostDirective;

  newsForm!: FormGroup;
  maxDate: Date = new Date();
  minFromDate: Date = new Date();
  minToDate!: Date;
  DepartmentAndWingList: Departments[] = Constants.DepartmentList;
  selectedFiles: any[] = [];
  id!: number;
  isEdit: boolean = false;
  editNewsForm!: AddNews;
  confirmationYesSub!: Subscription;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationModalService: ConfirmationModalService
  ) {
    this.minFromDate.setDate(this.maxDate.getDate() - 30);
  }

  /**
   * Get the guest detail Array from newsForm
   */
  get guestDetails(): FormArray {
    return this.newsForm.get('guestDetails') as FormArray;
  }

  /**
   * Get the files Array from newsForm
   */
  get files(): FormArray {
    return this.newsForm.get('files') as FormArray;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEdit = !!this.id;
    });

    if (this.isEdit) {
      this.newsService.getNews.subscribe((response) => {
        this.editNewsForm = response;
        this.initNewsForm();
      });
    } else {
      this.initNewsForm();
    }

    this.confirmationYesSub =
      this.confirmationModalService.onClickYes.subscribe((value) => {
        if (value) {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      });
  }

  /**
   * This method called to set the initial value of the newsForm
   */
  initNewsForm() {
    let subject = '';
    let fromDate = null;
    let toDate = null;
    let days = null;
    let noOfPeople = null;
    let anchorName = '';
    let departmentOrWing = null;
    let newsDescription = '';
    let guestDetails: any[] = [];
    let centerDetails = Object.assign({});
    let files: any[] = [];

    if (this.isEdit) {
      subject = this.editNewsForm.subject;
      fromDate = new Date(this.editNewsForm.fromDate);
      toDate = new Date(this.editNewsForm.toDate);
      days = this.editNewsForm.days;
      noOfPeople = this.editNewsForm.noOfPeople;
      anchorName = this.editNewsForm.anchorName;
      departmentOrWing = this.editNewsForm.departmentOrWing;
      newsDescription = this.editNewsForm.newsDescription;
      if (this.editNewsForm.guestDetails) {
        for (const guest of this.editNewsForm.guestDetails) {
          guestDetails.push(
            this.createGuestFormGroup(
              guest.guestName,
              guest.identification,
              guest.speechDescription
            )
          );
        }
      }
      centerDetails = Object.assign({}, this.editNewsForm.centerDetails);
      if (this.editNewsForm.files) {
        for (const file of this.editNewsForm.files) {
          files.push(
            this.createFileGroup(
              file.fileName,
              file.fileURL,
              file.fileDescription
            )
          );
        }
        this.selectedFiles = [...this.editNewsForm.files];
      }
    }

    this.newsForm = new FormGroup({
      subject: new FormControl(subject, Validators.required),
      fromDate: new FormControl(fromDate, Validators.required),
      toDate: new FormControl(toDate, Validators.required),
      days: new FormControl(days, Validators.required),
      noOfPeople: new FormControl(noOfPeople, Validators.required),
      anchorName: new FormControl(anchorName, Validators.required),
      departmentOrWing: new FormControl(departmentOrWing),
      newsDescription: new FormControl(newsDescription, Validators.required),
      guestDetails: new FormArray(guestDetails),
      centerDetails: new FormGroup({
        centreName: new FormControl(
          centerDetails.centreName,
          Validators.required
        ),
        centreIncharge: new FormControl(
          centerDetails.centreIncharge,
          Validators.required
        ),
        zoneName: new FormControl(centerDetails.zoneName, Validators.required),
        district: new FormControl(centerDetails.district, Validators.required),
        areaName: new FormControl(centerDetails.areaName, Validators.required),
      }),
      files: new FormArray(files),
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
    fileURL?: string,
    fileDescription?: string
  ): FormGroup {
    return new FormGroup({
      fileName: new FormControl(fileName),
      fileURL: new FormControl(fileURL),
      fileDescription: new FormControl(fileDescription),
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
  ): FormGroup {
    return new FormGroup({
      guestName: new FormControl(guestName, Validators.required),
      identification: new FormControl(identification, Validators.required),
      speechDescription: new FormControl(speechDescription),
    });
  }

  /**
   * This method called to validate the Field
   * @param fieldName Passed the field name
   * @param formArray Passed the Array name (optional)
   * @returns Return the boolean value
   */
  validateField(fieldName: string, formArray?: any) {
    const fromGroup = formArray ? formArray : this.newsForm;
    return (
      !fromGroup.get(fieldName)?.valid && fromGroup.get(fieldName)?.touched
    );
  }

  /**
   * This method called while add a new guest
   */
  onAddNewGuest() {
    this.guestDetails.push(this.createGuestFormGroup());
  }

  /**
   * This method called while delete/remove the guest from array
   * @param index Passed the index of the deleted guest
   */
  deleteGuestDetails(index: number) {
    this.guestDetails.removeAt(index);
  }

  /**
   * This method called while submit the newsForm
   * @param newsData Passed the newsData
   */
  onSubmit(newsData: FormGroup) {
    newsData.value['createdOn'] = this.isEdit
      ? this.editNewsForm.createdOn
      : new Date();
    newsData.value['updatedOn'] = this.isEdit ? new Date() : null;

    this.newsService.submitNews.next(newsData.value);
  }

  /**
   * This method called while upload any files
   * @param event Passed the event
   * @returns Return if the no file selected otherwise add the selected files into the 'selectedFiles' array
   */
  onFileChange(event: any) {
    const files = event.target.files;

    if (!files.length) {
      return;
    }

    // Create an array of promises for each file conversion
    const promises = [...files].map((file) => this.toBase64(file));

    // Use Promise.all to wait for all conversions to complete
    Promise.all(promises)
      .then((results) => {
        // All files have been converted, you can now push them to the FormArray
        this.selectedFiles.push(...files);
        this.uploadFileInput.nativeElement.value = '';
      })
      .catch((error) => {
        console.error('Error converting files:', error);
      });
  }

  /**
   * This method called to convert the selected image file into the base64 string
   * @param file Passed the selected image file
   * @returns Return the base64 string for that image
   */
  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        file.fileURL = reader.result;
        // Assuming 'files' is a FormArray in your 'newsForm'
        const filesFormArray = this.newsForm.get('files') as FormArray;
        filesFormArray.push(this.createFileGroup(file.name, file.fileURL, ''));
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject();
      };
    });
  }

  /**
   * This method called to remove the file from 'selectedFiles' Array
   * @param index Passed the file index
   */
  removeFile(index: number) {
    this.files.removeAt(index);
    this.selectedFiles.splice(index, 1);
  }

  /**
   * This method called while click on the back button
   * If the newsForm data is updated then open the confirmation modal
   */
  onClickBack() {
    if (this.newsForm.dirty) {
      const modalData: ConfirmationModal = {
        title: 'Confirmation Modal',
        content: 'Are you sure you want to discard changes?',
      };
      this.confirmationModalService.loadConfirmationComponent(
        this.modalHost,
        modalData
      );
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  ngOnDestroy(): void {
    this.confirmationYesSub.unsubscribe();
  }
}
