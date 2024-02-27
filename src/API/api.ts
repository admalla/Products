import {instance} from "../API/instance.ts"

export interface Product {
  brand: string
  id: string
  price: number
  product: string
}

export type idProduct = Pick<Product, 'id'>
export type fieldProduct = keyof Product
type valueFieldProduct = Product[keyof Product]

export const ProductsAPI = {
  getItems(ids: idProduct[]) {
    return instance.post<{result: Product[] }>('',{
      "action": "get_items",
      "params": {"ids": ids}
    })
  },

  getIds(offset?: number, limit?: number) {
    return instance.post<{result: idProduct[] }>('', {
      "action": "get_ids",
      "params": offset ? {"offset": offset, "limit": limit} : {}
    })
  },

  getFields(field?: fieldProduct, offset?: number, limit?: number) {
    return instance.post<{result: valueFieldProduct[] }>('', {
      "action": "get_fields",
      "params": field ? {"field": field, "offset": offset, "limit": limit} : {}
    })
  },

  filter(field: fieldProduct, value: valueFieldProduct) {
    return instance.post<{result: idProduct[] }>('', {
      "action": "filter",
      "params": {[field]: value}
    })
  }
}