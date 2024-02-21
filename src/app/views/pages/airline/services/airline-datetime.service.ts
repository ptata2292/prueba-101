import { Injectable } from '@angular/core';
import { AirlineFlightSegmentViewModel } from '../viewmodels/airline-flight-segment';

@Injectable({
  providedIn: 'root'
})
export class AirlineDatetimeService {

  constructor() { }

  truncateTime(datetime: Date){
    if(datetime == null) {
      datetime = new Date()
    } else {
      datetime = new Date(datetime)  
      var userTimezoneOffset = datetime.getTimezoneOffset() * 60000;
      datetime = new Date(datetime.getTime() - userTimezoneOffset);
      // time = new Date(time)  
    }
    const timeStr = datetime.toISOString()
    return timeStr.substring(0, timeStr.lastIndexOf('T')) + 'T00:00:00';
  }

  flightDuration(val: string) : {hours: number, minutes: number}{ 
    let regex = new RegExp(/(?<hours>\d+)H(\s)*(?<minutes>\d+)M/gi);
    let result = regex.exec(val);
    return { hours: Number(result.groups['hours']), minutes: Number(result.groups['minutes'])};
  }

  getTotalTravelTime(flightSegments: AirlineFlightSegmentViewModel[]) {
    
    // total = sum('flight duration') + sum('pause between flights')
    let totalInSeconds = 0;

    // flight duration 
    flightSegments.forEach(i => {
      let duration = this.flightDuration(i.flightDuration);
      let durationInSeconds = duration.hours * 3600 + duration.minutes * 60;
      totalInSeconds += durationInSeconds;
    });

    // pause between flights
    for(let i = 1; i < flightSegments.length; i++){
      let pFlightSegment = flightSegments[i-1];
      let flightSegment = flightSegments[i];
      const arrivalTime = new Date(pFlightSegment.arrivalDate + "T" + pFlightSegment.arrivalTime);
      const nextDepartureTime = new Date(flightSegment.departureDate + "T" + flightSegment.departureTime);
      const timeMS = nextDepartureTime.getTime() - arrivalTime.getTime();
      totalInSeconds += timeMS / 1000;
    }
    
    const hours = Math.floor(totalInSeconds / 3600);
    const minutes = (Math.floor(totalInSeconds / (60)) % 60);

    return hours + "H " +  minutes + "M";
  }

  getTotalDays(flightSegments: AirlineFlightSegmentViewModel[]) {
    const firstFlightSegment = flightSegments[0];
    const lastFlightSegment = flightSegments.length > 1 ? flightSegments[flightSegments.length -1] : flightSegments[0];
    return this.getDayDiff(firstFlightSegment.departureDate, lastFlightSegment.arrivalDate);
  }
  
  getDayDiff(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const timeMS = endDate.getTime() - startDate.getTime(); 
    const days = Math.floor(timeMS / (60*60*1000*24));
    return days;    
  }

  getTimeDiff(pFlightSegment: AirlineFlightSegmentViewModel, flightSegment: AirlineFlightSegmentViewModel) {
    const pFlightSegmentDate = new Date(pFlightSegment.arrivalDate + "T" + pFlightSegment.arrivalTime + ":00")
    const flightSegmentDate = new Date(flightSegment.departureDate + "T" + flightSegment.departureTime + ":00")
    var diff = flightSegmentDate.getTime() - pFlightSegmentDate.getTime() ;
    return this.msToTime(diff);
  }
  
  msToTime(duration: number) {
    let seconds: any = Math.floor((duration / 1000) % 60);
    let minutes: any = Math.floor((duration / (1000 * 60)) % 60);
    let hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    //return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    if(parseInt(hours) == 0){
      return minutes + "M";
    } else {
      return hours + "H " + minutes + "M";
    }
  }

  public changeTimeFormat(time: string, timeFormat: '12' | '24'): string {
    return timeFormat == '12' ? this.changeTimeFormatTo12(time) : this.changeTimeFormatTo24(time);
  }

  private changeTimeFormatTo12(time: string): string {
    const match = (time || '').match(/^([0-9]{1,2}):([0-9]{1,2})$/);

    if(!match) {
      console.log(`Invalid 24-time value: ${time}`);
      return time;
    }

    let hour = parseInt(match[1]);
    const amOrPm = hour >= 12 ? 'pm' : 'am';
    hour = (hour % 12) || 12;
    return `${hour}:${match[2]} ${amOrPm}`;
  }

  private changeTimeFormatTo24(time: string): string {
    const match = (time || '').match(/^([0-9]{1,2}):([0-9]{1,2}) (am|pm)$/i);

    if(!match) {
      console.log(`Invalid 12-time value: ${time}`);
      return time;
    }

    let [_, hour, minute, amOrPm] = match;
    if (hour === '12') {
      hour = '00';
    }

    if (amOrPm.toLowerCase() === 'pm') {
      hour = (parseInt(hour) + 12).toString();
    }

    return `${hour}:${minute}`;
  }
}
