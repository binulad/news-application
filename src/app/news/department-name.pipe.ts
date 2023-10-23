import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from './news.constant';

@Pipe({
  name: 'departmentName',
})
export class DepartmentNamePipe implements PipeTransform {
  transform(value: string): string {
    const getDepartment = Constants.DepartmentList.find(
      (department) => department.id == +value
    );
    return getDepartment?.name ? getDepartment?.name : '';
  }
}
