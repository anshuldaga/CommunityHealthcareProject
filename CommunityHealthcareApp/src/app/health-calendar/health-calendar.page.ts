import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { Appointment } from './health-calendar.model';
import { DatePipe } from '@angular/common';

import { HealthCalendarService } from './health-calendar.service'

@Component({
  selector: 'app-health-calendar',
  templateUrl: './health-calendar.page.html',
  styleUrls: ['./health-calendar.page.scss'],
})
export class HealthCalendarPage implements OnInit {

  listAppointment: Appointment;
  private appointments : Appointment[] = [];

  constructor(private alertCtrl: AlertController, private appointment: HealthCalendarService) { }

  ionViewWillEnter() {
    this.appointment.fetchInformation().subscribe((res : Appointment[])=>{
      this.appointments = res;
  });
}

  ngOnInit() {
    
  }
}
