export class News {
  constructor(
    public id: number,
    public subject: string,
    public fromDate: string,
    public toDate: string,
    public days: number,
    public noOfPeople: number,
    public anchorName: string,
    public departmentOrWing: string,
    public newsDescription: string,
    public guestDetails: ChiefGuests[],
    public centerDetails: CenterDetails,
    public files?: UploadFiles[],
    public createdOn?: string,
    public updatedOn?: string
  ) {}
}

export interface AddNews {
  subject: string;
  fromDate: string;
  toDate: string;
  days: number;
  noOfPeople: number;
  anchorName: string;
  departmentOrWing: string;
  newsDescription: string;
  guestDetails: ChiefGuests[];
  centerDetails: CenterDetails;
  files?: UploadFiles[];
  createdOn?: string;
  updatedOn?: string;
}

export interface CenterDetails {
  centreName: string;
  centreIncharge: string;
  zoneName: string;
  district: string;
  areaName: string;
}

export interface ChiefGuests {
  guestName: string;
  identification: string;
  speechDescription?: string;
}

export interface UploadFiles {
  fileName: string;
  fileURL: string;
  fileDescription?: string;
}

export interface Departments {
  id: number;
  name: string;
  isAvailable?: boolean;
}

export class QueryParams {
  q: string;
  sortBy: string;
  direction: string;
  category: string | undefined | number;
  constructor(
    q: string,
    sortBy: string,
    direction: string,
    category: string | undefined | number
  ) {
    this.q = q || '';
    this.sortBy = sortBy || 'createdOn';
    this.direction = direction || 'desc';
    this.category = category;
  }
}
