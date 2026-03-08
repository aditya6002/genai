import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected
        children={
          <main>
            <div className="">
              {" "}
              <h1>Welcome to the protected route!</h1>
              <h2>Home Page</h2>
            </div>
            <a href="http://localhost:8080/api/auth/logout">Logout</a>
          </main>
        }
      />
    ),
  },
]);
