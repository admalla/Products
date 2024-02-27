import React, {Dispatch, useEffect, useState} from 'react';
import {Input} from 'antd';
import {fieldProduct, idProduct, ProductsAPI} from "../API/api.ts";
import SelectField from "./SelectField.tsx";
import {isAxiosError} from "axios";

const {Search} = Input;

type Props = {
  setProductId: Dispatch<idProduct[]>
  setShowTable: Dispatch<boolean>
}

const SearchField = React.memo( ({ setProductId, setShowTable }: Props) => {
  const [flag, setFlag] = useState<boolean>(false)

  const [valueInput, setValueInput] = useState<string | number>('')
  const [selectedField, setSelectedField] = useState<fieldProduct>('product')

  useEffect(() => {
    if(valueInput) {
      setFlag(true)
      const debounceTimeout = setTimeout(() => {
        try {
          const fetchDataByFilter = async () => {
            const filteredData =
              await ProductsAPI.filter(selectedField, !isNaN(valueInput as number) ? +valueInput : valueInput)
            if(filteredData.data.result.length === 0) {
              setShowTable(false)
            } else {
              setProductId(filteredData.data.result)
            }
          }

          fetchDataByFilter().then(() => setFlag(false))
        } catch ( e: unknown ) {
          if(isAxiosError(e)) {
            console.log(e)
          }
        }
      }, 700)
      return () => clearTimeout(debounceTimeout)
    }
  }, [valueInput])

  return <Search
    style={{width: 942, position: 'relative', top: 0, left: 0}}
    placeholder={`Search by ${selectedField}...`}
    value={valueInput}
    onChange={(e) => setValueInput(e.currentTarget.value)}
    loading={flag}
    enterButton
    addonBefore={<SelectField setField={setSelectedField}/>}
  />
})


export default SearchField;