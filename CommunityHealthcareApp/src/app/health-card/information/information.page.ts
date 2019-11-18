import { Component, OnInit, OnDestroy } from '@angular/core';
import { InformationService } from './information.service';
import { Information } from './information.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss']
})
export class InformationPage implements OnInit, OnDestroy {
  loadedInformation: Information;
  private loadedInformationSub: Subscription;
  public isLoading = false;

  constructor(private informationService: InformationService) {}

  ionViewWillEnter() {
    this.isLoading = true;
    this.informationService.fetchInformation().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.loadedInformationSub = this.informationService.information.subscribe(
      information => {
        this.loadedInformation = information;
      }
    );
  }

  ngOnDestroy() {
    if (this.loadedInformationSub) {
      this.loadedInformationSub.unsubscribe();
    }
  }
}
