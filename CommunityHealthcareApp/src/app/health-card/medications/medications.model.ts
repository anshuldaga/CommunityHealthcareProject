export class Medication
{
    constructor(
        public id: number,
        public userId: number,
        public medication_name: string,
        public medication_notes: string
    )
    {}

}