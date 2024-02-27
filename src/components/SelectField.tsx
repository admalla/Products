import  {Dispatch} from 'react';
import { Select, Space } from 'antd';
import { fieldProduct } from "../API/api.ts";

type Props = {
  setField: Dispatch<fieldProduct>
}

const SelectField = ({setField}: Props) => {
  const handleChange = (value: fieldProduct) => {
    setField(value);
  };
  return (
    <Space wrap>
      <Select
        defaultValue="product"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 'product', label: 'Product' },
          { value: 'brand', label: 'Brand' },
          { value: 'price', label: 'Price' },
        ]}
      />
    </Space>
  )
}



export default SelectField;