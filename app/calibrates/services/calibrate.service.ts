import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Calibrate } from '../calibrate';

@Injectable()
export class CalibrateService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private calibratesUrl = 'app/calibrates';  // URL to web api

  constructor(private http: Http) { }

  getCalibrates(): Promise<Calibrate[]> {
    return this.http.get(this.calibratesUrl)
      .toPromise()
      .then(response => response.json().data as Calibrate[])
      .catch(this.handleError);
  }

  getCalibrate(id: number): Promise<Calibrate> {
    return this.getCalibrates()
      .then(calibrates => calibrates.find(calibrate => calibrate.id === id));
  }

  delete(id: number): Promise<void> {
    const url = `${this.calibratesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Calibrate> {
    return this.http
      .post(this.calibratesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(calibrate: Calibrate): Promise<Calibrate> {
    const url = `${this.calibratesUrl}/${calibrate.id}`;
    return this.http
      .put(url, JSON.stringify(calibrate), {headers: this.headers})
      .toPromise()
      .then(() => calibrate)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
