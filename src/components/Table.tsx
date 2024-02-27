import {Table, TableColumnsType, TableProps} from 'antd'
import {Product} from "API/api.ts";

interface DataType {
  key: string;
  id: string;
  product: string;
  brand: string;
  price: number;
}

type Props = {
  product: Product[]
}

export const TableProd = ({ product }: Props) => {

  const columns: TableColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      sorter: {
        compare: (a, b) => a.product.localeCompare(b.product),
        multiple: 3,
      },
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      sorter: {
        compare: (a, b) => a.product.localeCompare(b.product),
        multiple: 2,
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 1,
      },
    },
  ];

  const products: DataType[] = product.map((p, i) => ({
    key: i.toString(),
    id: p.id,
    product: p.product,
    brand: p.brand ? p.brand : '---',
    price: p.price,
  }))

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return <Table columns={columns} dataSource={products} onChange={onChange} />
}