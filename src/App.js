import LoginPage from "./Views/LoginPage/LoginPage";
import HomePage from "./Views/Homepage/HomePage";
import SignUpPage from "./Views/SignUpPage/UserSignUpPage";
import AdminSignUp from "./Views/SignUpPage/AdminSignUp";
import Dashboard from "./Views/UserPage/UserDashboard";
import AdminDashboard from "./Views/AdminPage/AdminDashboard";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PageNotFound from "./CommonComponents/PageNotFound";
import UserApprovals, {
  UserApprovalLoader,
} from "./Views/AdminPage/ApproveUsers";
import AdminLogin from "./Views/LoginPage/AdminLogin";
import NewAdminSignUps from "./Views/AdminPage/NewAdminSignUps";
import DonationReqTab from "./Views/AdminPage/Components/DonationRequestTabs";
import { useSnackbar } from "./CommonComponents/SnackBarContext";
import { Snackbar as SnackbarMui, SnackbarContent } from "@mui/material";
import ReportTab from "./Views/TestsPage/Components/ReportTabs";
import CampaignTabs from "./Views/AdminPage/Components/CampaignTabs";
import ComplaintList from "./Views/AdminPage/Complains";
import MessageList from "./Views/AdminPage/Messages";
import MessageTabs from "./Views/AdminPage/Components/MessageTabs";
import DonorsTabs from "./Views/AdminPage/Components/DonorsTabs";
import CustomMap from "./Views/Map/DonorMap";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="userlogin" element={<LoginPage />} />
      <Route path="adminlogin" element={<AdminLogin />} />
      <Route path="userdashboard" element={<Dashboard />}>
        
      </Route>

      <Route path="admindashboard" element={<AdminDashboard />}>
        <Route
          path="approvedonor"
          loader={UserApprovalLoader}
          element={<DonorsTabs />}
        />
        <Route
          path="newadmins"
          loader={UserApprovalLoader}
          element={<NewAdminSignUps />}
        />

        <Route path="campaign" element={<CampaignTabs />} />

        <Route path="complaints" element={<ComplaintList />} />
        <Route path="donationrequests" element={<DonationReqTab />} />
        <Route path="inbox" element={<MessageTabs/>} />

        <Route
          path="uploadtests"
          element={<ReportTab />}
        />
      </Route>
      <Route path="adminsignup" element={<AdminSignUp />} />
      <Route path="*" element={<PageNotFound error="Page Not Found 404" />} />
    </Route>
  )
);

function App() {
  const { open, message, closeSnackbar, icon, color } = useSnackbar();

  return (
    <>
      <RouterProvider router={router} />

      <SnackbarMui
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={closeSnackbar}
      >
        <SnackbarContent
          style={{
            backgroundColor: color, // Customize colors
          }}
          message={
            <span>
              {icon}
              {message}
            </span>
          }
        />
      </SnackbarMui>
    </>
  );
}

export default App;