import Activities from "../pages/Activities/Activities";
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import HeroArea from "../pages/Admin/AdminLogin/HeroArea/HeroArea";
import AdminRouter from "../pages/Admin/AdminRouter";
import AwarLicenses from "../pages/AwardAndLicenses/AwarLicenses";
import ContactUs from "../pages/ContactUs/ContactUs";
import Home from "../pages/Home";
import AboutUs from "../pages/Home/AboutUs/AboutUs";
import OurTeam from "../pages/OurTeam/OurTeam";
import UserRouter from "../pages/UserRouter";
import Blogs from "../pages/Admin/BlogsAdmin/Blogs";
import AdminTeam from "../pages/Admin/AdminTeam/AdminTeam";
import AdminAwards from "../pages/Admin/AdminAwards/AdminAwards";
import AdminBlog from "../pages/Admin/AdminBlog/AdminBlog";
import AdminTourm from "../pages/Admin/AdminTourm/AdminTourm";
import AdminPopular from "../pages/Admin/AdminPopular/AdminPopular";
import AdminActivies from "../pages/Admin/AdminActivities/AdminActivies";
import Services from "../pages/Services/Services";
import Incoming from "../pages/Incoming/Incoming";

export const Routes = [
  {
    path: "/",
    element: <UserRouter />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "ourteam",
        element: <OurTeam />,
      },
      {
        path: "award",
        element: <AwarLicenses />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "activities",
        element: <Activities />,
      },
      {
        path: "servicies",
        element: <Services />,
      },
      {
        path: "incoming",
        element: <Incoming />,
      },
    ],
  },
  // {
  //   path: "/admin",
  //   element: <AdminLogin />,
  // },
  {
    path: "admin",
    element: <AdminRouter />,
    children: [
      {
        index: true,
        element:  <AdminLogin />,
      },
      {
        path: "hero",
        element: <HeroArea />,
      },
      {
        path: "blogadmin",
        element: <Blogs />,
      },
      {
        path: "teamadmin",
        element: <AdminTeam />,
      },
      
      {
        path: "awardsadmin",
        element: <AdminAwards />,
      },
      {
        path: "adminblog",
        element: <AdminBlog />,
      },
      {
        path: "admintourm",
        element: <AdminTourm />,
      },
      {
        path: "adminpopular",
        element: <AdminPopular />,
      },
      {
        path: "adminactivities",
        element: <AdminActivies />,
      },
    ],
  },
];
