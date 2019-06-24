import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, NgForm } from '@angular/forms';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.scss'],
})
export class AddMedicationComponent implements OnInit 
{
  @ViewChild('f') form: NgForm;

  constructor(private modalCtrl: ModalController,
    private medicationsService: MedicationsService) { }

  ngOnInit() 
  {
  }

  onCancel()
  {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  ionViewWillLeave()
  {
    console.log("BYE");
  }

  onMedicationEntered()
  {
    if(!this.form.valid)
    {
      return;
    }
    this.medicationsService.addMedication(this.form.value['medication'], this.form.value['notes']);
    this.modalCtrl.dismiss( { conditionData: {
      medication: this.form.value['medication'],
      notes: this.form.value['notes']
    }}, 'confirm');
  }
}
