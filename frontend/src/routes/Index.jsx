import Home from "../pages/Home";
import Payment from "../pages/Payment";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Blogs from "../pages/Blogs";
import Listings from "../pages/Listings";
import OurTeam from "../pages/OurTeam";
import Services from "../pages/Services";
import ContactUs from "../pages/ContactUs";
import { createBrowserRouter } from "react-router-dom";
import ProductDetail from "../pages/ProductDetail";
import BlogsPostsCard from "../components/BlogsPostsCard";
import BlogPosts from "../components/BlogPosts";
import MyBookings from "../pages/dashboard/MyBookings";
import MyProperties from "../pages/dashboard/MyProperties";
import AddProperty from "../pages/dashboard/AddProperty";
import ServicesDetail from "../components/ServicesPage/ServicesDetail";
import ServicesBooking from "../pages/ServicesBooking";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/listings",
        element: <Listings />,
      },
      {
        path: "/our-team",
        element: <OurTeam />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/services/:serviceId",
        element: <ServicesDetail />,
      },
      {
        path: "/service-booking/:serviceId",
        element: <ServicesBooking />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      // {
      //   path: "/blogs-posts-card/:blogId",
      //   element: <Blogs />,
      // },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/productdetail",
        element: <ProductDetail />,
      },
      {
        path: "/property/:id",
        element: <ProductDetail />,
      },
      {
        path: "/blogs-post",
        element: <BlogPosts />,
      },
      {
        path: "/blogs-posts-card/:id",
        element: <BlogsPostsCard />,
      },
      {
        path: "/bookings",
        element: <MyBookings />,
      },
      {
        path: "/properties",
        element: <MyProperties />,
      },
      {
        path: "/add-property",
        element: <AddProperty />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/services-detail",
        element: <ServicesDetail />,
      },
    ],
  },
]);

export default router;
