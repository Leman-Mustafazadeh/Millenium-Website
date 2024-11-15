import Activities from "../pages/Activities/Activities";
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
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
import AdminTourm from "../pages/Admin/AdminTourm/AdminTourm";
import AdminPopular from "../pages/Admin/AdminPopular/AdminPopular";
import AdminActivies from "../pages/Admin/AdminActivities/AdminActivies";
import Services from "../pages/Services/Services";
import Incoming from "../pages/Incoming/Incoming";
import HeroArea from "../pages/Admin/HeroArea/HeroArea";
import AddLogo from "../pages/Admin/AddLogo/AddLogo";
import Outgoing from "../pages/Outgoing/Outgoing";
import OutgoingDetail from "../pages/OutgoingDetail/OutgoingDetail";
import AdminIncoming from "../pages/Admin/AdminIncoming/AdminIncoming";
import AdminOutgoing from "../pages/Admin/AdminOutgoing/AdminOutgoing";
import AdminServicies from "../pages/Admin/AdminServicies/AdminServicies";
import AdminServiceCategory from "../pages/Admin/AdminServiceCategory/AdminServiceCategory";
import ActivitiesDetail from "../pages/ActiviesDetail/ActivitiesDetail";
import IncomingDetail from "../pages/IncomingDetail/IncomingDetail";
import CategoryIncoming from "../pages/Admin/CategoryIncoming/CategoryIncoming";

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
      {
        path: "outgoing",
        element: <Outgoing />,
      },
      {
        path: "outgoingdetail/:id",
        element: <OutgoingDetail />,
      },
      {
        path: "activities-details/:id",
        element: <ActivitiesDetail />,
      },
      {
        path: "incomingdetail/:id",
        element: <IncomingDetail />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  {
    path: "admin",
    element: <AdminRouter />,
    children: [
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
        path: "addlogo",
        element: <AddLogo />,
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
      {
        path: "adminincoming",
        element: <AdminIncoming />,
      },
      {
        path: "adminoutgoing",
        element: <AdminOutgoing />,
      },
      {
        path: "adminservicies",
        element: <AdminServicies />,
      },
      {
        path: "adminserviciescategory",
        element: <AdminServiceCategory />,
      },
      {
        path: "categoryincoming",
        element: <CategoryIncoming />,
      },
    
    ],
  },
];
