import { Table, Space, Image, Input } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMatrimonial,
  deleteAMatrimonial,
} from "../features/matrimonial/matrimonialSlice";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";
const { Search } = Input;

const columns = [
  {
    title: "SN",
    dataIndex: "key",
    className: "column-sn",
    align: "center",
    width: 50,
  },
  { title: "approvedby", dataIndex: "approvedby" },
  {
    title: "Profile",
    dataIndex: "images",
    render: (images) => (
      <Space size={[8, 8]} wrap>
        {images.length > 0 ? (
          images.map((imageUrl, index) => (
            <Image
              key={index}
              src={imageUrl}
              alt={`Image ${index}`}
              style={{ width: "150px", height: "100px", marginBottom: "8px" }}
            />
          ))
        ) : (
          <span>No images</span>
        )}
      </Space>
    ),
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    className: "column-firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    align: "center",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Date of Birth",
    dataIndex: "dateOfBirth",
    render: (deadline) => moment(deadline).format("MMM DD, YYYY"),
  },
  {
    title: "Profession",
    dataIndex: "profession",
  },
  {
    title: "Native Place",
    dataIndex: "nativePlace",
  },
  {
    title: "Height",
    dataIndex: "height",
    align: "center",
  },
  {
    title: "About Me",
    dataIndex: "aboutMe",
    ellipsis: true,
  },
  {
    title: "Marital Status",
    dataIndex: "maritalStatus",
    align: "center",
  },
  {
    title: "Profile Created By",
    dataIndex: "profileCreatedBy",
  },
  {
    title: "Any Disability",
    dataIndex: "anyDisability",
    align: "center",
  },
  {
    title: "Blood Group",
    dataIndex: "bloodGroup",
    align: "center",
  },
  {
    title: "Lifestyle",
    dataIndex: "lifestyle",
  },
  {
    title: "More About Yourself, Partner, and Family",
    dataIndex: "moreAboutYourselfPartnerAndFamily",
    ellipsis: true,
  },
  {
    title: "Hobbies",
    dataIndex: "hobbies",
    render: (hobbies) => (
      <span className="nowrap">
        {Array.isArray(hobbies) ? hobbies.join(", ") : ""}
      </span>
    ),
    ellipsis: true,
  },
  {
    title: "Created Date",
    dataIndex: "createdAt",
    render: (deadline) => moment(deadline).format("MMM DD, YYYY"),
  },
  {
    title: "Partner Preferences",
    dataIndex: "partnerPreferences",
    ellipsis: true,
  },
  {
    title: "Religious Background",
    dataIndex: "religiousBackground",
    ellipsis: true,
  },
  {
    title: "Family",
    dataIndex: "family",
    ellipsis: true,
  },
  {
    title: "Astro Details",
    dataIndex: "astroDetails",
    ellipsis: true,
  },
  {
    title: "Education and Career",
    dataIndex: "educationAndCareer",
    ellipsis: true,
  },
  {
    title: "Health Information",
    dataIndex: "healthInformation",
    ellipsis: true,
  },
  {
    title: "Location of Groom",
    dataIndex: "locationOfGroom",
    ellipsis: true,
  },
  {
    title: "Activation Amount",
    dataIndex: "amount",
  },

  {
    title: "Payment Image",
    dataIndex: "image",
    render: (image) => (
      <Space size={[8, 8]} wrap>
        {image ? (
          <Image
            src={image}
            alt="Image"
            style={{ width: "70px", height: "70px", marginBottom: "8px" }}
          />
        ) : (
          <span>N/A</span>
        )}
      </Space>
    ),
  },
  {
    title: "Actions",
    dataIndex: "action",
    className: "column-actions",
  },
];

