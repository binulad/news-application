import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../news.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from '../news.constant';
import { AddNews, Departments, News } from '../news.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss'],
})
export class NewsFormComponent implements OnInit {
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
      this.isEdit = this.id ? true : false;
    });

    if (this.isEdit) {
      this.newsService.getNewsById(this.id).subscribe((response) => {
        this.editNewsForm = response;
        this.initNewsForm();
      });
    } else {
      this.initNewsForm();
    }
  }

  initNewsForm() {
    let subject = '';

    if (this.isEdit) {
      console.log('editNewsForm:', this.editNewsForm);

      subject = this.editNewsForm.subject;
    }

    this.newsForm = new FormGroup({
      subject: new FormControl(subject, Validators.required),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      days: new FormControl(null, Validators.required),
      noOfPeople: new FormControl(null, Validators.required),
      anchorName: new FormControl(null, Validators.required),
      departmentOrWing: new FormControl(null),
      newsDescription: new FormControl(null, Validators.required),
      guestDetails: new FormArray([
        new FormGroup({
          guestName: new FormControl(null, Validators.required),
          identification: new FormControl(null, Validators.required),
          speechDescription: new FormControl(null),
        }),
      ]),
      centerDetails: new FormGroup({
        centreName: new FormControl(null, Validators.required),
        centreIncharge: new FormControl(null, Validators.required),
        zoneName: new FormControl(null, Validators.required),
        district: new FormControl(null, Validators.required),
        areaName: new FormControl(null, Validators.required),
      }),
      files: new FormArray([]),
    });
  }

  getNewsByID() {
    this.newsService.getNewsById(this.id).subscribe();
  }

  validateField(fieldName: string, formArray?: any) {
    const fromGroup = formArray ? formArray : this.newsForm;
    return (
      !fromGroup.get(fieldName)?.valid && fromGroup.get(fieldName)?.touched
    );
  }

  onAddNewGuest() {
    this.guestDetails.push(
      new FormGroup({
        guestName: new FormControl(null, Validators.required),
        identification: new FormControl(null, Validators.required),
        speechDescription: new FormControl(null),
      })
    );
  }

  deleteGuestDetails(index: number) {
    this.guestDetails.removeAt(index);
  }

  onSubmit(newsData: FormGroup) {
    console.log(newsData.value);
    newsData.value['createdOn'] = new Date();
    newsData.value['updatedOn'] = null;
    this.newsService.addNews(newsData.value).subscribe((response) => {
      if (response) {
        this.router.navigate(['/news']);
      }
    });
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
