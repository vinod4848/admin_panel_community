import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, delteAProduct } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";
const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [ProductId, setProduct] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setProduct(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      description: productState[i].description,
      price: `$${productState[i].price}`,
      category: productState[i].category,
      brand: productState[i].brand,
      quantity: productState[i].quantity,
      color: productState[i].color,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const deletProduct = (e) => {
    dispatch(delteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllProduct());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deletProduct(ProductId);
        }}
        title="Are you sure you want to delete this Product"
      />
    </div>
  );
};

export default Productlist;
