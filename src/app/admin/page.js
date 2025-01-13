"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardCard from "@/components/admin/dashboard/DashboardCard";
import { Newspaper, Images, File, Files } from "lucide-react";
import BeritaTerbaru from "@/components/admin/dashboard/BeritaTerbaru";
import AnalyticsChart from "@/components/admin/dashboard/AnalyticsChart";

export default function Home() {
  const [statistics, setStatistics] = useState({
    articles_count: 0,
    galleries_count: 0,
    documents_count: 0,
    berita_count: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("http://localhost:8000/statistics"); // Replace with your backend API URL
        setStatistics({
          articles_count: response.data.articles_count || 0,
          galleries_count: response.data.galleries_count || 0,
          documents_count: response.data.documents_count || 0,
          berita_count: response.data.berita_count || 0,
        });
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setError("Failed to fetch statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading spinner or text while data is being fetched
  }

  if (error) {
    return (
      <div>
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()} // Simple retry mechanism
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-[3vw]">
      {/* Dashboard Cards */}
      <div className="flex flex-col md:flex-row justify-center gap-[5vw] pt-[1vw]">
        <DashboardCard
          title="Berita"
          count={statistics.berita_count}
          icon={<Newspaper className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Artikel"
          count={statistics.articles_count}
          icon={<Files className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Galeri"
          count={statistics.galleries_count}
          icon={<Images className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Dokumen"
          count={statistics.documents_count}
          icon={<File className="text-slate-500" size={72} />}
        />
      </div>

      {/* Analytics Chart */}
      <AnalyticsChart />

      {/* Berita Terbaru Section */}
      <BeritaTerbaru limit={5} className="mt-[3vw]" />
    </div>
  );
}
