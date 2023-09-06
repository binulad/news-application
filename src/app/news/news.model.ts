export interface News {
  id: number;
  subject: string;
  fromDate: string;
  toDate: string;
  days: string;
  zoneName: string;
  district: string;
  centreName: string;
  noOfPeople: string;
  createdOn?: string;
  updatedOn?: string;
}

export interface AddNews {
  subject: string;
  newsDescription: string;
  fromDate: string;
  toDate: string;
  days: number;
  noOfPeople: string;
  anchorName: string | string[];
  departmentOrWing?: Departments[];
  guestDetails: ChiefGuests[];
  centerDetails: CenterDetails;
  files?: uploadFiles[];
}

export interface CenterDetails {
  centreName: string;
  zoneName: string;
  district: string;
  areaName: string;
  centreIncharge: string;
}

export interface ChiefGuests {
  name: string;
  identification: string;
  speechDescription?: string;
}

export interface uploadFiles {
  fileName: string;
  fileDescription: string;
}

export interface Departments {
  id: number;
  name: string;
}
