import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home"; // Ensure correct file path and naming
import Error404Page from "./pages/Error404Page";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Sessions from "./pages/TraningSessions";
import ExercisePage from "./pages/ExercisePage";
import LoggedInLayout from "./layouts/LoggedInLayout";
import LoggedInHome from "./pages/LoggedInHome";
import Admin from "./pages/admin/Admin";
import StartYourSession from "./pages/StartYourSession";
import AdminExe from "./pages/admin/AdminExe";
import AdminLayout from "./layouts/AdminLayout";
import AdminUser from "./pages/admin/AdminUser";

import { Navigate } from "react-router-dom";
import facade from "./util/apiFacade";

const ProtectedRoute = ({ children, neededRole }) => {
  const isAuthenticated = () => facade.getToken() !== null;

  const hasAccess = () => {
    if (!neededRole) return isAuthenticated();
    return facade.hasUserAccess(neededRole, isAuthenticated());
  };

  return hasAccess() ? children : <Navigate to="/loginPage" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Error404Page />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        path="/loggedInHome"
        element={
          <ProtectedRoute>
            <LoggedInLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<LoggedInHome />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="exercises" element={<ExercisePage />} />
        <Route path="startsession" element={<StartYourSession />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute neededRole={"ADMIN"}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Admin />} />
        <Route path="adminExe" element={<AdminExe />} />
        <Route path="adminUser" element={<AdminUser />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
