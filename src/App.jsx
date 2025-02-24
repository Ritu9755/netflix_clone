import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/home/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import Footer from "./components/footer.jsx";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./Pages/WatchPage.jsx";
import SearchPage from "./Pages/SearchPage.jsx";
import SearchHistoryPage from "./Pages/SearchHistoryPage.jsx";
import NotFoundPage from "./Pages/404.jsx";
import Footer from './components/footer.jsx'; 


function App() {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Simulate authentication check using localStorage
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsCheckingAuth(false);
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center item bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={user ? <SearchHistoryPage /> : <Navigate to="/login" />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
