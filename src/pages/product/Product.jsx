import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Publish } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import './Product.css';

import Chart from '../../components/chart/Chart';
import { changeMenu } from '../../redux/side_bar_slice';

import categoryApis from '../../api/category.api';
import sizeApis from '../../api/size.api';
import productApis from '../../api/product.api';
import statsApis from '../../api/stats.api';
import dayjs from 'dayjs';

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
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

  // stats state:
  const [salesPerformanceData, setSalesPerformanceData] = useState([]);

  useEffect(() => {
    dispatch(changeMenu('PRODUCT'));
  }, [dispatch]);

  useEffect(() => {
    productApis
      .getDetailForAdminSite(productId)
      .then((result) => {
        setProduct(result.data);
        if (result.data) {
          setCategoryId(result.data.categoryId);
          setProductName(result.data.productName);
          setPrice(result.data.price);
          setGender(result.data.gender);
          setDescription(result.data.description);
          setImage01(result.data.image01);
          setImage02(result.data.image02);
          setSizeIds(result.data.productToSizes.map((ele) => ele.sizeId));
        }
      })
      .catch((error) => setProduct(null));
  }, [productId]);

  useEffect(() => {
    statsApis
      .getStatsProductSalesPerformance(productId)
      .then((result) => {
        const data = result.data.map((ele) => {
          return {
            name: dayjs().year(ele.year).month(ele.month).format('MMM YYYY'),
            // name: `${ele.month}`,
            Sales: !ele.quantity ? 0 : ele.quantity,
          };
        });
        setSalesPerformanceData(data);
      })
      .catch((error) => setSalesPerformanceData([]));
  }, [productId]);

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

  const handleSelectSizes = (sizeId) => {
    // e.preventDefault();
    let tempSizeIds = new Set([...sizeIds]);
    if (tempSizeIds.has(sizeId)) tempSizeIds.delete(sizeId);
    else tempSizeIds.add(sizeId);

    setSizeIds([...tempSizeIds]);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    productApis
      .updateProduct(productId, {
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
        toast.success('Update success!');
        window.location.href = '/product/' + result.data.id;
      })
      .catch((error) => {
        toast.error('Update fail!');
      });
  };

  return (
    product && (
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">
            {product.code} - {product.productName}
          </h1>
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
                  value={categoryId}
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
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="addProductItem">
                <label>Price*</label>
                <input
                  type="number"
                  placeholder="Enter price..."
                  min={0}
                  value={price}
                  defaultValue={1000000}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="addProductItem">
                <label>Gender*:</label>
                <select
                  name="gender"
                  id="gender"
                  value={gender}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="addProductFormImgAndSizesFields">
              <div className="uploadImageProduct">
                <div className="addProductItem">
                  <label>Image 1*:</label>
                  <div className="productUploadImage">
                    <img src={image01} alt="" />
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
                    <img src={image02} alt="" />
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
              onClick={handleUpdateProduct}
            >
              Save
            </button>
          </div>
        </div>

        <div className="productStats">
          <div className="productStatsLeft">
            <Chart
              data={salesPerformanceData}
              dataKey="Sales"
              title="Sales Performance"
            />
          </div>
          <div className="productStatsRight">
            <div className="productInfoTop">
              <img
                src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="productInfoImg"
              />
              <span className="productName">Apple Airpods</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue">123</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">sales:</span>
                <span className="productInfoValue">5123</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">active:</span>
                <span className="productInfoValue">yes</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">in stock:</span>
                <span className="productInfoValue">no</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Product Name</label>
              <input type="text" placeholder="Apple AirPod" />
              <label>In Stock</label>
              <select name="inStock" id="idStock">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label>Active</label>
              <select name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img
                  src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="productUploadImg"
                />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: 'none' }} />
              </div>
              <button className="productButton">Update</button>
            </div>
          </form>
        </div> */}
      </div>
    )
  );
}
