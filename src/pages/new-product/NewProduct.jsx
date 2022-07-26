import { useEffect, useState } from 'react';
import { Publish } from '@material-ui/icons';
import { toast } from 'react-toastify';

import './NewProduct.css';

import categoryApis from '../../api/category.api';
import sizeApis from '../../api/size.api';
import productApis from '../../api/product.api';

export default function NewProduct() {
  const [categoryData, setCategoryData] = useState([]);
  const [sizeData, setSizeData] = useState([]);

  // data state:
  const [categoryId, setCategoryId] = useState(null);
  const [productName, setProductName] = useState(null);
  const [price, setPrice] = useState(1000000);
  const [gender, setGender] = useState('MALE');
  const [description, setDescription] = useState('');
  const [image01, setImage01] = useState(null);
  const [image02, setImage02] = useState(null);
  const [sizeIds, setSizeIds] = useState([]);

  useEffect(() => {
    categoryApis.getAllCategory().then((result) => {
      setCategoryData(result.data);
    });
  }, []);

  useEffect(() => {
    sizeApis.getAllSize().then((result) => {
      setSizeData(result.data);
    });
  }, []);

  const handleUploadImage01 = (e) => {
    e.preventDefault();
    setImage01(
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8129befd83a043678710adf5007bf1e7_9366/Giay_ZX_22_BOOST_trang_GY6695_01_standard.jpg'
    );
  };

  const handleUploadImage02 = (e) => {
    e.preventDefault();
    setImage02(
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8193b058631349cc8575adf5007c3e3a_9366/Giay_ZX_22_BOOST_trang_GY6695_02_standard_hover.jpg'
    );
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    productApis
      .createProduct({
        categoryId,
        productName,
        price,
        gender,
        description,
        image01,
        image02,
        sizeIds,
      })
      .then((result) => {
        toast.success('Create success!');
        window.location.href = '/product/' + result.data.id;
      })
      .catch((error) => {
        toast.error('Create fail!');
      });
  };

  const handleSelectSizes = (sizeId) => {
    // e.preventDefault();
    let tempSizeIds = new Set([...sizeIds]);
    if (tempSizeIds.has(sizeId)) tempSizeIds.delete(sizeId);
    else tempSizeIds.add(sizeId);

    setSizeIds([...tempSizeIds]);
  };

  return (
    <div className="newProduct">
      <div className="addProductTitleContainer">
        <h1 className="addProductTitle">New Product</h1>
      </div>
      <div className="addProductContainer">
        <div className="addProductForm">
          <div className="addProductFormTextFields">
            <div className="addProductItem">
              <label>Category*:</label>
              <select
                name="category"
                id="category"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value={null} selected disabled>
                  -- Select category --
                </option>
                {categoryData.map((ele) => {
                  return (
                    <option value={ele.id} key={ele.id}>
                      {ele.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="addProductItem">
              <label>Product name*:</label>
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
              <label>Gender*:</label>
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
              <label>Description:</label>
              <textarea
                type="text"
                rows={5}
                placeholder="Enter description..."
                defaultValue={''}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="addProductFormImgAndSizesFields">
            <div className="uploadImageProduct">
              <div className="addProductItem">
                <label>Image 1*:</label>
                <div className="productUploadImage">
                  <img
                    src={
                      !image01
                        ? 'https://bytesbin.com/wp-content/uploads/How_to_Upload_File_to_iCloud_com-930x620.png'
                        : image01
                    }
                    alt=""
                  />
                  <label htmlFor="fileImage01">
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
                <label>Image 2*:</label>
                <div className="productUploadImage">
                  <img
                    src={
                      !image02
                        ? 'https://bytesbin.com/wp-content/uploads/How_to_Upload_File_to_iCloud_com-930x620.png'
                        : image02
                    }
                    alt=""
                  />
                  <label htmlFor="fileImage02">
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

            <div className="addAvailableSizes">
              <label>Select available sizes:</label>
              <div className="listSize">
                {sizeData.map((item, index) => {
                  return (
                    <div
                      className={
                        sizeIds.includes(item.id)
                          ? 'sizeOption active'
                          : 'sizeOption'
                      }
                      key={item.id}
                      onClick={() => handleSelectSizes(item.id)}
                    >
                      <span>{item.euSize}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="addProductButton">
          <button
            disabled={
              !categoryId ||
              !productName ||
              !price ||
              !gender ||
              !image01 ||
              !image02
            }
            onClick={handleSaveProduct}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
