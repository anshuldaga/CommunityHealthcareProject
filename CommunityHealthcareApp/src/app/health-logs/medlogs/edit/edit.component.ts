import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { MedlogsService } from '../medlogs.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  tempEvent;
  evProperty;

  constructor(
    private modalCtrl: ModalController,
    private medlogsService: MedlogsService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
