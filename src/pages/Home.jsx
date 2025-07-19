import React from "react";
import Layout from "./Layout";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;

  return (
    <Layout>
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.name || "Guest"}!
      </h1>

      <p className="text-lg mb-6">
        This is a mini job portal where employers can post jobs and applicants can apply.
      </p>

    </div>
    </Layout>
  );
}
