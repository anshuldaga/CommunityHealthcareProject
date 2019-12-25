export class Appointment
{
    constructor(
        public title: string,
        public description: string,
        public startTime: Date,
        public endTime: Date,
        public location: string
    )
    {}

}