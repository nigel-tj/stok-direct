import { StockLocation } from '../common/stock-location'
import { ShippingMethod } from './shipping-method'

export interface DeliveryLeadTime {
  id?: string
  minHours?: number
  maxHours?: number
  minDays?: number
  maxDays?: number
  shippingMethod?: ShippingMethod
  stockLocation?: StockLocation
}
