import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  delteACategory,
} from "../features/productCategory/productCategorySilce";
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
    title: "Name",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ProductCategoryList = () => {
  const [categoryId, setcategoryId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  const productCategoryState = useSelector(
    (state) => state.productCategory.prodcategories
  );
  const data1 = [];
  for (let i = 0; i < productCategoryState.length; i++) {
    data1.push({
      key: i +1,
      title: productCategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${productCategoryState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productCategoryState[i]._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const delteCategory = (e) => {
    dispatch(delteACategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCategory());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Product Categorys</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          delteCategory(categoryId);
        }}
        title="Are you sure you want to delete this Categorys"
      />
    </div>
  );
};

export default ProductCategoryList;
