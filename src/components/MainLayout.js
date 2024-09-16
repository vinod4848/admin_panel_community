import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { FaUserTie, FaMicroblog, FaCarAlt } from "react-icons/fa";
import { MdDashboard, MdCardMembership, MdPayments, MdNewspaper, MdContactless } from "react-icons/md";
import { FcDepartment, FcAdvertising, FcGallery, FcNews, FcAbout } from "react-icons/fc";
import { SiEventstore } from "react-icons/si";
import { AiFillProfile, AiFillPropertySafety } from "react-icons/ai";
import { GiLovers } from "react-icons/gi";
import { TiShoppingCart } from "react-icons/ti";
import { VscReport } from "react-icons/vsc";
import { TbReportSearch } from "react-icons/tb";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  const getUserData = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const tryShow = () => {
    setCollapsed(!collapsed);

    if (collapsed) {
      setShow(false);
      setShow2(true);
    } else {
      setShow(true);
      setShow2(false);
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            {show && <span className="sm-logo">Get</span>}
            {show2 && <span className="gl-logo">Community</span>}
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "singnout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdDashboard  className="fs-6"  color="Orange" />,
              label: "Dashbord",
            },
            {
              key: "Committee",
              icon: <MdCardMembership   className="fs-6" color="white"  />,
              label: "Committee",
              children: [
                {
                  key: "Committee",
                  // icon: <FaUsers className="fs-4" />,
                  label: "Add Committee",
                },
                {
                  key: "Committee-List",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Committee List",
                },
              ],
            },
            {
              key: "DepartmentCategory",
              icon: <FcDepartment className="fs-6" />,
              label: "DepartmentCategory",
              children: [
                {
                  key: "DepartmentCategory-List",
                  // icon: <ImBlog className="fs-4" />,
                  label: "DepartmentCategory List",
                },
              ],
            },

            // for usery Manegment start
            // {
            //   key: "user",
            //   icon: <FaEnvelope className="fs-4" />,
            //   label: "Users",
            //   children: [
            //     {
            //       key: "users",
            //       icon: <FaBlogger className="fs-4" />,
            //       label: "Add User",
            //     },
            //     {
            //       key: "user-list",
            //       icon: <FaEnvelopeOpen className="fs-4" />,
            //       label: "Users List",
            //     },
            //     {
            //       key: "approval-list-User",
            //       icon: <ImBlog className="fs-4" />,
            //       label: "Approval Pending",
            //     },
            //     {
            //       key: "block-user-list",
            //       icon: <FaEnvelopeOpen className="fs-4" />,
            //       label: "Block User",
            //     },
            //   ],
            // },

            {
              key: "member",
              icon: <RiUser3Line className="fs-6"  color="Orange" />,
              label: "Members",
              children: [
                {
                  key: "member",
                  // icon: <RiUser3Line className="fs-4" />,
                  label: "Add Member",
                },
                {
                  key: "Member-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Member List",
                },
              ],
            },
            {
              key: "user",
              icon: <FaUserTie className="fs-6"  color="Green"/>,
              label: "User Profiles",
              children: [
                {
                  key: "user-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Profiles List",
                },
              ],
            },
            {
              key: "Payments",
              icon: <MdPayments className="fs-6" color="#FF9933"  />,
              label: "Payments",
              children: [
                {
                  key: "payments-listofline",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Payments List",
                },
              ],
            },
            // {
            //   key: "package",
            //   icon: <FaBlogger className="fs-4" />,
            //   label: "Packages",
            //   children: [
            //     {
            //       key: "package",
            //       icon: <ImBlog className="fs-4" />,
            //       label: "Add Package",
            //     },
            //     {
            //       key: "package-list",
            //       icon: <ImBlog className="fs-4" />,
            //       label: "Package  List",
            //     },

            //   ],
            // },
            // {
            //   key: "payment",
            //   icon: <FaBlogger className="fs-4" />,
            //   label: "Payments",
            //   children: [
            //     {
            //       key: "payment-list",
            //       icon: <ImBlog className="fs-4" />,
            //       label: "Payments List",
            //     },
            //   ],
            // },

            {
              key: "blog",
              icon: <FaMicroblog className="fs-6"  color="blue"/>,
              label: "Blogs",
              children: [
                {
                  key: "blogs",
                  // icon: <FaBlogger className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Blog List",
                },
              ],
            },
            {
              key: "event",
              icon: <SiEventstore className="fs-6"  color="Lavender" />,
              label: "Event",
              children: [
                {
                  key: "events",
                  // icon: <FaEnvelopeOpen className="fs-4" />,
                  label: "Add Event",
                },
                {
                  key: "event-list",
                  // icon: <FaEnvelopeOpen className="fs-4" />,
                  label: "Event List",
                },
                {
                  key: "approval-list-event",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Approval Pending",
                },
                {
                  key: "complete-event-list",
                  // icon: <FaEnvelopeOpen className="fs-4" />,
                  label: "Complete List",
                },
              ],
            },
            {
              key: "News",
              icon: <MdNewspaper className="fs-6" color="Navy" />,
              label: "News",
              children: [
                {
                  key: "news",
                  // icon: <FaBlogger className="fs-4" />,
                  label: "Add News",
                },
                {
                  key: "news-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "News List",
                },
              ],
            },
            {
              key: "advertising ",
              icon: <FcAdvertising className="fs-6"  color="Turquoise"/>,
              label: "Advertising ",
              children: [
                {
                  key: "advertising",
                  // icon: <FaBlogger className="fs-4" />,
                  label: "Add Advertising ",
                },
                {
                  key: "advertising-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Advertising  List",
                },
              ],
            },
            {
              key: "Job",
              icon: <FcAdvertising className="fs-6"  color="Lavender"/>,
              label: "Job",
              children: [
                // {
                //   key: "job",
                //   icon: <FaBlogger className="fs-4" />,
                //   label: "Add Job ",
                // },
                {
                  key: "job-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Job  List",
                },
                {
                  key: "approval-job-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Approval Pending",
                },
              ],
            },
            {
              key: "directory",
              icon: <AiFillProfile className="fs-6"  color="Violet"/>,
              label: "Directory",
              children: [
                // {
                //   key: "directory",
                //   icon: <FaBlogger className="fs-4" />,
                //   label: "Add Directory ",
                // },
                {
                  key: "directory-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Directory  List",
                },
              ],
            },

            {
              key: "gallery",
              icon: <FcGallery className="fs-6"   color="Coral"/>,
              label: "Gallery",
              children: [
                {
                  key: "gallery",
                  // icon: <FaBlogger className="fs-4" />,
                  label: "Add Gallery ",
                },
                {
                  key: "gallery-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Gallery  List",
                },
              ],
            },

            {
              key: "Matrimonial",
              icon: <GiLovers className="fs-6"   color="Brown"/>,
              label: "Matrimonial",
              children: [
                {
                  key: "matrimonial-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Matrimonial  List",
                },
                {
                  key: "approval-list-matrimonial",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Approval Pending",
                },
              ],
            },
            {
              key: "magazines",
              icon: <FcNews className="fs-6"   color="Maroon"/>,
              label: "Magazines",
              children: [
                {
                  key: "magazines",
                  // icon: <FaBlogger className="fs-4" />,
                  label: "Add Magazines ",
                },
                {
                  key: "magazines-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Magazines  List",
                },
              ],
            },
            {
              key: "announcements",
              icon: <FcAdvertising className="fs-6"  color="Turquoise" />,
              label: "Announcements",
              children: [
                {
                  key: "announcementCategoryName",
                  // icon: <ImBlog className="fs-4" />,
                  label: " Add CategoryAnnouncement",
                },
                {
                  key: "announcementCategoryName-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Category Announcement List",
                },

                {
                  key: "announcements",
                  // icon: <FaBlogger className="fs-4" />,
                  label: "Add Announcements ",
                },
                {
                  key: "approvalpending-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "ApprovalPending List",
                },
                {
                  key: "announcements-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "List Announcements ",
                },

                {
                  key: "completed-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Completed  List",
                },
              ],
            },
            {
              key: "Property",
              icon: <AiFillPropertySafety  className="fs-6" color="Beige" />,
              label: "Property",
              children: [
                // {
                //   key: "property",
                //   icon: <FaBlogger className="fs-4" />,
                //   label: "Add Property ",
                // },
                {
                  key: "property-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Property  List",
                },

                // {
                //   key: "landPlot",
                //   icon: <FaBlogger className="fs-4" />,
                //   label: "Add Lands_Plots",
                // },
                {
                  key: "landPlot-list",
                  // icon: <FaBlogger className="fs-4" />,
                  label: "Lands & Plots List ",
                },
                // {
                //   key: "shopOffice",
                //   icon: <FaBlogger className="fs-4" />,
                //   label: "Add ShopOffice ",
                // },
                {
                  key: "shopOffice-list",
                  // icon: <FaBlogger className="fs-4" />,
                  label: "Shop & Office  List",
                },

                // {
                //   key: "pgGuestHouse",
                //   icon: <FaBlogger className="fs-4" />,
                //   label: "Add PgGuestHouse ",
                // },
                {
                  key: "pgGuestHouse-list",
                  // icon: <FaBlogger className="fs-4" />,
                  label: "PG & GuestHouse List",
                },
              ],
            },
            {
              key: "product ",
              icon: <TiShoppingCart className="fs-6"  color="Lime"/>,
              label: "Products",
              children: [
                // {
                //   key: "sellAndbuy",
                //   icon: <FaBlogger className="fs-4" />,
                //   label: "Add Sell/Buy ",
                // },
                // {
                //   key: "sellAndbuy-list",
                //   icon: <ImBlog className="fs-4" />,
                //   label: "Sell/Buy  List",
                // },
                {
                  key: "fashion-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Fashion  List",
                },
                {
                  key: "furniture-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Furniture  List",
                },
                {
                  key: "electronicsList-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "ElectronicsList  List",
                },
                {
                  key: "phone-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Phone List",
                },
                {
                  key: "accessories-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Accessories  List",
                },
                {
                  key: "tablets-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Tablets  List",
                },
                {
                  key: "other-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Other List",
                },
              ],
            },
            {
              key: "vehicle",
              icon: <FaCarAlt className="fs-6"   color="Navy"/>,
              label: "Vehicle",
              children: [
                {
                  key: "car-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Car  List",
                },
                {
                  key: "bike-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Bike  List",
                },
                {
                  key: "bicycles-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Bicycles  List",
                },
              ],
            },
            {
              key: "reports",
              icon: <TbReportSearch className="fs-6"  color="Magenta"/>,
              label: "Reports",
              children: [
                {
                  key: "reports-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Reports  List",
                },
              ],
            },
            {
              key: "enquiry",
              icon: <VscReport className="fs-6"   color="Beige"/>,
              label: "Enquirys",
              children: [
                {
                  key: "enquiry-list",
                  // icon: <ImBlog className="fs-4" />,
                  label: "Enquiry  List",
                },
              ],
            },
            {
              key: "ContcatInfo",
              icon: <MdContactless className="fs-6"  color="Cyan" />,
              label: "ContcatInfo",
              children: [
                // {
                //   key: "ContcatInfo",
                //   icon: <FaUsers className="fs-4" />,
                //   label: "ContcatInfo",
                // },
                {
                  key: "ContcatInfo-List",
                  // icon: <ImBlog className="fs-4" />,
                  label: "ContcatInfo List",
                },
              ],
            },
            {
              key: "AboutUs",
              icon: <FcAbout className="fs-6" color="Lime"  />,
              label: "AboutUs",
              children: [
                // {
                //   key: "AboutUs",
                //   icon: <FaUsers className="fs-4" />,
                //   label: "Add AboutUs",
                // },
                {
                  key: "AboutUs-List",
                  // icon: <ImBlog className="fs-4" />,
                  label: "AboutUs List",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-3 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => {
                tryShow();
              },
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            {/* <div className="position-relative">
              <IoMdNotifications className="fs-4" />
              <span className="badge bg-danger rounded-circle p-1 position-absolute">
                2
              </span>
            </div> */}
            <div className="d-flex  gap-3 align-items-center">
              <div className="img">
                <img
                  width={32}
                  height={32}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLzi8P9Z8RNkDxO7TSfCTcMN3PkJKyG9rMJw&usqp=CAU"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{getUserData?.username}</h5>
                <p className="mb-0">{getUserData?.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {/* <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Profile
                  </Link>
                </li> */}
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Logout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
