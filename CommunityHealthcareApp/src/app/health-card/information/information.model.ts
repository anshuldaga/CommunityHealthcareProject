export class Information
{
    constructor(
        public id: string,
        public height_feet: number,
        public height_inches: number,
        public weight: number,
        public bloodtype: string,
        public primary_contact: number,
        public secondary_contact: number,
        public medical_insurance: string,
        public dental_insurance: string, 
        public birthday: string,
        public allergy_notes: string
    )
    {}

}