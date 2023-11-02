import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from './news.constant';

@Pipe({
  name: 'departmentName',
})
export class DepartmentNamePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '-';
    }
    const getDepartment = Constants.DepartmentList.filter((department) => {
      return value.includes(department.id);
    }).map((option) => option.name);

    return getDepartment.join(', ');
  }
}
