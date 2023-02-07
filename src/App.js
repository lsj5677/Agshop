import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
