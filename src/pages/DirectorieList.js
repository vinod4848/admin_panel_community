import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteADirectorie,
  getDirectorie,
} from "../features/directory/directorySlice";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";

const { Search } = Input;

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Company Name",
    dataIndex: "companyName",
  },
  {
    title: "Company Logo",
    dataIndex: "images",
    render: (images) => (
      <img src={images} alt="EventBanner" style={{ maxWidth: "100px" }} />
    ),
  },

  {
    title: "Company Email",
    dataIndex: "companyEmail",
  },

  {
    title: "Contact Number",
    dataIndex: "contactNumber",
  },
  // {
  //   title: "GST Number",
  //   dataIndex: "gstNumber",
  // },
  // {
  //   title: "Website",
  //   dataIndex: "website",
  // },
  {
    title: "Locality",
    dataIndex: "locality",
  },
  {
    title: "Business Area",
    dataIndex: "businessArea",
  },

  // {
  //   title: "Description",
  //   dataIndex: "description",
  // },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Directorielist = () => {
  const [directorieId, setDirectorieId] = useState();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDirectorie());
  }, [dispatch]);
  const directorieState = useSelector((state) => state.directorie.directories);

  const filteredData = directorieState.filter((directorie) => {
    const fieldsToSearch = [
      "companyName",
      "companyEmail",
      "contactNumber",
      "locality",
      "businessArea",
    ];
    const query = searchQuery.toLowerCase();
    return fieldsToSearch.some((field) =>
      String(directorie[field]).toLowerCase().includes(query)
    );
  });

  const transformDirectorieData = () => {
    return filteredData.map((directorie, index) => ({
      key: index + 1,
      companyName: directorie.companyName,
      companyEmail: directorie.companyEmail,
      contactNumber: directorie.contactNumber,
      locality: directorie.locality,
      businessArea: directorie.businessArea,
      images: directorie.images,
      // description: directorie.description,
      address: directorie.address,
      action: (
        <button
          className="fs-4 text-danger bg-transparent border-0"
          onClick={() => showModal(directorie._id)}
        >
          <MdOutlineDelete />
        </button>
      ),
    }));
  };

  const showModal = (directorieId) => {
    setOpen(true);
    setDirectorieId(directorieId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteDirectorie = (directorieId) => {
    dispatch(deleteADirectorie(directorieId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getDirectorie());
    }, 100);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  return (
    <div>
      <h3 className="mb-4 title">Directory</h3>
      <div className="mb-2">
        <Search
          placeholder="Search by Company Name, Company Email, Contact Number, Locality, or Business Area"
          onSearch={handleSearch}
          enterButton
        />
      </div>
      <div>
        <Table columns={columns} dataSource={transformDirectorieData()} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteDirectorie(directorieId);
        }}
        title="Are you sure you want to delete this Directory"
      />
    </div>
  );
};

export default Directorielist;
