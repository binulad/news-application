import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../news.constant';
import { Departments, News } from '../../news.model';
import { NewsService } from '../../news.service';
import { ModalHostDirective } from 'src/app/shared/directives/modal-host.directive';
import { NewsPresenterService } from '../news-form-presenter/news-form.presenter';

@Component({
  selector: 'app-news-form-presentation',
  templateUrl: './news-form-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFormPresentationComponent implements OnInit {
  @ViewChild('uploadFile') uploadFileInput: any;
  @ViewChild('videoLink') uploadVideoLink: any;

  @ViewChild(ModalHostDirective) modalHost!: ModalHostDirective;

  newsForm!: FormGroup;
  maxDate: Date = new Date();
  minToDate!: Date;
  DepartmentAndWingList: Departments[] = Constants.DepartmentList;
  selectedFiles: any[] = [];
  id!: number;
  isEdit: boolean = false;
  editNewsForm!: any;
  initialValue!: News;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private newsFormService: NewsPresenterService
  ) {}

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
      this.setFormValue();
    });
  }

  /**
   * This method called to set the Form value
   */
  setFormValue() {
    this.newsForm = this.newsFormService.createNewsForm();
    if (this.isEdit) {
      this.newsService.getNews.subscribe((response) => {
        this.editNewsForm = response;
        this.patchNewsFormValues();
        this.getGuestDetails();
        this.getAllFiles();
        this.initialValue = this.newsForm.value;
      });
    }

    // Check if the values are change or not
    this.newsForm.valueChanges.subscribe((updatedValue: any) => {
      const isValueUpdated =
        JSON.stringify(this.initialValue) !== JSON.stringify(updatedValue);
      this.newsFormService.isFormUpdated$.next(
        this.newsForm.dirty && isValueUpdated
      );
    });
  }

  /**
   * This method called to patch form value
   */
  patchNewsFormValues(): void {
    this.newsForm.patchValue({ ...this.editNewsForm });
    this.newsForm.patchValue({
      fromDate: new Date(
        this.editNewsForm.fromDate ?? this.editNewsForm.fromDate
      ),
      toDate: new Date(this.editNewsForm.toDate ?? this.editNewsForm.toDate),
    });
  }

  /**
   * This method called to set Guest Details
   */
  getGuestDetails(): void {
    if (this.editNewsForm.guestDetails) {
      for (const guest of this.editNewsForm.guestDetails) {
        this.guestDetails.push(
          this.newsFormService.createGuestFormGroup(
            guest.guestName,
            guest.identification,
            guest.speechDescription
          )
        );
      }
    }
  }

  /**
   * This method called to set all the files
   */
  getAllFiles(): void {
    if (this.editNewsForm.files) {
      for (const file of this.editNewsForm.files) {
        this.files.push(
          this.newsFormService.createFileGroup(
            file.fileName,
            file.fileURL,
            file.fileDescription
          )
        );
      }
      this.selectedFiles = [...this.editNewsForm.files];
    }
  }

  /**
   * This method called to validate the Field
   * @param fieldName Passed the field name
   * @param formArray Passed the Array name (optional)
   * @returns Return the boolean value
   */
  validateField(fieldName: string, formArray?: any) {
    const formGroup = formArray ?? this.newsForm;
    return (
      !formGroup.get(fieldName)?.valid && formGroup.get(fieldName)?.touched
    );
  }

  /**
   * This method called while add a new guest
   */
  onAddNewGuest() {
    this.guestDetails.push(this.newsFormService.createGuestFormGroup());
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
    this.newsFormService.isFormUpdated$.next(false);
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

    console.log('promises::', this.newsForm.get('files'));

    // Use Promise.all to wait for all conversions to complete
    Promise.all(promises)
      .then((results) => {
        // All files have been converted, you can now push them to the FormArray
        this.selectedFiles.push(...files);
        this.uploadFileInput.nativeElement.value = '';

        console.log('selectedFiles', this.selectedFiles);
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
        filesFormArray.push(
          this.newsFormService.createFileGroup(file.name, file.fileURL, '')
        );

        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
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
   * This method called while adding a video
   */
  addVideo() {
    const videoURL: string = this.uploadVideoLink.nativeElement.value;

    const videoGroup = this.newsFormService.createFileGroup(
      'Video',
      videoURL,
      ''
    );
    this.files.push(videoGroup);

    this.selectedFiles.push(videoGroup.value);
    this.uploadVideoLink.nativeElement.value = '';
  }
}
