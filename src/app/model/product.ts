import { Category } from "./category"

export interface Product {
  idProduct?: any
  nameProduct: string
  descriptionProduct: string
  costPriceProduct: any
  amountProduct: any
  dateCreatedProduct: any
  category: Category
}

export interface ProductDTO {
  idProduct?: any
  nameProduct: string
  descriptionProduct: string
  costPriceProduct: any
  amountProduct: any
  dateCreatedProduct: any,
  idCategory: any
}
