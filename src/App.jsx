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
import Sessions from "./pages/Sessions";
import ExercisePage from "./pages/ExercisePage";
import LoggedInLayout from "./layouts/LoggedInLayout";
import LoggedInHome from "./pages/LoggedInHome";

import StartYourSession from "./pages/StartYourSession";

import { Navigate } from "react-router-dom";
import facade from "./util/apiFacade";


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    return facade.getToken() !== null; // Brug getToken til at tjekke autentificering
  };

  return isAuthenticated() ? children : <Navigate to="/loginPage" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Error404Page />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/exercises" element={<ExercisePage />} />
        <Route path="/startsession" element={<StartYourSession />} />
      </Route>

      
      <Route path="/loggedInHome" element={
        <ProtectedRoute>
        <LoggedInLayout />
        </ProtectedRoute>
        }>
        <Route index element={<LoggedInHome />} />
        
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
