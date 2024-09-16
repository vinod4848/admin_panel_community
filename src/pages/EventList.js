import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAEvent, getEvent } from "../features/event/eventSlice";
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
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    render: (description) => (
      // Render HTML content safely
      <div dangerouslySetInnerHTML={{ __html: description }} />
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Date",
    dataIndex: "date",
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

const Eventlist = () => {
  const [eventId, setEventId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);
  
  const eventState = useSelector((state) => state.event.events);

  const transformEventData = () => {
    const currentDate = new Date();

    return eventState
      .filter((event) => event.isActive && new Date(event.date) > currentDate)
      .map((event, index) => ({
        key: index + 1,
        title: event.title,
        description: event.description,
        image: event.image,
        category: event.category,
        date: event.date,
        address: event.address,
        action: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to={`/admin/events/${event._id}`}
              className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-2 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(event._id)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        ),
      }));
  };

  const showModal = (eventId) => {
    setOpen(true);
    setEventId(eventId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteEvent = (eventId) => {
    dispatch(deleteAEvent(eventId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEvent());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title" style={{ color: 'green' }}>
        Upcoming Event
      </h3>
      <div>
        <Table columns={columns} dataSource={transformEventData()}  className="custom-table"/>
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteEvent(eventId);
        }}
        title="Are you sure you want to delete this Event"
      />
    </div>
  );
};

export default Eventlist;
