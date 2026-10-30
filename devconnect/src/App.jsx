import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import AppLayout from "./AppLayout/AppLayout";
import ErrorPage from "./components/ui/ErrorPage";
import FeedLayout from "./components/feedLayout/FeedLayout";
import Login from "./pages/login";
import Logou from "./pages/logou";
import SearchPage from "./pages/SearchPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProfileDetails from "./components/LeftSideBar/ProfileCard/ProfileDetails";
import { AuthContext } from "./context/AuthContext";

//wait for the saved login session check before choosing where to send the user;
const AuthLoading = () => (
  <main className="grid min-h-screen place-items-center bg-background text-muted-foreground">
    <p className="text-sm">Checking your session...</p>
  </main>
);

//only allow logged-in users to open the feed and its related pages;
const RequireAuth = ({ children }) => {
  const { isUserAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <AuthLoading />;
  if (!isUserAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

//send users who already have a valid session straight back to their feed;
const GuestOnly = ({ children }) => {
  const { isUserAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <AuthLoading />;
  if (isUserAuthenticated) return <Navigate to="/" replace />;

  return children;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestOnly>
        <Login />
      </GuestOnly>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/logout",
    element: (
      <RequireAuth>
        <Logou />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
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
      },
      {
        path: "/userProfile/:id",
        element: <UserProfilePage />
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
