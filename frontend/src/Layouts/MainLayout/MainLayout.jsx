import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import ScrollToTop from "../../hooks/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] ">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
