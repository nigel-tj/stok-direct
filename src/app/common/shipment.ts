import { ShippingMethod } from '../common/shipping-method'
import { StockLocation } from '../common/stock-location'
import { LineItem } from './line-item'

export interface Shipment {
  id?: string
  number?: string
  status?: string
  currencyCode?: string
  costAmountCents?: number
  costAmountFloat?: number
  formattedCostAmount?: string
  skusCount?: number
  stockLocation?: StockLocation
  orderId?: string
  availableShippingMethods?: ShippingMethod[]
  shipmentLineItems?: LineItem[]
  lineItems?: LineItem[]
}
