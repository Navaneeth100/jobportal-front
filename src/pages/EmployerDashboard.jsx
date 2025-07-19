"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../mainurl";
import Swal from 'sweetalert2';
import Layout from "./Layout";

export default function EmployerDashboard() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    skills: "",
    expiryDate: "",
  });
  const [jobs, setJobs] = useState([]);
  const [modal, setModal] = useState({ add: false, edit: false });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${url}/jobs/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/jobs/`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Job posted successfully!");
      setForm({ title: "", description: "", salary: "", location: "", skills: "", expiryDate: "" });
      fetchJobs();
      setModal({ add: false });
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  const [jobId, setjobId] = useState(null)

  const handleEdit = async (e) => {
    e.preventDefault();
    try {

      const updatedData = {
        title: form.title,
        description: form.description,
        salary: form.salary,
        location: form.location,
        skills: form.skills,
        expiryDate: form.expiryDate,
      };


      await axios.put(`${url}/jobs/${jobId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Job posted successfully!");
      setForm({ title: "", description: "", salary: "", location: "", skills: "", expiryDate: "" });
      fetchJobs();
      setModal({ edit: false });
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This job will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#20d120ff',
      confirmButtonText: 'Delete',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${url}/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Job deleted");
        fetchJobs();
      } catch (err) {
        toast.error("Failed to delete job");
      }
    }
  };


  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Employer Dashboard</h1>
          <button onClick={() => setModal({ add: true })} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Post New Job
          </button>
        </div>

        {/* Modal */}
        {modal.add && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-lg relative shadow-xl">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setModal({ add: false })}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" placeholder="Job Title" className="p-2 border rounded" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <input name="salary" placeholder="Salary/hr" className="p-2 border rounded" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} required />
                <input name="location" placeholder="Location" className="p-2 border rounded" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
                <input name="skills" placeholder="Skills (comma separated)" className="p-2 border rounded" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} required />
                <input name="expiryDate" type="date" className="p-2 border rounded" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} required />
                <textarea name="description" placeholder="Job Description" rows="3" className="p-2 border rounded col-span-full" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                <button type="submit" className="bg-emerald-600 text-white py-2 rounded hover:bg-green-700 col-span-full">
                  Post Job
                </button>
              </form>
            </div>
          </div>
        )}

        {modal.edit && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-lg relative shadow-xl">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setModal({ edit: false })}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Edit Job</h2>
              <form onSubmit={handleEdit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" placeholder="Job Title" className="p-2 border rounded" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <input name="salary" placeholder="Salary/hr" className="p-2 border rounded" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} required />
                <input name="location" placeholder="Location" className="p-2 border rounded" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
                <input name="skills" placeholder="Skills (comma separated)" className="p-2 border rounded" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} required />
                <input name="expiryDate" type="date" className="p-2 border rounded" value={form.expiryDate ? form.expiryDate.slice(0, 10) : ""} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} required />
                <textarea name="description" placeholder="Job Description" rows="3" className="p-2 border rounded col-span-full" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                <button type="submit" className="bg-emerald-600 text-white py-2 rounded hover:bg-green-700 col-span-full">
                  Post Job
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Job List */}

        <h2 className="text-xl font-semibold mt-10 mb-4">Your Posted Jobs</h2>
        {jobs?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                <div className="flex flex-wrap gap-2 text-xs mb-2">
                  {job.skills && job.skills.map((s, i) => (
                    <span
                      key={i}
                      className="inline-block bg-slate-200 text-white-800 font-medium px-2 py-1 rounded-full border border-grey-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm font-medium text-gray-800">From ₹{job.salary} a month</div>
                  <button onClick={() => { setModal({ edit: true }), setjobId(job._id), setForm(job) }} className="text-green-500 text-sm">Edit</button>
                  <button onClick={() => handleDelete(job._id)} className="text-red-500 text-sm">Delete</button>
                </div>
                <div className="text-xs text-gray-500 mt-1">{job.location}</div>
                <div className="text-xs text-gray-500 mt-1">Created at <strong>{new Date(job.createdAt).toLocaleDateString("en-GB")}</strong></div>
                <div className="text-xs text-gray-500 mt-1">Expires at <strong>{new Date(job.expiryDate).toLocaleDateString("en-GB")}</strong></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>No jobs created yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
