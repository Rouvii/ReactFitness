
  
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home'; // Ensure correct file path and naming
import Error404Page from './pages/Error404Page';
import LoginPage from "./pages/LoginPage"



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} /> 
      <Route path="*" element={<Error404Page
       />} />
    </Route>

  return (
    <>
  <LoginPage />
    <RouterProvider router={router} />;
    </>

  )
);



export default App
