import LoginPage from './Views/LoginPage/LoginPage';
import HomePage from './Views/Homepage/HomePage';
import SignUpPage from './Views/SignUpPage/UserSignUpPage';
import AdminSignUp from './Views/SignUpPage/AdminSignUp';
import Dashboard from './Views/UserPage/UserDashboard';
import AdminDashboard from './Views/AdminPage/AdminDashboard';
import TestPage from './Views/TestsPage/BloodTest'
import { Route,RouterProvider,Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import UserPage from './Views/AdminPage/AdminDashboard';
import Email from './Views/UserPage/SendingEmails';
import QR from './QRCode/QRCode.js'
import PageNotFound from './CommonComponents/PageNotFound';
import UserApprovals, { UserApprovalLoader } from './Views/AdminPage/ApproveUsers';


const router = createBrowserRouter(

  createRoutesFromElements(

    <Route>
          <Route path="/" element={ <HomePage />} />
          <Route path="signup" element={<SignUpPage/>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="userdashboard" element={<Dashboard />} >
              
          </Route>
          <Route path="admindashboard" element={<AdminDashboard />} >
           <Route path="approvedonor" loader={UserApprovalLoader} element={<UserApprovals />}/>
          </Route>
          <Route path="adminsignup" element={<AdminSignUp />} />
          <Route path="*" element={<PageNotFound error="Page Not Found 404"/>} />

    </Route>
  

        
  )

)




function App() {
  return (
   
      <RouterProvider router={router}/>
  );
}

export default App;
