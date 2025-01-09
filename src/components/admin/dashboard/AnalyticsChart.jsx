"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
} from 'recharts';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AnalyticsChart = () => {
  const [analyticsData, setAnalyticsData] = useState([]); // State untuk data analitik
  const [loading, setLoading] = useState(true); // State untuk loading status
  const [error, setError] = useState(null); // State untuk menangkap error

  useEffect(() => {
    // Fungsi untuk fetch data dari API
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/visitor-analytics');
        const data = response.data;

        // Transformasi data agar cocok dengan struktur `recharts`
        const formattedData = data.labels.map((label, index) => ({
          name: label, // Bulan (Jan, Feb, ...)
          uv: data.data[index], // Jumlah pengunjung
        }));

        setAnalyticsData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            Analisis Pengunjung Website
          </CardTitle>
          <CardDescription>
            Pengunjung Setiap Bulan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart width={1100} height={300} data={analyticsData}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsChart;
