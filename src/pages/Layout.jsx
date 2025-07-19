import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Menu,
  X,
  Briefcase,
  Megaphone,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
      navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-md text-black font-bold w-60 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="p-4 text-2xl font-bold border-green-700">
          Job Portal
        </div>
        <nav className="p-4 flex flex-col gap-4 text-sm">
          <Link
            to="/"
            title="Go to Home"
            className="hover:text-green-700 flex items-center justify-between px-3 py-2 rounded transition-colors"
          >
            <div className="flex items-center gap-2">
              <Home size={18} /> Home
            </div>
            <ChevronRight size={16} />
          </Link>

          {user.role === "employer" && (
            <Link
              to="/employer"
              title="Post and Manage Your Jobs"
              className="hover:text-green-700 flex items-center justify-between px-3 py-2 rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <Megaphone size={18} /> Post Job
              </div>
              <ChevronRight size={16} />
            </Link>
          )}

          {user.role === "applicant" && (
            <Link
              to="/applicant"
              title="Browse and Apply to Jobs"
              className="hover:text-green-700 flex items-center justify-between px-3 py-2 rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <Briefcase size={18} /> View Jobs
              </div>
              <ChevronRight size={16} />
            </Link>
          )}

          {user.role === "admin" && (
            <Link
              to="/admin"
              title="Access Admin Panel"
              className="hover:text-green-700 flex items-center justify-between px-3 py-2 rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <Settings size={18} /> Admin Panel
              </div>
              <ChevronRight size={16} />
            </Link>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-emerald-600 shadow-md flex justify-between items-center px-6 py-4 border-b">
          <div className="md:hidden">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="text-sm text-gray-700 text-right">
            {/* <div className="font-medium">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div> */}
          </div>

          <button
            onClick={handleLogout}
            className="text-white-500 font-bold hover:text-white-500 text-sm flex items-center gap-1"
            title="Logout"
          >
            <LogOut size={16} /> Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
