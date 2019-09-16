import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular'
import { DatePipe } from '@angular/common';

import { HealthCalendarService } from '../service/health-calendar.service'

@Component({
  selector: 'app-health-calendar',
  templateUrl: './health-calendar.page.html',
  styleUrls: ['./health-calendar.page.scss'],
})
export class HealthCalendarPage implements OnInit {

  event = {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    isMedication: false
  };

  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private datePipe: DatePipe, private add: HealthCalendarService) { }

  ngOnInit() {
    this.resetEvent();
  }

  resetEvent() {
    this.event = {
      title: '',
      description: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      location: '',
      isMedication: false
    };
  }

  addEvent() {
    let eventCopy = {
      title: this.event.title,
      description: this.event.description,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      location: this.event.location,
      isMedication: this.event.isMedication
    }
 
    // if (eventCopy.allDay) {
    //   let start = eventCopy.startTime;
    //   let end = eventCopy.endTime;
 
    //   eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
    //   eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    // }
    
    this.add.addEvent(this.event.title, this.event.description, this.event.startTime, this.event.endTime, this.event.location, this.event.isMedication)
    .subscribe(res => {
      console.log(res)
    });
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }
   
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }
   
  // Selected date range and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
async onEventSelected(event) {
  // Use Angular date pipe for conversion
  let start = this.datePipe.transform(event.startTime, 'dd/MM/yyyy');
  let end = this.datePipe.transform(event.endTime, 'dd/MM/yyyy');
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK']
  });
  alert.present();
}

// Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected.toISOString());
}

}
