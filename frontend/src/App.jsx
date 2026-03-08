import { RouterProvider } from "react-router";
// import "./App.css";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
