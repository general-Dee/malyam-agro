"use client";
import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";

interface Lead {
  id: string;
  fullName: string;
  whatsapp: string;
  location: string;
  animalType: string;
  order: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterAnimal, setFilterAnimal] = useState("All");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const q = query(collection(db, "livestockLeads"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const data: Lead[] = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            fullName: docData.fullName || docData.name || "–",
            whatsapp: docData.whatsapp || docData.phone || "–",
            location: docData.location || "–",
            animalType: docData.animalType || "–",
            order: docData.order || "–",
            createdAt: docData.createdAt,
          };
        });

        setLeads(data);
        setFilteredLeads(data);
        toast.success("Leads loaded successfully!");
      } catch (error) {
        console.error("Error fetching leads:", error);
        toast.error("Failed to load leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // 🔍 Filter leads by search + dropdown
  useEffect(() => {
    let temp = leads;

    // Filter by search
    if (search) {
      const lowerSearch = search.toLowerCase();
      temp = temp.filter(
        (lead) =>
          lead.fullName.toLowerCase().includes(lowerSearch) ||
          lead.whatsapp.toLowerCase().includes(lowerSearch) ||
          lead.location.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter by animal type
    if (filterAnimal !== "All") {
      temp = temp.filter((lead) => lead.animalType === filterAnimal);
    }

    setFilteredLeads(temp);
  }, [search, filterAnimal, leads]);

  const csvData = filteredLeads.map((lead) => ({
    FullName: lead.fullName,
    WhatsApp: lead.whatsapp,
    Location: lead.location,
    AnimalType: lead.animalType,
    Order: lead.order,
    Date: lead.createdAt?.seconds
      ? new Date(lead.createdAt.seconds * 1000).toLocaleString()
      : "N/A",
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard — Livestock Leads
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading leads...</p>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            {/* Text search */}
            <input
              type="text"
              placeholder="Search by Name, WhatsApp, Location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#8CC63F] w-full md:w-1/2"
            />

            {/* Animal type dropdown */}
            <select
              value={filterAnimal}
              onChange={(e) => setFilterAnimal(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#8CC63F]"
            >
              <option value="All">All Animal Types</option>
              <option value="Cow">Cow</option>
              <option value="Goat">Goat</option>
              <option value="Ram">Ram</option>
            </select>

            {/* CSV export */}
            <CSVLink
              data={csvData}
              filename={`livestock-leads-${new Date().toISOString()}.csv`}
              className="bg-[#8CC63F] text-white px-4 py-2 rounded hover:bg-[#7AB034] transition-colors text-center"
            >
              Export CSV
            </CSVLink>
          </div>

          {/* Leads table */}
          {filteredLeads.length === 0 ? (
            <p className="text-center text-gray-500">No leads match your filters.</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              <table className="w-full text-sm">
                <thead className="bg-[#8CC63F] text-white">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Full Name</th>
                    <th className="p-3">WhatsApp</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Animal Type</th>
                    <th className="p-3">Order</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, index) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-100">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{lead.fullName}</td>
                      <td className="p-3">{lead.whatsapp}</td>
                      <td className="p-3">{lead.location}</td>
                      <td className="p-3">{lead.animalType}</td>
                      <td className="p-3">{lead.order}</td>
                      <td className="p-3">
                        {lead.createdAt?.seconds
                          ? new Date(lead.createdAt.seconds * 1000).toLocaleString()
                          : "–"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
