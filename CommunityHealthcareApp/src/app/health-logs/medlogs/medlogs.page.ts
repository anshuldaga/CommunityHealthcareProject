import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Subscription } from 'rxjs';
import { MedlogsService } from './medlogs.service';
import { MednamesService } from './mednames.service';
import { event } from './medlogs.model';
import { Mednames } from './mednames.model';
import { ModalController, LoadingController } from '@ionic/angular';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-medlogs',
  templateUrl: './medlogs.page.html',
  styleUrls: ['./medlogs.page.scss']
})
export class MedlogsPage implements OnInit, OnDestroy {
  alldaylabel = '';

  event: event;
  constructor(
    private medlogsService: MedlogsService,
    private mednamesService: MednamesService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}
  eventSource: event[];
  private eventSourceSub: Subscription;

  mednames: Mednames;
  private mednamesSub: Subscription;

  calendar = {
    mode: 'week',
    currentDate: new Date()
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  ionViewWillEnter() {
    this.medlogsService.fetchLogs().subscribe();
    this.mednamesService.fetchMednames().subscribe();
  }

  ngOnInit() {
    this.eventSourceSub = this.medlogsService.eventSource.subscribe(ev => {
      this.eventSource = ev;
    });
    this.mednamesSub = this.mednamesService.mednames.subscribe(data => {
      this.mednames = data;
      this.alldaylabel =
        this.mednames.med1name +
        '||' +
        this.mednames.med2name +
        '||' +
        this.mednames.med3name +
        '||' +
        this.mednames.med1notes +
        '||' +
        this.mednames.med2notes +
        '||' +
        this.mednames.med3notes;
    });
    this.resetEvent();
  }

  ngOnDestroy() {
    if (this.eventSourceSub) {
      this.eventSourceSub.unsubscribe();
    }
    if (this.mednamesSub) {
      this.mednamesSub.unsubscribe();
    }
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  resetEvent() {
    this.event = {
      id: null,
      userId: 877,
      startTime: new Date(),
      endTime: new Date(),
      allDay: true,
      isMed1: false,
      isMed2: false,
      isMed3: false
    };
  }

  onCurrentDateChanged(ev) {}
  reloadSource(start, end) {}
  onEventSelected(ev) {}
  onViewTitleChanged(ev) {}
  onTimeSelected(ev) {}

  isChecked(date: Date, property: string): boolean {
    const index = this.eventSource.findIndex(
      x => x.endTime.getDate() === date.getDate()
    );
    if (index !== -1) {
      if (property == 'isMed1') {
        return this.eventSource[index].isMed1;
      } else if (property == 'isMed2') {
        return this.eventSource[index].isMed2;
      } else if (property == 'isMed3') {
        return this.eventSource[index].isMed3;
      }
    } else {
      return false;
    }
  }

  addEvent(day: Date, property: string) {
    // update existing event
    const index = this.eventSource.findIndex(
      x => x.endTime.getDate() === day.getDate()
    );
    const temp = this.eventSource[index];
    if (index !== -1) {
      if (property == 'isMed1') {
        temp.isMed1 = true;
      } else if (property == 'isMed2') {
        temp.isMed2 = true;
      } else if (property == 'isMed3') {
        temp.isMed3 = true;
      }
      this.medlogsService.update(temp).subscribe();
    } else {
      this.medlogsService.add(day, property).subscribe();
    }
    this.myCal.loadEvents();
    this.resetEvent();
  }

  deleteEvent(day: Date, property: string) {
    // update existing event
    const index = this.eventSource.findIndex(
      x => x.endTime.getDate() === day.getDate()
    );
    const temp = this.eventSource[index];
    if (index !== -1) {
      if (property == 'isMed1') {
        this.eventSource[index].isMed1 = false;
      } else if (property == 'isMed2') {
        this.eventSource[index].isMed2 = false;
      } else if (property == 'isMed3') {
        this.eventSource[index].isMed3 = false;
      }
      this.medlogsService.update(temp).subscribe();
    }

    // delete entire event
    if (
      this.eventSource[index].isMed1 == false &&
      this.eventSource[index].isMed2 == false &&
      this.eventSource[index].isMed3 == false
    ) {
      this.medlogsService.delete(temp).subscribe();
    }
    this.myCal.loadEvents();
    this.resetEvent();
  }

  onEdit() {
    this.modalCtrl
      .create({
        component: EditComponent
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      });
  }
}
