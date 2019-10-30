// tslint:disable-next-line: class-name
export class event {
  constructor(
    public id: number,
    public userId: number,
    public startTime: Date,
    public endTime: Date,
    public allDay: true,
    public isMed1: boolean,
    public isMed2: boolean,
    public isMed3: boolean
  ) {}
}
