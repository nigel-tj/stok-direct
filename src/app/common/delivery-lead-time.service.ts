import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { DeliveryLeadTime } from '../common/delivery-lead-time'
import { HttpErrorHandler } from '../common/http-error-handler.service'

@Injectable({
  providedIn: 'root',
})
export class DeliveryLeadTimeService {
  private url: string = `${environment.apiURL}/api/delivery_lead_times`

  constructor(private http: HttpClient, private eh: HttpErrorHandler) {}

  getDeliveryLeadTimes(): Observable<DeliveryLeadTime[]> {
    return this.http
      .get<DeliveryLeadTime[]>(this.url)
      .pipe(catchError(this.eh.handleError))
  }
}
