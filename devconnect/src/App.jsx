import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout/AppLayout";
import ErrorPage from "./components/ui/ErrorPage";
import FeedLayout from "./components/feedLayout/FeedLayout";
import Login from "./pages/login";
import Logou from "./pages/logou";
import SearchPage from "./pages/SearchPage";
import ProfileDetails from "./components/LeftSideBar/ProfileCard/ProfileDetails";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/logout",
    element: <Logou />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <FeedLayout />,
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "/userProfile", //view profile
        element: <ProfileDetails />
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
