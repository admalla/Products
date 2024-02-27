import './App.css'
import {useEffect, useState} from "react";
import {idProduct, Product, ProductsAPI} from "./API/api.ts";
import {TableProd} from "./components/Table.tsx";
import SearchField from "./components/Search.tsx";
import Loader from "./components/Loader.tsx";
import {isAxiosError} from "axios";
import {requestData} from "./util/fetchData.ts";

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [productId, setProductId] = useState<idProduct[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    setLoading(true)
    try {
      const fetchData = () => {
        requestData({setProducts, setLoading, setShowTable})
      }

      fetchData()
    } catch (e) {
      console.log(e)
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (productId.length !== 0) {
          setLoading(true)
          const listProducts = await ProductsAPI.getItems(productId)
          setProducts(listProducts.data.result)
          setLoading(false)
          setShowTable(true)
        } else {
          requestData({setProducts})
        }
      }

      fetchData()
    } catch (e: unknown) {
      if(isAxiosError(e)) {
        console.log(e.message)
      }
    }
  }, [productId]);

  return (
    <div style={{position: 'relative', top: 0, left: 0}}>
      <SearchField setShowTable={setShowTable} setProductId={setProductId}/>
       {loading ? <Loader/> : (
         <div>{showTable ? <TableProd product={products}/> : (
             <h2>По вашему запросу ничего не найдено</h2>
         )}</div>
       )}
    </div>
  )
}

export default App
