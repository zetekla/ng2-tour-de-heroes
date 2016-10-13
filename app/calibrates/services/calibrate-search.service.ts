import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs';
import {Calibrate}             from "../calibrate";

@Injectable()
export class CalibrateSearchService {
  constructor(private http: Http) {}

  search(term: string): Observable<Calibrate[]> {
    return this.http
      .get(`app/calibrates/?name=${term}`)
      .map((r: Response) => r.json().data as Calibrate[]);
  }
}
