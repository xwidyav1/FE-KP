"use client"

import React from 'react'
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

import { analytics_content } from './analytics_content';
const AnalyticsChart = () => {
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
          <div style={{width: '100%', height:300}}>
            <ResponsiveContainer>
              <LineChart width={1100} height={300} data={analytics_content}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="name"/>
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsChart

