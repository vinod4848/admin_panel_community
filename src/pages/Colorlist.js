import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delteAColor, getColors } from "../features/color/colorSlice";
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
const ColorList = () => {
  const [colorId, setcolorId] = useState();
  const [open, setOpen] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i +1,
      title: colorState[i].title,
      action: (
        <>
          <Link
            to={`/admin/color/${colorState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(colorState[i]._id)}
          >
            <MdOutlineDelete />
          </button>
        </>
      ),
    });
  }
  const deleteColor = (e) => {
    dispatch(delteAColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this color"
      />
    </div>
  );
};

export default ColorList;