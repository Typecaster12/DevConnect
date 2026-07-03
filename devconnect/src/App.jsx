import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./AppLayout/AppLayout"
import ErrorPage from "./components/ui/ErrorPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "/",
    //     element: <Home />
    //   }
    // ]
  }
])


const App = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;