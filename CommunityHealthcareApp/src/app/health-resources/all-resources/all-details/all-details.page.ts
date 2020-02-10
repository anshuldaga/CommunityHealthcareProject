import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HealthResourcesService } from '../../health-resources.service';

@Component({
  selector: 'app-all-details',
  templateUrl: './all-details.page.html',
  styleUrls: ['./all-details.page.scss'],
})
export class AllDetailsPage implements OnInit {
  all_details: any;
  loadedTab: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private healthResourcesService: HealthResourcesService,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('detail') || !paramMap.has('category')) {
        return;
      }
      const detail = paramMap.get('detail');
      const category = paramMap.get('category');
      this.loadedTab = this.healthResourcesService.getDetailsTab(
        category,
        detail
      );
      this.all_details = eval(this.loadedTab.all_details);
    });
  }
}