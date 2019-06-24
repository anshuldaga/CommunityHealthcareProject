import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, NgForm } from '@angular/forms';
import { ConditionsService } from '../conditions.service';

@Component({
  selector: 'app-add-condition',
  templateUrl: './add-condition.component.html',
  styleUrls: ['./add-condition.component.scss'],
})
export class AddConditionComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  constructor(private modalCtrl: ModalController,
    private conditionsService: ConditionsService) { }

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

  onConditionEntered()
  {
    if(!this.form.valid)
    {
      return;
    }
    this.conditionsService.addCondition(this.form.value['condition'], this.form.value['description']);
    this.modalCtrl.dismiss( { conditionData: {
      condition: this.form.value['condition'],
      description: this.form.value['description']
    }}, 'confirm');
  }
}
