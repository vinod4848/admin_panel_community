import React, { useEffect, useState } from "react";
import { Table } from "antd";
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
  },
];

const CompleteEventList = () => {
  const [eventId, setEventId] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.event.events);

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  const transformEventData = () => {
    const currentDate = new Date();

    return eventList
      .filter(
        (event) => event.isActive && isEventPassed(event.date, currentDate)
      )
      .map((event, index) => ({
        key: index + 1,
        title: event.title,
        description: event.description,
        image: event.image,
        category: event.category,
        date: event.date,
        address: event.address,
        action: (
          <>
            <Link
              to={`/admin/events/${event._id}`}
              className="ms-2 fs-4 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="fs-4 text-danger bg-transparent border-0"
              onClick={() => showModal(event._id)}
            >
              <MdOutlineDelete />
            </button>
          </>
        ),
      }));
  };

  const isEventPassed = (eventDate, currentDate) => {
    const eventDateTime = new Date(eventDate);
    return eventDateTime <= currentDate;
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
      <h3 className="mb-4 title" style={{ color: "red" }}>
        Completed Events
      </h3>
      <div>
        <Table columns={columns} dataSource={transformEventData()} />
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

export default CompleteEventList;
