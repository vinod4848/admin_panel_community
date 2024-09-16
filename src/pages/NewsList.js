import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getNew,deleteANew } from "../features/news/newSlice";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Content",
    dataIndex: "content",
  },
  {
    title: "Author",
    dataIndex: "author",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Tags",
    dataIndex: "tags",
  },
  {
    title: "news Banner",
    dataIndex: "image",
    render: (image) => (
      <img src={image} alt="NewsBanner" style={{ maxWidth: "100px" }} />
    ),
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Newslist = () => {
  const [NewsId, setNewsId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNew());
  }, [dispatch]);
  const newsState = useSelector((state) => state.news.newss);

  const transformnewsData = () => {
    return newsState.map((news, index) => ({
      key: index + 1,
      title: news.title,
      content: news.content,
      author: news.author,
      tags:news.tags,
      image: news.image,
      category: news.category,
      action: (
        <>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(news._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    }));
  };

  const showModal = (NewsId) => {
    setOpen(true);
    setNewsId(NewsId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteNews = (NewsId) => {
    dispatch(deleteANew(NewsId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getNew());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">News</h3>
      <div>
        <Table columns={columns} dataSource={transformnewsData()} className="custom-table" />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteNews(NewsId);
        }}
        title="Are you sure you want to delete this News"
      />
    </div>
  );
};

export default Newslist;
