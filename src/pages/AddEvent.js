import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { base_url } from "../utils/base_url";

const AddEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const initialEventState = {
    title: "",
    description: EditorState.createEmpty(),
    category: "",
    image: "",
    address: "",
    date: "",
  };

  const [event, setBlog] = useState(initialEventState);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (eventId) {
          const response = await axios.get(`${base_url}/events/${eventId}`);
          const eventdata = response.data;

          setBlog({
            title: eventdata.title,
            description: EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(eventdata.description)
              )
            ),
            category: eventdata.category,
            date: eventdata.date,
            address: eventdata.address,
            image: eventdata.image || "",
          });
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchBlog();
  }, [eventId]);

  const handleChange = (editorState) => {
    setBlog((prevEvent) => ({ ...prevEvent, description: editorState }));
  };

  const handleFormReset = () => {
    setBlog(initialEventState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contentState = event.description.getCurrentContent();
      const rawContentState = convertToRaw(contentState);

      if (eventId) {
        await axios.put(`${base_url}/events/${eventId}`, {
          title: event.title,
          description: draftToHtml(rawContentState),
          category: event.category,
          address: event.address,
          date: event.date,
          image: event.image,
        });

        console.log("Event updated successfully");
        toast.success("Event updated successfully!");
      } else {
        const blogResponse = await axios.post(`${base_url}/events`, {
          title: event.title,
          description: draftToHtml(rawContentState),
          category: event.category,
          address: event.address,
          date: event.date,
        });

        const newEventId = blogResponse.data._id;

        const formData = new FormData();
        formData.append("image", event.image);

        await axios.post(
          `${base_url}/uploadImage/event/${newEventId}`,
          formData
        );

        console.log("New event and image added successfully");
        toast.success("New event and image added successfully!");
      }
      handleFormReset();

      navigate("/admin/event-list");
    } catch (error) {
      console.error("Error adding/updating event:", error);
      toast.error("Error adding/updating event. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>{eventId ? "Edit Event" : "Add Event"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={event.title}
            onChange={(e) => setBlog({ ...event, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            value={event.category}
            onChange={(e) => setBlog({ ...event, category: e.target.value })}
          >
            <option value="">Select a Category</option>
            <option value="Conferences and Conventions">
              Conferences and Conventions
            </option>
            <option value="Trade Shows and Expos">Trade Shows and Expos</option>
            <option value="Music Festivals">Music Festivals</option>
            <option value="Sports Events">Sports Events</option>
            <option value="Weddings">Weddings</option>
            <option value="Corporate Events">Corporate Events</option>
            <option value="Fashion Shows">Fashion Shows</option>
            <option value="Art Exhibitions">Art Exhibitions</option>
            <option value="Food and Drink Festivals">
              Food and Drink Festivals
            </option>
            <option value="Charity and Fundraising Events">
              Charity and Fundraising Events
            </option>
            <option value="Film Festivals">Film Festivals</option>
            <option value="Tech and Innovation Expos">
              Tech and Innovation Expos
            </option>
            <option value="Cultural and Heritage Events">
              Cultural and Heritage Events
            </option>
            <option value="Health and Wellness Expos">
              Health and Wellness Expos
            </option>
            <option value="Educational Seminars and Workshops">
              Educational Seminars and Workshops
            </option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={event.address}
            onChange={(e) => setBlog({ ...event, address: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={event.date}
            onChange={(e) => setBlog({ ...event, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <Editor
            editorState={event.description}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor custom-editor-class"
            onEditorStateChange={handleChange}
            editorStyle={{
              backgroundColor: "white",
              height: "130px",
              border: "2px",
              // eslint-disable-next-line no-dupe-keys
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div className="mb-3">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={(e) => setBlog({ ...event, image: e.target.files[0] })}
          />
        </div>
        {eventId && event.image !== null && (
          <div>
            <label>Current Event Image:</label>
            <img
              src={event.image}
              alt="Current Event"
              style={{ maxWidth: "100px" }}
            />
          </div>
        )}

        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            {eventId ? "Update Event" : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
