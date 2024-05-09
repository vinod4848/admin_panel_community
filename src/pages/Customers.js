import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = customerstate
    .filter((customer) => customer.role !== "admin")
    .filter((customer) => customer.isPublished)
    .map((customer, index) => ({
      key: index + 1,
      name: customer.username,
      email: customer.email,
      mobile: customer.phone,
    }));

  return (
    <div className="container mt-4">
      <h3 className="mb-4 title">Users</h3>
      <div className="card">
        <div className="card-body">
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Customers;
