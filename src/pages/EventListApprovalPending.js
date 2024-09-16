import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import { base_url } from "../utils/base_url";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEvent,
  getEvent,
  updateAEvent,
} from "../features/event/eventSlice";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";
import axios from "axios";

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
    render: (description) => {
      // Render HTML content safely
      return <div dangerouslySetInnerHTML={{ __html: description }} />;
    },
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
    title: "Activate",
    dataIndex: "activateDeactivate",
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

const EventListApprovalPending = () => {
  const [eventId, setEventId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  const eventState = useSelector((state) => state.event.events);

  const transformEventData = () => {
    return eventState
      .filter((event) => !event.isActive)
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
            {/* <Link to={`/admin/event/${event._id}`} className="fs-3 text-danger">
              <BiEdit />
            </Link> */}
            <button
              className="ms-2 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(event._id)}
            >
              <MdOutlineDelete />
            </button>
          </>
        ),
        activateDeactivate: (
          <Button
            type="primary"
            onClick={() => handleActivateDeactivate(event._id, !event.isActive)}
          >
            {event.isActive ? "Deactivate" : "Activate"}
          </Button>
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

  const handleActivateDeactivate = async (eventId, isActive) => {
    try {
      await axios.put(`${base_url}/events/${eventId}`, {
        isActive: isActive,
      });
      dispatch(updateAEvent({ eventId, isActive }));
      setTimeout(() => {
        dispatch(getEvent());
      }, 100);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">EventList Approval Pending</h3>
      <div>
        <Table columns={columns} dataSource={transformEventData()} className="custom-table" />
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

export default EventListApprovalPending;
