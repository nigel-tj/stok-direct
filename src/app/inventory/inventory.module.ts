import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AngularResizeEventModule } from 'angular-resize-event'

import { AppMaterialModule } from '../app-material.module'
import { ProductComponent } from '../inventory/product/product.component'
import { CategoriesComponent } from './categories/categories.component'
import { InventoryHomeComponent } from './inventory-home/inventory-home.component'
import { InventoryRoutingModule } from './inventory-routing.module'
import { InventoryComponent } from './inventory.component'
import { ItemQuantityComponent } from './item-quantity/item-quantity.component'
import { ProductsComponent } from './products/products.component'
import { StockEntryComponent } from './stock-entry/stock-entry.component'

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    AppMaterialModule,
    AngularResizeEventModule,
  ],
  declarations: [
    InventoryComponent,
    StockEntryComponent,
    ProductsComponent,
    CategoriesComponent,
    InventoryHomeComponent,
    ProductComponent,
    ItemQuantityComponent,
  ],
})
export class InventoryModule {}
