import { toast } from "react-toastify";
import { React, useEffect, useState } from "react";
import { CustomInput } from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getColors } from "../features/color/colorSlice";
import { getAllCategory } from "../features/productCategory/productCategorySilce";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { dellImages, uploadImages } from "../features/upload/uploadSlice";
import {
  createProduct,
  getAProduct,
  resetState,
  updateAProduct,
} from "../features/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Baran is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tags is Required"),
  quantity: Yup.number().required("Quantity is Required"),
  color: Yup.array()
    .min(1, "Pick at leaset on Color")
    .required("Color is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getAllCategory());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const productCategoryState = useSelector(
    (state) => state.productCategory.prodcategories
  );
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const {
    isLoding,
    isError,
    isSuccess,
    createdProdduct,
    productName,
    productdescription,
    productprice,
    productbrand,
    productcategory,
    productcolor,
    productquantity,
    productimages,
    tags,
  } = newProduct;
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState);
    }
  }, [dispatch, getProductId]);

  function getImage(images) {
    if (Array.isArray(images)) {
      let array = images.map((e) => e.public_id);
      return array;
    }
  }
  function getColor(color) {
    if (Array.isArray(color)) {
      let array = color.map((e) => e._id);
      return array;
    }
  }

  useEffect(() => {
    if (isSuccess && createdProdduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Somthing want wrong!");
    }
  }, [isLoding, isError, isSuccess, createdProdduct]);

  const colorsopt = [];
  colorState.forEach((i) => {
    colorsopt.push({
      label: i.title,
      value: i._id,
    });
  });

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.color = color ? color : "";
    formik.values.images = img;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, images, img]);

  const initialValues = {
    title: productName || "",
    description: productdescription || "",
    price: productprice || "",
    brand: productbrand || "",
    category: productcategory || "",
    color: getColor(productcolor),
    tags: tags || "",
    quantity: productquantity || "",
    images: getImage(productimages),
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateAProduct(data));
      } else {
        dispatch(createProduct(values));
      }
      alert(JSON.stringify(values));
      formik.resetForm();
      setColor(null);
      setImages(null);
      setTimeout(() => {
        navigate("/admin/product-list");
      }, 3000);
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Product Title"
            id="title"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div>
            <CustomInput
              theme="snow"
              label="Enter Product Description"
              name="description"
              onChange={formik.handleChange("description")}
              val={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {productCategoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Tags</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={formik.values.color}
            values={formik.values.color}
            onChange={handleColors}
            options={colorsopt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImages(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimage d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative " key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(dellImages(i.public_id))}
                    className="btn-close position-absolute"
                    style={{
                      top: "10px",
                      right: "10px",
                      backgroundColor: "white",
                    }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200}></img>
                </div>
              );
            })}
          </div>
          <div className="showimage d-flex flex-wrap gap-3">
            {productimages?.map((e, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(dellImages(e.public_id))}
                    className="btn-close position-absolute"
                    style={{
                      top: "10px",
                      right: "10px",
                      backgroundColor: "white",
                    }}
                  ></button>
                  <img src={e.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounde-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
