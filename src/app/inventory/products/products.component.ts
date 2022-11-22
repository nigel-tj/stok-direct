import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { Router } from '@angular/router'
import { ResizedEvent } from 'angular-resize-event'
import { map } from 'rxjs'
import { Sku } from 'src/app/common/models'
import { environment } from 'src/environments/environment'

import { SkuService } from './sku.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})

/*interface Product{
  name: string
  price: string
  description: Text
}*/
export class ProductsComponent implements OnInit {
  cols!: number

  length = 0
  pageIndex = 0
  pageSize = 20
  pageSizeOptions: number[] = [5, 10, 20]
  pageEvent!: PageEvent | void

  products: Sku[] = []
  constructor(
    //private httpClient: HttpClient,
    private skus: SkuService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts(1, 20)
    this.cols = window.innerWidth <= 400 ? 1 : 4
  }

  onResized(event: ResizedEvent) {
    this.cols = event.newRect.width <= 400 ? 1 : 4
    if (event.newRect.width >= 400 && event.newRect.width <= 600) {
      this.cols = 2
    } else if (event.newRect.width >= 600 && event.newRect.width <= 1200) {
      this.cols = 3
    }
  }

  private getProducts(page: number, pageSize: number) {
    this.skus.getSkus(page, pageSize).subscribe(
      (skus) => {
        this.products = skus
        console.log('********* all products', this.products)
        this.length = skus.length
      },
      (err) => this.router.navigateByUrl('/error')
    )
  }

  getNextPage(event: PageEvent) {
    this.getProducts(event.pageIndex + 1, event.pageSize)
  }

  trackSkus(index: number, item: Sku) {
    return `${item.id}-${index}`
  }
}
