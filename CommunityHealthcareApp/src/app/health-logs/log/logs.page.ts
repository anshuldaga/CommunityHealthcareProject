import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import {Subscription} from 'rxjs';
import {LogsService} from './logs.service'
import {event} from './logs.model';
import { ModalController, LoadingController } from '@ionic/angular';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})

export class LogsPage implements OnInit, OnDestroy 
{
  event: event;
  constructor(private logsService: LogsService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController){}
  eventSource: event[];
  private eventSourceSub: Subscription;

  calendar = {
    mode: 'week',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  ionViewWillEnter() {
   this.logsService.fetchLogs().subscribe();
  }  

  ngOnInit()
  {
    
    this.eventSourceSub = this.logsService.eventSource.subscribe(ev => {
      this.eventSource = ev;
    });
    this.resetEvent();
  }

  ngOnDestroy()
  {
    if(this.eventSourceSub)
    {
      this.eventSourceSub.unsubscribe();
    }
  }

  today() 
  {
    this.calendar.currentDate = new Date();
  }

  resetEvent() 
  {
    this.event = {
      id: null,
      userId: 8778,
      startTime: new Date(),
      endTime: new Date(),
      allDay: true,
      isInsulin: false,
      isBP: false,
      isBG: false,
      insulinValue: null,
      BPValue: null,
      BGValue: null
    };
  }

  onCurrentDateChanged(ev){}
  reloadSource(start,end){}
  onEventSelected(ev){}
  onViewTitleChanged(ev){}
  onTimeSelected(ev) {}

  isChecked(date: Date, property: string): boolean 
  {
    var index = this.eventSource.findIndex(x => x.endTime.getDate() === date.getDate());
    if (index !== -1) 
      {
      if(property == "isInsulin")
      {
        return this.eventSource[index].isInsulin;
      }
      else if(property == "isBP")
      {
        return this.eventSource[index].isBP;
      }
      else if(property == "isBG")
      {
        return this.eventSource[index].isBG;
      }
    }
    else
    {
      return false;
    }
  }

  getValue(day: Date, property: string)
  {
    var index = this.eventSource.findIndex(x => x.endTime.getDate() === day.getDate());
    if (index !== -1) 
    {
      if(property == "isInsulin")
      {
        return this.eventSource[index].insulinValue;
      }
      else if(property == "isBP")
      {
        return this.eventSource[index].BPValue;
      }
      else if(property == "isBG")
      {
        return this.eventSource[index].BGValue;
      }
    } 
    else
    {
      return null;
    }  
  }

  addEvent(day: Date, property: string) 
  {
    //update existing event
    var index = this.eventSource.findIndex(x => x.endTime.getDate() === day.getDate());
    let temp = this.eventSource[index];
    if (index !== -1) 
    {
      if(property == "isInsulin")
      {
        temp.isInsulin = true;
      }
      else if(property == "isBP")
      {
        temp.isBP = true;
      }
      else if(property == "isBG")
      {
        temp.isBG = true;
      }
      this.logsService.update(temp).subscribe();
      //open modal
      this.modalCtrl
        .create({
          component: EditComponent,
          componentProps: { 
          tempEvent : temp,
          evProperty: property
          }})
          .then(modalEl => {
          modalEl.present();
          return modalEl.onDidDismiss();
         });
    }
    //create a new event 
    else
    {
      this.logsService.add(day, property).subscribe(()=>{
        temp = this.eventSource[this.eventSource.length - 1];
        this.modalCtrl
        .create({
          component: EditComponent,
          componentProps: { 
            tempEvent : temp,
            evProperty: property
          }})
        .then(modalEl => {
          modalEl.present();
          return modalEl.onDidDismiss();
        });  
      }); 
    }
    this.myCal.loadEvents();
    this.resetEvent();
  }

  deleteEvent(day: Date, property: string)
  {
    //update existing event
    var index = this.eventSource.findIndex(x => x.endTime.getDate() === day.getDate());
    let temp = this.eventSource[index];
    if (index !== -1) 
    {
      if(property == "isInsulin")
      {
        this.eventSource[index].isInsulin = false;
        this.eventSource[index].insulinValue = null;
      }
      else if(property == "isBP")
      {
        this.eventSource[index].isBP = false;
        this.eventSource[index].BPValue = null;
      }
      else if(property == "isBG")
      {
        this.eventSource[index].isBG = false;
        this.eventSource[index].BGValue = null;
      }
      this.logsService.update(temp).subscribe();
    }    

    //delete entire event
    if(this.eventSource[index].isInsulin == false && this.eventSource[index].isBP == false && this.eventSource[index].isBG == false)
    {
      this.logsService.delete(temp).subscribe();
    }
    this.myCal.loadEvents();
    this.resetEvent();
  }

}
