import React from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardCharts = () => {
  const appointmentsData = [
    { date: "Mon", count: 10 },
    { date: "Tue", count: 12 },
    { date: "Wed", count: 9 },
    { date: "Thu", count: 14 },
    { date: "Fri", count: 8 },
    { date: "Sat", count: 15 },
  ];

  const patientTypes = [
    { name: "New", value: 300 },
    { name: "Returning", value: 200 },
  ];

  const treatmentTypes = [
    { name: "Cleaning", value: 150 },
    { name: "Filling", value: 80 },
    { name: "Root Canal", value: 50 },
    { name: "Extraction", value: 30 },
  ];

  const appointmentStatus = [
    { name: "Completed", value: 70 },
    { name: "Pending", value: 30 },
  ];

  const revenueByTreatment = [
    { treatment: "Cleaning", revenue: 1200 },
    { treatment: "Filling", revenue: 800 },
    { treatment: "Root Canal", revenue: 600 },
    { treatment: "Extraction", revenue: 400 },
  ];

  const doctorPerformance = [
    { doctor: "Dr. A", score: 95 },
    { doctor: "Dr. B", score: 89 },
    { doctor: "Dr. C", score: 78 },
  ];

  const peakHours = [
    { hour: "9AM", visits: 8 },
    { hour: "11AM", visits: 10 },
    { hour: "1PM", visits: 7 },
    { hour: "3PM", visits: 12 },
    { hour: "5PM", visits: 6 },
  ];

  const demographics = [
    { group: "Male", value: 120 },
    { group: "Female", value: 150 },
    { group: "Other", value: 30 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
      {/* 1. Appointments Over Time */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Appointments Over Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={appointmentsData}>
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2. New vs Returning Patients */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">New vs Returning Patients</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={patientTypes}
              dataKey="value"
              nameKey="name"
              outerRadius={60}
              label
            >
              {patientTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Treatment Type Distribution */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Treatment Type Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={treatmentTypes}>
            <Bar dataKey="value" fill="#82ca9d" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 4. Appointment Status */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Appointment Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={appointmentStatus} dataKey="value" outerRadius={60} label>
              {appointmentStatus.map((entry, index) => (
                <Cell key={`status-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 5. Revenue by Treatment */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Revenue by Treatment</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueByTreatment}>
            <Bar dataKey="revenue" fill="#8884d8" />
            <XAxis dataKey="treatment" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 6. Doctor Performance */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Doctor Performance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={doctorPerformance}>
            <Line type="monotone" dataKey="score" stroke="#ff7300" />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="doctor" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 7. Peak Hours Heatmap (Bar style) */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Peak Visit Hours</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={peakHours}>
            <Bar dataKey="visits" fill="#00C49F" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 8. Patient Demographics */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Patient Demographics</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={demographics} dataKey="value" outerRadius={60} label>
              {demographics.map((entry, index) => (
                <Cell key={`demo-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
