import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HealthResourcesService } from '../health-resources.service';

@Component({
  selector: 'app-all-resources',
  templateUrl: './all-resources.page.html',
  styleUrls: ['./all-resources.page.scss'],
})
export class AllResourcesPage implements OnInit {
  all_resources: any;
  loadedTab: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private healthResourcesService: HealthResourcesService,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('category')) {
        return;
      }
      const category = paramMap.get('category');
      this.loadedTab = this.healthResourcesService.getResourcesTab(
        category
      );
      this.all_resources = eval(this.loadedTab.all_resources);
    });
  }
}
