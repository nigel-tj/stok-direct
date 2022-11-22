import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { map } from 'rxjs/operators'
import { Category } from 'src/app/common/models'

import { SkuService } from '../products/sku.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  cols = 4

  length = 0
  pageIndex = 0
  pageSize = 20
  pageSizeOptions: number[] = [5, 10, 20]
  pageEvent!: PageEvent | void

  categories: Category[] = []

  constructor(public sku: SkuService) {}

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this.sku.getItemGroups().subscribe((itemGroups) => {
      this.categories = itemGroups
      console.log('********* all marshalled categories', this.categories)
      this.length = itemGroups.length
    })
  }
}
