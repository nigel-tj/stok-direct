import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { HttpErrorHandler } from 'src/app/common/http-error-handler.service'
import { Category, Sku } from 'src/app/common/models'
import { environment } from 'src/environments/environment'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
  observe: 'response' as 'response',
}

enum sales_doctypes {
  'Quotation',
  'Sales Order',
  'Delivery Note',
  'Sales Invoice',
}

@Injectable({
  providedIn: 'root',
})
export class SkuService {
  private itemUrl: string = `${environment.apiURL}/api/resource/Item/?fields=["*"]`
  private itemGroupUrl: string = `${environment.apiURL}/api/resource/Item Group/?fields=["*"]`
  private customerUrl: string = `${environment.apiURL}/api/resource/Customer/?fields=["*"]`

  constructor(private http: HttpClient, private eh: HttpErrorHandler) {}

  getSku(id: string): Observable<Sku> {
    return this.http
      .get<Sku>(`${environment.apiURL}/api/resource/Item/${id}?fields=["*"]`)
      .pipe(
        map((result: any) => {
          let item = result.data
          return {
            id: item.name,
            name: item.name,
            price: item.valuation_rate,
            imageUrl: item.image,
            description: item.description,
            code: item.item_code,
          } as Sku
        }),
        catchError(this.eh.handleError)
      )
  }

  getSkus(page: number, pageSize: number): Observable<Sku[]> {
    return this.http
      .get(
        this.itemUrl,
        /*{
        params: {
          page: page.toString(),
          pageSize: pageSize.toString(),
        },
      }, */ httpOptions
      )
      .pipe(
        map((result: any) => {
          console.log('************result.data: ', result.body.data)
          let items: any[] = result.body.data
          return items.map((item) => {
            return {
              id: item.name,
              name: item.name,
              price: item.valuation_rate,
              imageUrl: item.image,
            } as Sku
          })
        }),

        catchError(this.eh.handleError)
      )
  }

  getItemGroups() {
    return this.http.get(this.itemGroupUrl, httpOptions).pipe(
      map((data: any) => {
        console.log('Categories ****', data.body?.data)
        let categoryData: any = data.body.data
        return categoryData.map((category: any) => {
          return {
            name: category.name,
            imageUrl: category.image,
            description: category.description,
          } as Category
        })
      })
    )
  }

  createCustomerIfDoesNotExist(name: string) {
    this.http.get(`this.customerUrl/${name}`, httpOptions).pipe()
  }

  createCustomerQuote() {
    this.http.post(`${environment.apiURL}/api/resource/`, httpOptions)
  }

  getCustomerQuotation() {}

  createSalesOrder() {}

  getSalesOrder() {}
}
