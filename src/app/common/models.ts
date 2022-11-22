export interface Sku {
  id: string
  name: string
  imageUrl: string
  code: string
  description: string
  price: string
  __collectionMeta: {
    recordCount: number
    pageCount: number
  }
}

export interface Category {
  name: string
  description: Text
  imageUrl: string
}

export interface Customer {
  customer_name: string
  customer_group: string
  customer_type: string
  territory: string
}

export interface Price {
  id: string
  currencyCode: string
  skuCode: string
  amountCents: number
  amountFloat: number
  formattedAmount: string
  compareAtAmountCents: number
  compareAtAmountFloat: number
  formattedCompareAtAmount: string
}

export interface StockLocation {
  id?: string
  number?: number
  name?: string
  shipmentId?: string
  labelFormat?: string
  deliveryLeadTimeId?: string
}

export interface Cart {
  orderId: string
  itemCount: number
}
export interface Quotation {
  quotation_to: string
  selling_price_list: string
  territory: string
  transaction_date: string
  company: string
  conversion_rate: number
  currency: string
  customer: string
  customer_name: string
  doctype: string
  order_type: string
  plc_conversion_rate: number
  price_list_currency: string
  items: [
    {
      item_code: string
      qty: number
      rate: number
      docstatus: 1
    }
  ]
}
