export interface News {
  id: number;
  subject: string | '';
  fromDate: string;
  toDate: string;
  days: number;
  noOfPeople: number;
  anchorName: string;
  departmentOrWing?: string;
  newsDescription: string;
  guestDetails: ChiefGuests[];
  centerDetails: CenterDetails;
  files?: uploadFiles[];
  createdOn?: string;
  updatedOn?: string;
}

export interface AddNews {
  subject: string;
  fromDate: string;
  toDate: string;
  days: number;
  noOfPeople: number;
  anchorName: string;
  departmentOrWing?: string;
  newsDescription: string;
  guestDetails: ChiefGuests[];
  centerDetails: CenterDetails;
  files?: uploadFiles[];
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

export interface uploadFiles {
  fileName: string;
  fileDescription?: string;
}

export interface Departments {
  id: number;
  name: string;
}
