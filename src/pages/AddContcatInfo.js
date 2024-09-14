import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddContactInfo = () => {
  const navigate = useNavigate();
  const [contactData, setContactData] = useState({
    CommitteeName: "",
    phone: "",
    email: "",
    address: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      website: "",
    },
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name.startsWith("socialMedia.")) {
      const key = name.split(".")[1];
      setContactData((prevData) => ({
        ...prevData,
        socialMedia: {
          ...prevData.socialMedia,
          [key]: value,
        },
      }));
    } else {
      setContactData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const { CommitteeName, phone, email, address, socialMedia } = contactData;

      if (!CommitteeName || !phone || !email || !address) {
        toast.error("Please fill in all required fields.");
        return;
      }

      try {
        const response = await axios.post(`${base_url}contactInfo`, {
          CommitteeName,
          phone,
          email,
          address,
          socialMedia,
        });

        if (response.status === 201) {
          toast.success("Contact info added successfully!");
          navigate("/admin/ContcatInfo-List");
        } else {
          toast.error("Error adding contact info. Please try again.");
        }
      } catch (error) {
        console.error("Error adding contact info:", error);
        toast.error("Error adding contact info. Please try again.");
      }
    },
    [contactData, navigate]
  );

  return (
    <div className="container mt-5">
      <h4>Add Contact Info</h4>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Committee Name", name: "CommitteeName", type: "text" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Address", name: "address", type: "text" },
          { label: "Facebook", name: "socialMedia.facebook", type: "text" },
          { label: "Twitter", name: "socialMedia.twitter", type: "text" },
          { label: "LinkedIn", name: "socialMedia.linkedin", type: "text" },
          { label: "Instagram", name: "socialMedia.instagram", type: "text" },
          { label: "Website", name: "socialMedia.website", type: "text" },
        ].map(({ label, name, type }) => (
          <div className="mb-3" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              className="form-control"
              value={
                name.startsWith("socialMedia.")
                  ? contactData.socialMedia[name.split(".")[1]]
                  : contactData[name]
              }
              onChange={handleChange}
              required={type !== "file"}
            />
          </div>
        ))}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary form-control">
            Add Contact Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContactInfo;
