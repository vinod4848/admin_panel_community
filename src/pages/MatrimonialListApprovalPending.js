import { Table, Button, Space, Image } from "antd";
import moment from "moment";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMatrimonial,
  updateAMatrimonial,
} from "../features/matrimonial/matrimonialSlice";

// const columns = [
//   {
//     title: "SN",
//     dataIndex: "key",
//     className: "column-sn",
//   },
//   {
//     title: "FirstName",
//     dataIndex: "firstName",
//     className: "column-firstName",
//   },
//   {
//     title: "LastName",
//     dataIndex: "lastName",
//   },
//   {
//     title: "Gender",
//     dataIndex: "gender",
//   },
//   {
//     title: "Phone",
//     dataIndex: "phone",
//   },
//   {
//     title: "DateOfBirth",
//     dataIndex: "dateOfBirth",
//     render: (deadline) => moment(deadline).format("YYYY-MM-DD"),
//   },
//   {
//     title: "Profession",
//     dataIndex: "profession",
//   },
//   {
//     title: "NativePlace",
//     dataIndex: "nativePlace",
//   },
//   {
//     title: "Height",
//     dataIndex: "height",
//   },

//   {
//     title: "AboutMe",
//     dataIndex: "aboutMe",
//   },
//   {
//     title: "MaritalStatus",
//     dataIndex: "maritalStatus",
//   },
//   {
//     title: "ProfileCreatedBy",
//     dataIndex: "profileCreatedBy",
//   },
//   {
//     title: "AnyDisability",
//     dataIndex: "anyDisability",
//   },
//   {
//     title: "BloodGroup",
//     dataIndex: "bloodGroup",
//   },
//   {
//     title: "Lifestyle",
//     dataIndex: "lifestyle",
//   },
//   {
//     title: "moreAboutYourselfPartnerAndFamily",
//     dataIndex: "moreAboutYourselfPartnerAndFamily",
//   },
//   {
//     title: "Hobbies",
//     dataIndex: "hobbies",
//     render: (hobbies) => (
//       <span>{Array.isArray(hobbies) ? hobbies.join(", ") : ""}</span>
//     ),
//   },
//   {
//     title: "Created Date",
//     dataIndex: "createdAt",
//     render: (deadline) => moment(deadline).format("YYYY-MM-DD"),
//   },

//   {
//     title: "Partner Preferences",
//     dataIndex: "partnerPreferences",
//   },

//   {
//     title: "ReligiousBackground",
//     dataIndex: "religiousBackground",
//   },
//   {
//     title: "Family",
//     dataIndex: "family",
//   },
//   {
//     title: "AstroDetails",
//     dataIndex: "astroDetails",
//   },
//   {
//     title: "EducationAndCareer",
//     dataIndex: "educationAndCareer",
//   },
//   {
//     title: "HealthInformation",
//     dataIndex: "healthInformation",
//   },
//   {
//     title: "LocationOfGroom",
//     dataIndex: "locationOfGroom",
//   },
//   {
//     title: "Profile",
//     dataIndex: "image",
//     render: (image) => (
//       <img src={image} alt="profileBanner" style={{ maxWidth: "100px" }} />
//     ),
//   },
//   {
//     title: "Activate",
//     dataIndex: "activateDeactivate",
//   },
// ];

const columns = [
  {
    title: "SN",
    dataIndex: "key",
    className: "column-sn",
    align: "center",
    width: 50,
  },
  {
    title: "Profile",
    dataIndex: "images",
    render: (images) => (
      <Space size={[8, 8]} wrap>
        {images && images.length > 0 ? (
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
    title: "Activate",
    dataIndex: "activateDeactivate",
  },
];
const MatrimonialListApprovalPending = () => {
  const dispatch = useDispatch();
  const getUserData = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getMatrimonial());
  }, [dispatch]);

  const matrimonialState = useSelector(
    (state) => state.matrimonial.matrimonials
  );
  const transformMatrimonialData = () => {
    return matrimonialState
      .filter((matrimonial) => !matrimonial.isApproved)
      .map((matrimonial, index) => {
        const profileId = matrimonial.profileId || {};
        const userId = matrimonial.userId || {};
        const religiousBackground = matrimonial.religiousBackground || {};
        const family = matrimonial.family || {};
        const astroDetails = matrimonial.astroDetails || {};
        const partnerPreferences = matrimonial.partnerPreferences || {};
        const educationAndCareer = matrimonial.educationAndCareer || {};
        const locationOfGroom = matrimonial.locationOfGroom || {};

        return {
          key: index + 1,
          firstName: profileId.firstName || "N/A",
          lastName: profileId.lastName || "N/A",
          image: matrimonial.image || "N/A",
          // email: userId.email || "N/A",
          phone: userId.phone || "N/A",
          dateOfBirth: moment(matrimonial.dateOfBirth).format("YYYY-MM-DD"),
          profession: profileId.profession || "N/A",
          nativePlace: matrimonial.nativePlace || "N/A",
          maritalStatus: matrimonial.maritalStatus || "N/A",
          address: matrimonial.address || "N/A",
          education: matrimonial.education || "N/A",
          images: matrimonial.images || "N/A",
          hobbies: Array.isArray(matrimonial.hobbies)
            ? matrimonial.hobbies.join(", ")
            : "N/A",
          gender: profileId.gender || "N/A",
          createdAt: moment(matrimonial.createdAt).format("YYYY-MM-DD"),
          aboutMe: matrimonial.aboutMe || "N/A",
          height: matrimonial.height || "N/A",
          profileCreatedBy: matrimonial.profileCreatedBy || "N/A",
          healthInformation: matrimonial.healthInformation || "N/A",
          anyDisability: matrimonial.anyDisability || "N/A",
          bloodGroup: matrimonial.bloodGroup || "N/A",
          lifestyle: matrimonial.lifestyle || "N/A",
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
          action: <></>,
          activateDeactivate: (
            <Button
              type="primary"
              onClick={() =>
                handleActivateDeactivate(
                  matrimonial._id,
                  !matrimonial.isApproved
                )
              }
            >
              {matrimonial.isApproved ? "Deactivate" : "Activate"}
            </Button>
          ),
        };
      });
  };

  const handleActivateDeactivate = async (matrimonialId, isApproved) => {
    try {
      await axios.put(`${base_url}/matrimonial/profiles/${matrimonialId}`, {
        isApproved: isApproved,
        approvedby: getUserData?._id || "",
      });
      dispatch(updateAMatrimonial({ matrimonialId, isApproved }));
      setTimeout(() => {
        dispatch(getMatrimonial());
      }, 100);
    } catch (error) {
      console.error("Error updating matrimonial:", error);
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Matrimonial Profiles</h3>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={transformMatrimonialData()}
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};

export default MatrimonialListApprovalPending;
