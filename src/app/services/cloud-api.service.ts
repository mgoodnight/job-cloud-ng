import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CloudImageDetails } from './../models/cloudImageDetails';

@Injectable({
  providedIn: 'root'
})
export class CloudApiService {
  private apiUrl = environment.cloudApiURL;

  constructor(private _http: HttpClient) { }

  /**
   * POST request to generate image
   *
   * @param imageDetails CloudImageDetails
   */
  public generateImage(imageDetails: CloudImageDetails): Observable<string> {
    const resource = `${this.apiUrl}/generate`;
    return this._http.post<{image: string}>(resource, imageDetails).pipe(map(res => res.image));
  }
}
