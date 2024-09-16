import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlog } from "../features/blog/blogSlice";
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
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Description",
    dataIndex: "description",
    render: (text) => <span title={text}>{truncateDescription(text, 50)}</span>,
  },
  {
    title: "Event Banner",
    dataIndex: "image",
    render: (image) => (
      <img src={image} alt="EventBanner" style={{ maxWidth: "100px" }} />
    ),
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (action) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {action}
      </div>
    ),
  },
];

const truncateDescription = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const Bloglist = () => {
  const [blogId, setBlogId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);

  const transformBlogData = () => {
    return blogState.map((blog, index) => {
      const doc = new DOMParser().parseFromString(blog.description, 'text/html');
      const plainTextDescription = doc.body.textContent || "";

      return {
        key: index + 1,
        title: blog.title,
        description: plainTextDescription,
        category: blog.category,
        image: blog.image,
        action: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`/admin/blogs/${blog._id}`} className="fs-3 text-danger">
              <BiEdit />
            </Link>
            <button
              className="ms-2 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(blog._id)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        ),
      };
    });
  };

  const showModal = (blogId) => {
    setOpen(true);
    setBlogId(blogId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteBlog = (blogId) => {
    dispatch(deleteABlog(blogId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlog());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blogs</h3>
      <div>
        <Table columns={columns} dataSource={transformBlogData()} className="custom-table" />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteBlog(blogId);
        }}
        title="Are you sure you want to delete this Blog"
      />
    </div>
  );
};

export default Bloglist;
