import { useEffect, useState } from "react";
import axios from "axios";
import { url, resumeurl } from "../../mainurl";
import { toast } from "react-toastify";
import Layout from "./Layout";
import {
  Users,
  Briefcase,
  FileText,
  Mail,
  MapPin,
  Eye,
  UserRoundCheck,
  IndianRupee,
  Calendar,
  ShieldCheck
} from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [uRes, jRes, aRes] = await Promise.all([
        axios.get(`${url}/admin/users`, config),
        axios.get(`${url}/admin/jobs`, config),
        axios.get(`${url}/admin/applications`, config),
      ]);
      setUsers(uRes.data);
      setJobs(jRes.data);
      setApplications(aRes.data);
    } catch (err) {
      toast.error("Failed to fetch admin data");
    }
  };

  return (
    <Layout>
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          Admin Dashboard
        </h1>

        {/* USERS */}

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users size={20} /> Users
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-4 bg-white shadow rounded border flex flex-col gap-1"
              >
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <UserRoundCheck size={16} /> {user.name}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <ShieldCheck size={14} /> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Mail size={14} /> {user.email}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* JOBS */}

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Briefcase size={20} /> Jobs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="p-4 bg-white shadow rounded border flex flex-col gap-1"
              >
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <MapPin size={14} /> {job.location}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <IndianRupee size={16} /> <span className="font-medium">Salary:</span> From ₹{job.salary}
                </p>

                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Calendar size={16} /> <span className="font-medium">Expires:</span>{" "}
                  {new Date(job.expiryDate).toLocaleDateString()}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Posted by: <strong>{job.postedBy?.name || "N/A"}</strong>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* APPLICATIONS */}
        
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText size={20} /> Applications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="p-4 bg-white shadow rounded border flex flex-col gap-1"
              >
                <h3 className="font-medium text-base">
                  {app.applicant?.name || "N/A"}
                </h3>
                <p className="text-sm text-gray-600">
                  Cover Letter: <strong>{app.job?.title || "N/A"}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Applied to: <strong>{app.coverLetter || "N/A"}</strong>
                </p>
                <a
                  href={`${resumeurl}/uploads/${app.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm flex items-center gap-1 mt-1 hover:text-blue-800"
                >
                  <Eye size={14} className="me-1" /> View Resume
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
