export class event
{
    constructor(
        public id: number,
        public userId: number,
        public startTime: Date,
        public endTime: Date,
        public allDay: boolean,
        public isInsulin: boolean,
        public isBP: boolean,
        public isBG: boolean,
        public insulinValue: number,
        public BPValue: number,
        public BGValue: number
    )
    {}

}