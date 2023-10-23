import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTimeSince',
})
export class GetTimeSincePipe implements PipeTransform {
  transform(value: string): string {
    const timeSince = this.getTimeSince(value);
    return timeSince;
  }

  /**
   * This method called to convert the Date to Since time.
   * @param date Created Date of the news
   * @returns The time since of that created news
   */
  getTimeSince(date: any) {
    const now = new Date();
    const timeStamp = new Date(date);
    const secondAgo = Math.floor((+now - +timeStamp) / 1000);

    if (secondAgo < 60) {
      return `${secondAgo} sec ago`;
    } else if (secondAgo < 3600) {
      const minuteAgo = Math.floor(secondAgo / 60);
      return `${minuteAgo} min ago`;
    } else if (secondAgo < 86400) {
      const hourAgo = Math.floor(secondAgo / 3600);
      return `${hourAgo} hr ago`;
    } else {
      const daysAgo = Math.floor(secondAgo / 86400);
      return `${daysAgo} day ago`;
    }
  }
}
