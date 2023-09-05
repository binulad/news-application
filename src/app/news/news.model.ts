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
