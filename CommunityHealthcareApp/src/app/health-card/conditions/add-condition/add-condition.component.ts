import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
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
    private conditionsService: ConditionsService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() 
  {
  }

  onCancel()
  {
    this.modalCtrl.dismiss(null, 'cancel');
  }


  onConditionEntered()
  {
    if(!this.form.valid)
    {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating...'
    }).then(loadingEl => {
      loadingEl.present();
      this.conditionsService.addCondition(this.form.value['condition'], 
      this.form.value['description']).subscribe(() => {
        loadingEl.dismiss();
        this.modalCtrl.dismiss( { conditionData: {
          condition: this.form.value['condition'],
          description: this.form.value['description']
        }}, 'confirm');
      });
    });
  }
}
