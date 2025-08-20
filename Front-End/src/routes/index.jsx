import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../components/Login/Login";
import RegisterPage from "../components/Register/Register";
import AdmissionForm from "../components/AdmissionForm/AdmissionForm";
import ProfileResearch from "../components/ProfileResearch/ProfileResearch";
import ConsultingForm from "../components/ConsultingForm/ConsultingForm";
import AdminPage from "../pages/AdminPage";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import { Users } from "lucide-react";
import Admissions from "../components/Admin/Admissions";
import Introduction from "../components/Introduction/Introduction";
import News from "../components/News/News";
import Contact from "../components/Contact/Contact";
import Majors from "../components/Majors/Majors";
import ConsultantHomePage from "../pages/ConsultantPage";
import ConsultingBriefCase from "../components/BriefCase/ConsultingBriefCase";
import User from "../components/Admin/Dashboard/ManageUser/User";
import ConsultingApplicationForm from "../components/BriefCase/ConsultingApplicationForm"

const AppRouter = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/admission-form", element: <AdmissionForm /> },
  { path: "/lookup-profile", element: <ProfileResearch /> },
  { path: "/consulting", element: <ConsultingForm /> },

  { path: "/consultant", element: <ConsultantHomePage /> },
  { path: "/consultingBriefCase", element: <ConsultingBriefCase /> },
  { path: "/admissionBriefCase", element: <ConsultingApplicationForm /> },


  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <User /> },
      { path: "admissions", element: <Admissions /> },
    ],
  },
  { path: "/introduction", element: <Introduction /> },
  { path: "/news", element: <News /> },
  { path: "/contact", element: <Contact /> },
  { path: "/majors", element: <Majors /> },
]);

export default AppRouter;
