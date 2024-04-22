import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Editor from "./Editor";
import Header from "./components/Header";
import Post from "./pages/post/Post";
import Auth from "./pages/auth/Auth";
import { Toaster } from "sonner";
import ErrB from "./ErrorBoundary";
import Home from "./pages/home/Home";
import fourOFour from "./pages/404";
import { fb } from "./firebaseConfig";

const App = () => {
  fb;
  const router = createBrowserRouter([
    {
      element: <ErrB />,
      children: [
        {
          path: "/editor",
          Component: Editor,
        },
        {
          path: "/editor/:id",
          Component: Editor,
        },
        {
          path: "/post/:id",
          Component: Post,
        },
        {
          path: "/auth",
          Component: Auth,
        },
        {
          path: "/",
          Component: Home,
        },
        { path: "*", Component: fourOFour },
      ],
    },
  ]);

  return (
    <>
      <Toaster richColors />
      <Header />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
