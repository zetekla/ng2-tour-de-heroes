import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Calibrate }         from './calibrate';
import { CalibrateService }  from './services/calibrate.service';

@Component({
  moduleId: module.id,
  selector: 'my-calibrate-detail',
  templateUrl: '../fixtures/calibrates/calibrate-detail.component.html',
  styleUrls: [ '../css/calibrates/calibrate-detail.component.css' ]
})
export class CalibrateDetailComponent implements OnInit {
  calibrate: Calibrate;

  constructor(
    private calibrateService: CalibrateService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.calibrateService.getCalibrate(id)
        .then(calibrate => this.calibrate = calibrate);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.calibrateService.update(this.calibrate)
      .then(() => this.goBack());
  }
}
