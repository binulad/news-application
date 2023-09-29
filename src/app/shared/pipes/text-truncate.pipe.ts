import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTruncate',
})
export class TextTruncatePipe implements PipeTransform {
  /**
   * This method called to truncate the string
   * @param value Passed the string
   * @param limit Passed the limit for string
   * @returns Return the truncated string after the applied limit
   */
  transform(value: string, limit: number): string {
    if (value.length > limit) {
      return value.substring(0, limit) + '...';
    }

    return value;
  }
}
