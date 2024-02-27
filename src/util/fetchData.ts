import {Product, ProductsAPI} from "../API/api.ts";
import {Dispatch} from "react";

type Props = {
  setProducts: Dispatch<Product[]>
  setLoading?: Dispatch<boolean>
  setShowTable?: Dispatch<boolean>
}

export const requestData = ({setProducts, setLoading, setShowTable}: Props) => {
  ProductsAPI.getIds(1, 50).then((res) => {
    ProductsAPI.getItems(res.data.result).then((res) => {
      const uniqueIds: Product[] = res.data.result.reduce((acc: Product[], obj: Product) => {
        if (!acc.find(item => item.id === obj.id)) {
          acc.push(obj);
        }
        return acc;
      }, [])

      setLoading && setLoading(false)
      setShowTable && setShowTable(true)

      setProducts(uniqueIds)
    }).catch((e) => console.log(e.message))
  }).catch((e) => console.log(e.message))
}