import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Calibrate } from './calibrate';
import { CalibrateService } from './services/calibrate.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: '../fixtures/calibrates/calibrates-dashboard.component.html',
  styleUrls: [ '../css/calibrates/calibrates-dashboard.component.css' ]
})
export class CalibrateDashboardComponent implements OnInit {
  calibrates: Calibrate[] = [];

  constructor(
    private router: Router,
    private calibrateService: CalibrateService
  ) { }

  ngOnInit(): void {
    this.calibrateService.getCalibrates()
      .then(calibrates => this.calibrates = calibrates.slice(1, 5));
  }

  gotoDetail(calibrate: Calibrate): void {
    let link = ['/detail', calibrate.id];
    this.router.navigate(link);
  }
}
