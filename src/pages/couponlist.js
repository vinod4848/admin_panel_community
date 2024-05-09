import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { delteACoupon, getCoupans } from "../features/coupon/couponSlice";
import CustomModel from "../components/CustomModel";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Expiry Date",
    dataIndex: "expiry",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const CouponList = () => {
  const [couponId, setcouponId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupans());
  }, [dispatch]);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];

  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i+1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link
            to={`/admin/coupon/${couponState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCoupon = (e) => {
    dispatch(delteACoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupans());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Coupon</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteCoupon(couponId);
        }}
        title="Are you sure you want to delete this Coupon"
      />
    </div>
  );
};

export default CouponList;
