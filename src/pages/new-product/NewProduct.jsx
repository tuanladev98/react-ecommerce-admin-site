import { useEffect, useState } from 'react';

import './NewProduct.css';

import categoryApis from '../../api/category.api';
import { Publish } from '@material-ui/icons';

export default function NewProduct() {
  const [categories, setCategories] = useState([]);

  // data state:
  const [categoryId, setCategoryId] = useState(null);
  const [productName, setProductName] = useState(null);
  const [price, setPrice] = useState(1000000);
  const [gender, setGender] = useState('MALE');
  const [description, setDescription] = useState('');
  const [image01, setImage01] = useState(null);
  const [image02, setImage02] = useState(null);
  const [listSize, setListSize] = useState([]);

  useEffect(() => {
    categoryApis.getAllCategory().then((result) => {
      setCategories(result.data);
    });
  }, []);

  const handleUploadImage01 = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setImage01(
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8129befd83a043678710adf5007bf1e7_9366/Giay_ZX_22_BOOST_trang_GY6695_01_standard.jpg'
    );
  };

  const handleUploadImage02 = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setImage02(
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8193b058631349cc8575adf5007c3e3a_9366/Giay_ZX_22_BOOST_trang_GY6695_02_standard_hover.jpg'
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <div className="addProductContainer">
        <div className="addProductForm">
          <div className="addProductItem">
            <label>Category*</label>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value={null} selected disabled>
                -- Select category --
              </option>
              {categories.map((ele) => {
                return (
                  <option value={ele.id} key={ele.id}>
                    {ele.categoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="addProductItem">
            <label>Product Name*</label>
            <input
              type="text"
              placeholder="Enter name..."
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Price*</label>
            <input
              type="number"
              placeholder="Enter price..."
              min={0}
              defaultValue={1000000}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Gender*</label>
            <select
              name="gender"
              id="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="MALE">Men</option>
              <option value="FEMALE">Woman</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <textarea
              type="text"
              rows={4}
              placeholder="Enter description..."
              defaultValue={''}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="addProductItem">
            <label>Image 1*</label>
            <div className="productUploadImage">
              <img
                src={
                  !image01
                    ? 'https://bytesbin.com/wp-content/uploads/How_to_Upload_File_to_iCloud_com-930x620.png'
                    : image01
                }
                alt=""
              />
              <label for="fileImage01">
                <Publish />
              </label>
              <input
                type="file"
                id="fileImage01"
                style={{ display: 'none' }}
                onChange={handleUploadImage01}
              />
            </div>
          </div>
          <div className="addProductItem">
            <label>Image 2*</label>
            <div className="productUploadImage">
              <img
                src={
                  !image02
                    ? 'https://bytesbin.com/wp-content/uploads/How_to_Upload_File_to_iCloud_com-930x620.png'
                    : image02
                }
                alt=""
              />
              <label for="fileImage02">
                <Publish />
              </label>
              <input
                type="file"
                id="fileImage02"
                style={{ display: 'none' }}
                onChange={handleUploadImage02}
              />
            </div>
          </div>
        </div>
        <div className="addProductSize">
          <span>List sizes</span>
        </div>
      </div>
      <div className="submitAddProduct">
        <button className="addProductButton">Save Product</button>
      </div>
    </div>
  );
}
