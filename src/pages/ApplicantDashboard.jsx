"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { url } from "../../mainurl";
import Layout from "./Layout";

export default function ApplicantDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [modal, setModal] = useState({ apply: false });
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ coverLetter: "", resume: null });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${url}/jobs/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${url}/applications/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJobs();
      fetchApplications();
    }
  }, [token]);

  const handleApply = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("jobId", selectedJob._id);
    formData.append("coverLetter", form.coverLetter);
    formData.append("resume", form.resume);

    try {
      await axios.post(`${url}/applications/apply`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Application submitted!");
      setModal({ apply: false });
      setForm({ coverLetter: "", resume: null });
      fetchApplications();
    } catch (err) {
      toast.error("Failed to submit application");
    }
  };

  return (
    <Layout>
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Jobs for you</h1>
      {jobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div key={job._id} className="p-4 bg-white shadow rounded">
              <h2 className="text-lg font-bold">{job.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{job.description}</p>
              <p className="text-sm text-gray-500 mt-1">Location: {job.location}</p>
              <div className="flex gap-2 flex-wrap text-xs mt-2">
                {job.skills?.map((skill, i) => (
                  <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  setSelectedJob(job);
                  setModal({ apply: true });
                }}
                className="mt-4 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No jobs available.</p>
      )}

      <h2 className="text-xl font-semibold mt-12 mb-4">My jobs {applications.length > 0 && `( ${applications.length} )`}</h2>
      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="p-4 bg-white shadow rounded">
              <div className="font-semibold">{app.job?.title}</div>
              <div className="text-sm text-gray-500">Status: Applied</div>
              <div className="text-sm text-gray-600 mt-1">Applied on: {new Date(app.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No applications submitted yet.</p>
      )}

      {/* Apply Modal */}
      {modal.apply && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              onClick={() => setModal({ apply: false })}
              className="absolute top-2 right-2 text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Apply for {selectedJob.title}</h2>
            <form onSubmit={handleApply} className="space-y-4">
              <textarea
                rows="4"
                placeholder="Cover Letter"
                className="w-full p-2 border rounded"
                value={form.coverLetter}
                onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                required
              />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full"
                onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
                required
              />
              <button type="submit" className="bg-emerald-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
}
