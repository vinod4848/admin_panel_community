import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Customer Name",
    dataIndex: "name",
  },
  {
    title: "Contact.No",
    dataIndex: "mobile",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Delivery address",
    dataIndex: "address",
    width: 260
  },
  {
    title: "Order Date",
    dataIndex: "date",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderState = useSelector((state) => state.auth.orders);
  console.log(orderState, "orderState");
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderby.firstName + " " + orderState[i].orderby.lastName,
      mobile: orderState[i].orderby.mobile,
      email: orderState[i].orderby.email,
      address: orderState[i].orderby.address,
      product: (
        <Link to={`/admin/order/${orderState[i].orderby._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i].paymentintent.amount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
