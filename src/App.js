import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import Advertisinglist from "./pages/AdvertisingList";
import Eventlist from "./pages/EventList";
import CompleteEventList from "./pages/CompleteEventList";
import Joblist from "./pages/JobList";
import Newslist from "./pages/NewsList";
import JobListApprovalPending from "./pages/JobListApprovalPending";
import MatrimonialListApprovalPending from "./pages/MatrimonialListApprovalPending";
import EventListApprovalPending from "./pages/EventListApprovalPending";
import Directorielist from "./pages/DirectorieList";
import Matrimoniallist from "./pages/Matrimonial.List";
import Blogcatlist from "./pages/Blogcatlist";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import AddBlog from "./pages/AddBlog";
import AddEvent from "./pages/AddEvent";
import AddNews from "./pages/AddNews";
import AddJob from "./pages/AddJob";
import AddAdvertisement from "./pages/AddAdvertising";
import AddDirectory from "./pages/AddDirectorie";
import AddUser from "./pages/AddUser";
import UserListApprovalPending from "./pages/UserListApprovalPending";
// import UserList from "./pages/UserList";
import BlockUserListss from "./pages/BlockUserList";
import AddMagazines from "./pages/AddMagazines";
import MagazinesList from "./pages/MagazinesList";
import AnnouncementList from "./pages/AnnouncementList";
import Addannouncements from "./pages/AddAnnouncement";
import AnnouncementApprovalPendingList from "./pages/AnnouncementApprovalPendingList";
import CompleteAnnouncementsList from "./pages/CompleteAnnouncementsList";
import AddAnnouncementCategory from "./pages/AddAnnouncementCategory";
import AnnouncementCategoryList from "./pages/AnnouncementCategoryList";
import PropertyList from "./pages/PropertyList";
import AddProperty from "./pages/AddProperty";
import LandsPlotsList from "./pages/landsPlotsList";
import ShopOfficeList from "./pages/ShopOfficeList";
import PgGuestHouseList from "./pages/pgGuestHouseList";
import SellAndbuyList from "./pages/SellAndbuyList";
import UserListV1 from "./pages/UserListV1";
import GalleryList from "./pages/GalleryList";
import FashionList from "./pages/FashionList";
import FurnitureList from "./pages/FurnitureList";
import AddGallery from "./pages/AddGallery";
import ElectronicsList from "./pages/ElectronicsList";
import PhoneList from "./pages/PhoneList";
import AccessoriesList from "./pages/AccessoriesList";
import TabletsList from "./pages/TabletsList";
import BicyclesList from "./pages/BicyclesList";
import BikeList from "./pages/BikeList";
import CarList from "./pages/CarList";
import ReportsList from "./pages/ReportsList";
import EnquiryList from "./pages/EnquiryList";
import PackageList from "./pages/package-list";
import AddPackage from "./pages/AddPackage ";
import PaymentList from "./pages/paymentList";
import OtherList from "./pages/OtherList";
import PaymentListofline from "./pages/payment";
import AddMember from "./pages/AddMember";
import MemberList from "./pages/MemberList";
import MemberProfilelist from "./pages/MemberProfilelist";
import AddCommittee from "./pages/AddCommittee";
import AddContactInfo from "./pages/AddContcatInfo";
import ContactInfoList from "./pages/ContcatInfoList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="advertising-list" element={<Advertisinglist />} />
          <Route path="event-list" element={<Eventlist />} />
          <Route path="complete-event-list" element={<CompleteEventList />} />
          <Route path="job-list" element={<Joblist />} />
          <Route path="news-list" element={<Newslist />} />
          <Route
            path="approval-job-list"
            element={<JobListApprovalPending />}
          />
          <Route
            path="approval-list-matrimonial"
            element={<MatrimonialListApprovalPending />}
          />
          <Route
            path="approval-list-user"
            element={<UserListApprovalPending />}
          />
          <Route
            path="approval-list-event"
            element={<EventListApprovalPending />}
          />
          <Route path="directory-list" element={<Directorielist />} />
          <Route path="matrimonial-list" element={<Matrimoniallist />} />
          <Route path="blogs" element={<AddBlog />} />
          <Route path="blogs/:blogId" element={<AddBlog />} />
          <Route path="events" element={<AddEvent />} />
          <Route path="job" element={<AddJob />} />
          <Route path="advertising" element={<AddAdvertisement />} />
          <Route path="advertising/:id" element={<AddAdvertisement />} />
          <Route path="directory" element={<AddDirectory />} />
          <Route path="magazines" element={<AddMagazines />} />
          <Route path="magazines-list" element={<MagazinesList />} />
          <Route path="property-list" element={<PropertyList />} />
          <Route path="property" element={<AddProperty />} />
          <Route path="landPlot-list" element={<LandsPlotsList />} />
          <Route path="shopOffice-list" element={<ShopOfficeList />} />
          <Route path="pgGuestHouse-list" element={<PgGuestHouseList />} />
          <Route path="electronicsList-list" element={<ElectronicsList />} />
          <Route path="sellAndbuy-list" element={<SellAndbuyList />} />
          <Route path="phone-list" element={<PhoneList />} />
          <Route path="accessories-list" element={<AccessoriesList />} />
          <Route path="tablets-list" element={<TabletsList />} />
          <Route path="bicycles-list" element={<BicyclesList />} />
          <Route path="bike-list" element={<BikeList />} />
          <Route path="car-list" element={<CarList />} />

          <Route
            path="announcementCategoryName"
            element={<AddAnnouncementCategory />}
          />
          <Route
            path="announcementCategoryName/:id"
            element={<AddAnnouncementCategory />}
          />
          <Route
            path="announcementCategoryName-list"
            element={<AnnouncementCategoryList />}
          />
          <Route path="announcements-list" element={<AnnouncementList />} />
          <Route path="announcements" element={<Addannouncements />} />
          <Route
            path="approvalpending-list"
            element={<AnnouncementApprovalPendingList />}
          />
          <Route
            path="completed-list"
            element={<CompleteAnnouncementsList />}
          />
          <Route path="directorie/:directoryId" element={<AddDirectory />} />
          <Route path="users" element={<AddUser />} />
          <Route path="users/:userId" element={<AddUser />} />
          {/* <Route path="user-list" element={<UserList />} /> */}
          <Route path="user-list" element={<UserListV1 />} />
          <Route path="reports-list" element={<ReportsList />} />
          <Route path="furniture-list" element={<FurnitureList />} />
          <Route path="fashion-list" element={<FashionList />} />
          <Route path="gallery-list" element={<GalleryList />} />
          <Route path="gallery" element={<AddGallery />} />
          <Route path="block-user-list" element={<BlockUserListss />} />
          <Route path="events/:eventId" element={<AddEvent />} />
          <Route path="news" element={<AddNews />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="enquiry-list" element={<EnquiryList />} />
          <Route path="package-list" element={<PackageList />} />
          <Route path="package" element={<AddPackage />} />
          <Route path="package/:packagesId" element={<AddPackage />} />
          <Route path="payment-list" element={<PaymentList />} />
          <Route path="other-list" element={<OtherList />} />
          <Route path="payments-listofline" element={<PaymentListofline />} />
          <Route path="member" element={<AddMember />} />
          <Route path="Member-list" element={<MemberList />} />
          <Route path="Committee-List" element={<MemberProfilelist />} />
          <Route path="Committee" element={<AddCommittee />} />
          <Route path="ContcatInfo" element={<AddContactInfo />} />
          <Route path="ContcatInfo-List" element={<ContactInfoList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