const MatrimonialList = () => {
  const [matrimonialId, setMatrimonialId] = useState();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatrimonial());
  }, [dispatch]);

  const matrimonialState = useSelector(
    (state) => state.matrimonial.matrimonials
  );

  const filteredData = matrimonialState.filter((matrimonial) => {
    const fieldsToSearch = ["firstName", "profession", "gender", "nativePlace"];
    const query = searchQuery.toLowerCase();
    return fieldsToSearch.some((field) =>
      String(matrimonial[field]).toLowerCase().includes(query)
    );
  });

  const transformMatrimonialData = () => {
    return filteredData
      .filter((matrimonial) => matrimonial.isApproved)
      .map((matrimonial, index) => {
        const religiousBackground = matrimonial.religiousBackground || {};
        const family = matrimonial.family || {};
        const astroDetails = matrimonial.astroDetails || {};
        const partnerPreferences = matrimonial.partnerPreferences || {};
        const educationAndCareer = matrimonial.educationAndCareer || {};
        const locationOfGroom = matrimonial.locationOfGroom || {};

        return {
          key: index + 1,
          firstName: matrimonial.profileId?.firstName || "N/A",
          lastName: matrimonial.profileId?.lastName || "N/A",
          images: matrimonial.images || [],
          // email: matrimonial.userId?.email || "N/A",
          phone: matrimonial.userId?.phone || "N/A",
          dateOfBirth: moment(matrimonial.dateOfBirth).format("YYYY-MM-DD"),
          profession: matrimonial.profileId?.profession || "N/A",
          nativePlace: matrimonial.nativePlace || "N/A",
          approvedby: matrimonial.approvedby
            ? matrimonial.approvedby.username || "N/A"
            : "N/A",
          maritalStatus: matrimonial.profileId?.maritalStatus || "N/A",
          address: matrimonial.address || "N/A",
          education: matrimonial.education || "N/A",
          hobbies: Array.isArray(matrimonial.hobbies)
            ? matrimonial.hobbies.join(", ")
            : "N/A",
          gender: matrimonial.profileId?.gender || "N/A",
          createdAt: moment(matrimonial.createdAt).format("YYYY-MM-DD"),
          aboutMe: matrimonial.aboutMe || "N/A",
          height: matrimonial.height || "N/A",
          profileCreatedBy: matrimonial.profileCreatedBy || "N/A",
          healthInformation: matrimonial.healthInformation || "N/A",
          anyDisability: matrimonial.anyDisability || "N/A",
          bloodGroup: matrimonial.bloodGroup || "N/A",
          lifestyle: matrimonial.lifestyle || "N/A",
          amount: matrimonial.payments[0]?.amount || "N/A",
          image: matrimonial.payments[0]?.image || "N/A",
          moreAboutYourselfPartnerAndFamily:
            matrimonial.moreAboutYourselfPartnerAndFamily || "N/A",
          religiousBackground: (
            <span>
              <strong>Religion:</strong> {religiousBackground.religion || "N/A"}
              , <strong>Mother Tongue:</strong>{" "}
              {religiousBackground.motherTongue || "N/A"},{" "}
              <strong>Community:</strong>{" "}
              {religiousBackground.community || "N/A"},{" "}
              <strong>Sub Community:</strong>{" "}
              {religiousBackground.subCommunity || "N/A"},{" "}
              <strong>Gothra/Gothram:</strong>{" "}
              {religiousBackground.gothraGothram || "N/A"}
            </span>
          ),
          family: (
            <span>
              <strong>Number of Siblings:</strong>{" "}
              {family.numberOfSiblings || "N/A"},{" "}
              <strong>Father Status:</strong> {family.fatherStatus || "N/A"},{" "}
              <strong>Living with:</strong> {family.with || "N/A"},{" "}
              <strong>Occupation:</strong> {family.as || "N/A"},{" "}
              <strong>Nature of Business:</strong>{" "}
              {family.natureOfBusiness || "N/A"},{" "}
              <strong>Mother Status:</strong> {family.motherStatus || "N/A"},{" "}
              <strong>Family Location:</strong> {family.familyLocation || "N/A"}
              , <strong>Family Type:</strong> {family.familyType || "N/A"},{" "}
              <strong>Family Values:</strong> {family.familyValues || "N/A"},{" "}
              <strong>Family Affluence:</strong>{" "}
              {family.familyAffluence || "N/A"}
            </span>
          ),
          astroDetails: (
            <span>
              <strong>Manglik/Chevva Dosham:</strong>{" "}
              {astroDetails.manglikChevvaidosham || "N/A"},{" "}
              <strong>Nakshatra:</strong> {astroDetails.nakshatra || "N/A"}
            </span>
          ),
          partnerPreferences: (
            <span>
              <strong>Age Range:</strong>{" "}
              {partnerPreferences.ageRange?.min || "N/A"} -{" "}
              {partnerPreferences.ageRange?.max || "N/A"},{" "}
              <strong>Gender:</strong> {partnerPreferences.gender || "N/A"},{" "}
              <strong>Education:</strong>{" "}
              {partnerPreferences.education || "N/A"},{" "}
              <strong>Profession:</strong>{" "}
              {partnerPreferences.profession || "N/A"},{" "}
              <strong>Min Height:</strong>{" "}
              {partnerPreferences.minHeight || "N/A"},{" "}
              <strong>Max Income:</strong>{" "}
              {partnerPreferences.maxIncome || "N/A"}
            </span>
          ),
          educationAndCareer: (
            <span>
              <strong>Highest Qualification:</strong>{" "}
              {educationAndCareer.highestQualification || "N/A"},{" "}
              <strong>College Attended:</strong>{" "}
              {educationAndCareer.collegeAttended || "N/A"},{" "}
              <strong>Working With:</strong>{" "}
              {educationAndCareer.workingWith || "N/A"},{" "}
              <strong>Annual Income:</strong>{" "}
              {educationAndCareer.annualIncome || "N/A"}
            </span>
          ),
          locationOfGroom: (
            <span>
              <strong>Country Living In:</strong>{" "}
              {locationOfGroom.countryLivingIn || "N/A"},{" "}
              <strong>State Living In:</strong>{" "}
              {locationOfGroom.stateLivingIn || "N/A"},{" "}
              <strong>City Living In:</strong>{" "}
              {locationOfGroom.cityLivingIn || "N/A"},{" "}
              <strong>Grew Up In:</strong> {locationOfGroom.grewUpIn || "N/A"},{" "}
              <strong>Ethnic Origin:</strong>{" "}
              {locationOfGroom.ethnicOrigin || "N/A"},{" "}
              <strong>Zip/Pin Code:</strong>{" "}
              {locationOfGroom.zipPinCode || "N/A"}
            </span>
          ),
          action: (
            <>
              {matrimonial.isApproved ? (
                <button
                  className="fs-3 text-danger bg-transparent border-0"
                  onClick={() => showModal(matrimonial._id)}
                >
                  <MdOutlineDelete />
                </button>
              ) : (
                <span className="text-muted">Not Approved</span>
              )}
            </>
          ),
        };
      });
  };

  const showModal = (matrimonialId) => {
    setOpen(true);
    setMatrimonialId(matrimonialId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const deleteMatrimonial = (matrimonialId) => {
    dispatch(deleteAMatrimonial(matrimonialId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getMatrimonial());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Matrimonial Profiles</h3>
      <div className="mb-2">
        <Search
          placeholder="Search by Name Profession or NativePlace"
          onSearch={handleSearch}
          enterButton
        />
      </div>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={transformMatrimonialData()}
          scroll={{ x: true }}
        />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          deleteMatrimonial(matrimonialId);
        }}
        title="Are you sure you want to delete this Matrimonial"
      />
    </div>
  );
};

export default MatrimonialList;
