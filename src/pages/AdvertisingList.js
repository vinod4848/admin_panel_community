import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAAdvertising,
  getAdvertising,
} from "../features/advertising/advertisingSlice";
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
    title: "ClientName",
    dataIndex: "clientName",
  },
  {
    title: "CompanyName",
    dataIndex: "companyName",
  },
  {
    title: "BannerSize",
    dataIndex: "bannerSize",
  },
  {
    title: "Click",
    dataIndex: "click",
  },
  {
    title: "Banner",
    dataIndex: "image",
    render: (image) => <img src={image} alt="Banner" style={{ maxWidth: "100px" }} />,
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Advertisinglist = () => {
  const [advertisingId, setadvertisingId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdvertising());
  }, [dispatch]);
  const advertisingState = useSelector(
    (state) => state.advertising.advertisings
  );

  const transformadvertisingData = () => {
    return advertisingState.map((advertising, index) => ({
      key: index + 1,
      clientName: advertising.clientName,
      companyName: advertising.companyName,
      image: advertising.image,
      click: advertising.click,
      bannerSize: advertising.bannerSize,
      action: (
        <>
          <Link
            to={`/admin/advertising/${advertising._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(advertising._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    }));
  };

  const showModal = (advertisingId) => {
    setOpen(true);
    setadvertisingId(advertisingId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteAdvertising = (advertisingId) => {
    dispatch(deleteAAdvertising(advertisingId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAdvertising());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Advertisements</h3>
      <div>
        <Table columns={columns} dataSource={transformadvertisingData()} />
      </div>
      
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteAdvertising(advertisingId);
        }}
        title="Are you sure you want to delete this Advertisements"
      />
    </div>
  );
};

export default Advertisinglist;
