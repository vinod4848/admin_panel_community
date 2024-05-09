import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delteABlogCat, getblogCats } from "../features/blogCat/blogCatSlice";
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
const BlogCategoryList = () => {
  const [blogCatsId, setblogCatsId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setblogCatsId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getblogCats());
  }, [dispatch]);
  const blogCatState = useSelector((state) => state.blogCat.blogCats);
  const data1 = [];
  for (let i = 0; i < blogCatState.length; i++) {
    data1.push({
      key: i +1,
      title: blogCatState[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${blogCatState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogCatState[i]._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlogCat = (e) => {
    dispatch(delteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getblogCats());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteBlogCat(blogCatsId);
        }}
        title="Are you sure you want to delete this brand"
      />
    </div>
  );
};

export default BlogCategoryList;
