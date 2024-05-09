import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getAllenqs,
  resetState,
  updateAEnquiry,
} from "../features/enquiries/enquiriesSilce";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomModel from "../components/CustomModel";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "phone",
  },
  {
    title: "Staus",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const [enqId, setenqId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllenqs());
  }, [dispatch]);
  const enqState = useSelector((state) => state.enquirie.enquiries);
  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      phone: enqState[i].phone,
      status: (
        <>
          <select
            name=""
            defaultValue={enqState[i].status ? enqState[i].status : "Submitted"}
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),

      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/enquiries/${enqState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enqState[i]._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };
  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllenqs());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteEnq(enqId);
        }}
        title="Are you sure you want to delete this Enquiries"
      />
    </div>
  );
};

export default Enquiries;
