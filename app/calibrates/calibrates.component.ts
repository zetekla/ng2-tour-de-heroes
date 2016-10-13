import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {Calibrate} from "./calibrate";
import {CalibrateService} from "./services/calibrate.service";

@Component({
  moduleId: module.id,
  selector: 'my-calibrates',
  templateUrl: '../fixtures/calibrates/calibrates.component.html',
  styleUrls: ['../css/calibrates/calibrates.component.css'],
  providers: [CalibrateService]
})
export class CalibratesComponent implements OnInit {
  calibrates: Calibrate[];
  selectedCalibrate: Calibrate;

  constructor(
    private router: Router,
    private calibrateService: CalibrateService
  ) { }

  ngOnInit(): void {
    this.getCalibrates();
  }

  getCalibrates(): void {
    this.calibrateService.getCalibrates().then(calibrates => {
      this.calibrates = calibrates;
      // console.log('Retrieved our list of calibrates ',calibrates)
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.calibrateService.create(name)
      .then(calibrate => {
        this.calibrates.push(calibrate);
        this.selectedCalibrate = null;
      });
  }

  delete(calibrate: Calibrate): void {
    this.calibrateService
      .delete(calibrate.id)
      .then(() => {
        this.calibrates = this.calibrates.filter(h => h !== calibrate);
        if (this.selectedCalibrate === calibrate) { this.selectedCalibrate = null; }
      });
  }

  onSelect(calibrate: Calibrate): void {
    this.selectedCalibrate = calibrate;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCalibrate.id]);
  }
}
