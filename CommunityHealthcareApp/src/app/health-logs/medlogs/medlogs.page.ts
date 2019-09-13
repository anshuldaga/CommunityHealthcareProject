import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-medlogs',
  templateUrl: './medlogs.page.html',
  styleUrls: ['./medlogs.page.scss'],
})
export class MedlogsPage implements OnInit 
{
  
  day = new Date();


  event = 
  {
    startTime: '',
    endTime: '',
    allDay: true,
    isInsulin: false,
    isBP: false,
    isBG: false
  };

  minDate = new Date().toISOString();
  eventSource = [
    {
      startTime: new Date(Date.UTC(this.day.getUTCFullYear(), this.day.getUTCMonth(), this.day.getUTCDate())),
      endTime: new Date(Date.UTC(this.day.getUTCFullYear(), this.day.getUTCMonth(), this.day.getUTCDate() + 1)),
      allDay: true,
      isInsulin: false,
      isBP: true,
      isBG: false
    },
    {
      startTime: new Date(Date.UTC(this.day.getUTCFullYear(), this.day.getUTCMonth(), this.day.getUTCDate() + 1)),
      endTime: new Date(Date.UTC(this.day.getUTCFullYear(), this.day.getUTCMonth(), this.day.getUTCDate() + 2)),
      allDay: true,
      isInsulin: true,
      isBP: true,
      isBG: false
    },
    {
      startTime: new Date(Date.UTC(this.day.getUTCFullYear(), this.day.getUTCMonth(), this.day.getUTCDate() + 4)),
      endTime: new Date(Date.UTC(this.day.getUTCFullYear(), this.day.getUTCMonth(), this.day.getUTCDate() + 5)),
      allDay: true,
      isInsulin: true,
      isBP: true,
      isBG: true
    },
    {
      startTime: new Date(Date.UTC(this.day.getUTCFullYear(), this.day.getUTCMonth(), this.day.getUTCDate() + 7)),
      endTime: new Date(Date.UTC(this.day.getUTCFullYear(), this.day.getUTCMonth(), this.day.getUTCDate() + 8)),
      allDay: true,
      isInsulin: true,
      isBP: false,
      isBG: true
    }
  ];

  calendar = {
    mode: 'week',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  ngOnInit()
  {
    this.resetEvent();
  }

  resetEvent() 
  {
    this.event = {
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: true,
      isInsulin: false,
      isBP: false,
      isBG: false
    };
  }

  isChecked(date: Date, property: string): boolean 
  {
    if(property == "isInsulin")
    {
      return this.getEvent(date).isInsulin;
    }
    else if(property == "isBP")
    {
      return this.getEvent(date).isBP;
    }
    else if(property == "isBG")
    {
      return this.getEvent(date).isBG;
    }
  }

  getEvent(date: Date)
  {
    return{
      ...this.eventSource.find(event =>{
        return event.endTime.getDate()  === date.getDate();
      })
    };
  }

  addEvent(day: Date, property: string) 
  {
    var index = this.eventSource.findIndex(x => x.endTime.getDate() === day.getDate());
    if (index !== -1) 
    {
      if(property == "isInsulin")
      {
        this.eventSource[index].isInsulin = true;
      }
      else if(property == "isBP")
      {
        this.eventSource[index].isBP = true;
      }
      else if(property == "isBG")
      {
        this.eventSource[index].isBG = true;
      }
    }
    else
    {
      let eventCopy = {
        startTime:  new Date(day),
        endTime: new Date(day),
        allDay: true,
        isInsulin: false,
        isBP: false,
        isBG: false
      }
      if(eventCopy.allDay)
      {
        let start = eventCopy.startTime;
        let end = eventCopy.endTime;
        eventCopy.startTime = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate()));
        eventCopy.endTime = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate() + 1));
        if(property == "isInsulin")
        {
          eventCopy.isInsulin = true;
        }
        else if(property == "isBP")
        {
          eventCopy.isBP = true;
        }
        else if(property == "isBG")
        {
          eventCopy.isBG = true;
        }
      }
      this.eventSource.push(eventCopy);
    }
    this.myCal.loadEvents();
    this.resetEvent();
  }

  deleteEvent(day: Date, property: string)
  {
    var index = this.eventSource.findIndex(x => x.endTime.getDate() === day.getDate());
    if (index !== -1) 
    {
      if(property == "isInsulin")
      {
        this.eventSource[index].isInsulin = false;
      }
      else if(property == "isBP")
      {
        this.eventSource[index].isBP = false;
      }
      else if(property == "isBG")
      {
        this.eventSource[index].isBG = false;
      }
    }    

    if(this.getEvent(day).isInsulin == false && this.getEvent(day).isBP == false && this.getEvent(day).isBG == false)
    {
      this.eventSource.splice(index, 1);
    }

    this.myCal.loadEvents();
    this.resetEvent();
  }

  today() 
  {
    this.calendar.currentDate = new Date();
  }

  onCurrentDateChanged(ev){}
  reloadSource(start,end){}
  onEventSelected(ev){}
  onViewTitleChanged(ev){}
  onTimeSelected(ev) {}
}
