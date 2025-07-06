import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import DefaultLayout from "../components/DefaultLayout/DefaultLayout"
import AdminLayout from "../components/AdminLayout/AdminLayout";
import HomePage from "../pages/HomePage/HomePage";
import AboutUsPage from "../pages/UserPage/AboutUsPage/AboutUsPage"
import ServicePage from "../pages/UserPage/ServicePage/ServicePage";
import ServiceListPage from "../pages/UserPage/ServicePage/ServiceListPage"
import ServiceDetailPage from "../pages/UserPage/ServicePage/ServiceDetailPage";
import NewsPage from "../pages/UserPage/NewsPage/NewsPage";
import NewsListPage from "../pages/UserPage/NewsPage/NewsListPage";
import NewsDetailPage from "../pages/UserPage/NewsPage/NewsDetailPage";
import MedicalStaffPage from "../pages/UserPage/MedicalStaffPage/MedicalStaffPage";
import MedicalStaffDetailPage from "../pages/UserPage/MedicalStaffPage/MedicalStaffDetailPage";
import ContactPage from "../pages/UserPage/ContactPage/ContactPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SearchPage from "../pages/SearchPage/SearchPage";
import AuthenticationPage from "../pages/AuthenticationPage/AuthenticationPage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

import Dashboard from "../pages/AdminPage/Dashboard";
import Doctor from "../pages/AdminPage/Doctor";
import Patient from "../pages/AdminPage/Patient";
import Department from "../pages/AdminPage/Department"
import Service from "../pages/AdminPage/Service"
import ServiceType from "../pages/AdminPage/ServiceType"
import NewsType from "../pages/AdminPage/NewsType"
import News from "../pages/AdminPage/News"
import Position from "../pages/AdminPage/Position"
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about-us" element={<AboutUsPage/>} />
          <Route path="service" element={<ServicePage/>} />
          <Route path="service/:serviceTypeId" element={<ServiceListPage/>} />
          <Route path="service/:serviceTypeId/:serviceId" element={<ServiceDetailPage/>} />
          <Route path="news" element={<NewsPage/>} />
          <Route path="news/:newsTypeId" element={<NewsListPage/>} />
          <Route path="news/:newsTypeId/:newsId" element={<NewsDetailPage/>} />
          <Route path="medical-staff" element={<MedicalStaffPage/>} />
          <Route path="medical-staff/:doctorId" element={<MedicalStaffDetailPage/>} />
          <Route path="contact-us" element={<ContactPage/>} />
          <Route path="profile" element={<ProfilePage/>} />
           <Route path="/search" element={<SearchPage />} />
          {/* Có thể thêm các route khác ở đây */}
        </Route> 
        <Route path="/admin" 
          element= {
            <ProtectedRoute allowedRoles={['admin']}><AdminLayout/> </ProtectedRoute> 
          }>
            <Route path="patients" element={<Patient/>} />
            <Route path="departments" element={<Department/>} />
            <Route path="services" element={<Service/>} />
            <Route path="service-types" element={<ServiceType/>} />
            <Route path="news" element={<News />}/>
            <Route path="news-types" element={<NewsType/>} />
            <Route path="positions" element={<Position/>} />
            <Route path="doctors" element={<Doctor/>} />
            <Route index path="dashboard" element={<Dashboard/>} />
          </Route>
        <Route path="/authentication" element={<AuthenticationPage/>}/>
        
        {/* Bạn có thể thêm các route khác sau */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;