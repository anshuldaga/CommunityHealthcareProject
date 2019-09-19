import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InformationService } from '../information.service';
import {Information} from '../information.model';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.page.html',
  styleUrls: ['./edit-information.page.scss'],
})
export class EditInformationPage implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  loadedInformation: Information;
  private loadedInformationSub: Subscription;

  constructor(private informationService: InformationService,
    private router: Router,
    private loadingCtrl: LoadingController) {}

    
  ionViewWillEnter() {
    this.informationService.fetchInformation().subscribe();
  }

  ngOnInit(){
    this.loadedInformationSub = this.informationService.information.subscribe(information => {
      this.loadedInformation = information;
    });
  }

  ngOnDestroy(){
    if(this.loadedInformationSub){
      this.loadedInformationSub.unsubscribe();
    }
  }

  onInformationEntered(){
    if(!this.form.valid){
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating...'
    }).then(loadingEl => {
      loadingEl.present();
      this.informationService.updateInformation(this.form.value['height_feet'], 
      this.form.value['height_inches'],
      this.form.value['weight'],
      this.form.value['bloodtype'],
      this.form.value['primary_contact'],
      this.form.value['secondary_contact'],
      this.form.value['medical_insurance'],
      this.form.value['dental_insurance'],
      this.form.value['birthday'],
      this.form.value['allergy_notes']).subscribe(() => 
      {
        loadingEl.dismiss();
        this.router.navigate(['tabs/tabs/information']);
      });
    });
  }
}
