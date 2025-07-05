import { RouterProvider } from "react-router-dom";
import router from "./routes/Index";
import { useAuthInit } from "./hooks/useAuth";

const App = () => {
  // Initialize auth state from localStorage on app start
  useAuthInit();

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
