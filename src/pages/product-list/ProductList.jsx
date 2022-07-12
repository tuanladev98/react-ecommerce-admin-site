import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';

import './ProductList.css';

import productApis from '../../api/product.api';
import numberWithCommas from '../../utils/numberWithCommas';

export default function ProductList() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    productApis
      .getAllForAdminSite()
      .then((result) => {
        setProductData(result.data);
      })
      .catch((error) => {
        setProductData([]);
      });
  }, []);

  const handleDelete = (id) => {
    productApis
      .deleteProduct(id)
      .then((result) => {
        productApis
          .getAllForAdminSite()
          .then((result) => {
            setProductData(result.data);
          })
          .catch((error) => {
            setProductData([]);
          });
      })
      .catch((error) => alert('Delete fail!'));
  };

  const columns = [
    { field: 'code', headerName: 'Product Code', width: 160 },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image01} alt="" />
            {params.row.productName}
          </div>
        );
      },
    },
    { field: 'quantity', headerName: 'Stock', width: 130 },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 120,
      renderCell: (params) => {
        return <span>{params.row.gender.toLowerCase()}</span>;
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
      renderCell: (params) => {
        return <span>{numberWithCommas(Number(params.row.price))}₫</span>;
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/' + params.row.id}>
              <button className="productListEdit">Detail</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    productData.length && (
      <div className="productList">
        <div className="productListTitleContainer">
          <h1 className="productTitle">Product List</h1>
          <Link to="/new-product">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <DataGrid
          rows={productData}
          autoHeight
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          checkboxSelection
        />
      </div>
    )
  );
}
