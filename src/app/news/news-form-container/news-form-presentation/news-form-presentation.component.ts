import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../news.constant';
import { AddNews, Departments } from '../../news.model';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-news-form-presentation',
  templateUrl: './news-form-presentation.component.html',
})
export class NewsFormPresentationComponent implements OnInit {
  newsForm!: FormGroup;
  maxDate: Date = new Date();
  minFromDate: Date = new Date();
  minToDate!: Date;
  DepartmentAndWingList: Departments[] = Constants.DepartmentList;
  selectedFiles: any[] = [];
  // url!: any;
  id!: number;
  isEdit: boolean = false;
  editNewsForm!: AddNews;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.minFromDate.setDate(this.maxDate.getDate() - 30);
  }

  get guestDetails(): FormArray {
    return this.newsForm.get('guestDetails') as FormArray;
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
  }

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
    let files = null;

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
      files = this.editNewsForm.files;
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
      files: new FormArray([]),
    });
  }

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

  validateField(fieldName: string, formArray?: any) {
    const fromGroup = formArray ? formArray : this.newsForm;
    return (
      !fromGroup.get(fieldName)?.valid && fromGroup.get(fieldName)?.touched
    );
  }

  onAddNewGuest() {
    this.guestDetails.push(this.createGuestFormGroup());
  }

  deleteGuestDetails(index: number) {
    this.guestDetails.removeAt(index);
  }

  onSubmit(newsData: FormGroup) {
    newsData.value['createdOn'] = this.isEdit
      ? this.editNewsForm.createdOn
      : new Date();
    newsData.value['updatedOn'] = this.isEdit ? new Date() : null;
    this.newsService.submitNews.next(newsData.value);
  }

  onFileSelect(event: any) {
    const files = event.target.files;
    if (!files.length) {
      return;
    }
    // this.selectedFiles = files;

    // const formData = new FormData();
    [...files].forEach((file) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        file.url = reader.result;
      };
      // formData.append('file', file, file.name);
    });
    this.selectedFiles = files;
  }
}
