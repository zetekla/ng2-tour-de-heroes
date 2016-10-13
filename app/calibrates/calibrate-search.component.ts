import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { CalibrateSearchService } from './services/calibrate-search.service';
import {Calibrate} from "./calibrate";

@Component({
  moduleId: module.id,
  selector: 'calibrate-search',
  templateUrl: '../fixtures/calibrate-search.component.html',
  styleUrls: [ '../css/calibrate-search.component.css' ],
  providers: [CalibrateSearchService]
})

export class CalibrateSearchComponent implements OnInit {
  calibrates: Observable<Calibrate[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private calibrateSearchService: CalibrateSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.calibrates = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.calibrateSearchService.search(term)
        // or the observable of empty calibrates if no search term
        : Observable.of<Calibrate[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Calibrate[]>([]);
      });
  }

  gotoDetail(calibrate: Calibrate): void {
    let link = ['/detail', calibrate.id];
    this.router.navigate(link);
  }
}
