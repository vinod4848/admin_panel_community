import { Table, Button } from "antd";
// import moment from "moment";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJob, updateAJob } from "../features/job/jobSlice";
import CustomModel from "../components/CustomModel";


const columns = [
  { title: "SN", dataIndex: "key" },
  { title: "Title", dataIndex: "title" },
  { title: "Company", dataIndex: "company" },
  { title: "Location", dataIndex: "location" },
  // { title: "Description", dataIndex: "description" },
  // { title: "Responsibilities", dataIndex: "responsibilities" },
  // { title: "Qualifications", dataIndex: "qualifications" },
  // { title: "Skills", dataIndex: "skills" },
  // { title: "Employment Type", dataIndex: "employmentType" },
  // { title: "Experience Level", dataIndex: "experienceLevel" },
  { title: "Education Level", dataIndex: "educationLevel" },
  { title: "Salary", dataIndex: "salary" },
  // {
  //   title: "Application Deadline",
  //   dataIndex: "applicationDeadline",
  //   render: (deadline) => moment(deadline).format("YYYY-MM-DD"),
  // },
  { title: "Contact Email", dataIndex: "contactEmail" },
  { title: "Activate", dataIndex: "activateDeactivate" },
];

const JobListApprovalPending = () => {
  const [open, setOpen] = useState(false);
  const getUserData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJob());
  }, [dispatch]);

  const jobState = useSelector((state) => state.job.jobs);

  const transformJobData = () => {
    return jobState
      .filter((job) => !job.isPublished)
      .map((job, index) => ({
        key: index + 1,
        title: job.title,
        company: job.company,
        location: job.location,
        // description: job.description,
        // responsibilities: job.responsibilities,
        // qualifications: job.qualifications,
        // skills: job.skills,
        // employmentType: job.employmentType,
        // experienceLevel: job.experienceLevel,
        educationLevel: job.educationLevel,
        salary: job.salary,
        // applicationDeadline: job.applicationDeadline,
        contactEmail: job.contactEmail,
        activateDeactivate: (
          <Button
            type="primary"
            onClick={() => handleActivateDeactivate(job._id, !job.isPublished)}
          >
            {job.isPublished ? "Deactivate" : "Activate"}
          </Button>
        ),
      }));
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleActivateDeactivate = async (jobId, isPublished) => {
    try {
      await axios.put(`${base_url}/jobs/${jobId}`, {
        isPublished: isPublished,
        approvedby: getUserData?._id || "",
      });
      dispatch(updateAJob({ jobId, isPublished }));
      setTimeout(() => {
        dispatch(getJob());
      }, 100);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };  
  return (
    <div>
      <h3 className="mb-4 title"> Job Approval Pending</h3>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={transformJobData()}
          scroll={{ x: true }}
        />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {}}
        title="Are you sure you want to delete this Job"
      />
    </div>
  );
};

export default JobListApprovalPending;
