import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Ticket, Activity, CheckCircle2, Users, Calendar, Clock, BookOpen, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    newLeads: 0,
    appointments: 0,
    pendingAppointments: 0,
    faqCount: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ticketsRes, leadsRes, apptRes, kbRes] = await Promise.all([
          api.get('/tickets'),
          api.get('/leads'),
          api.get('/appointments'),
          api.get('/kb')
        ]);
        
        const tickets = ticketsRes.data;
        const appts = apptRes.data;
        
        // Generate chart data for the last 7 days
        const last7Days = Array.from({length: 7}, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          return d;
        });

        const dynamicChartData = last7Days.map(date => {
          const dateString = date.toISOString().split('T')[0];
          const count = tickets.filter(t => {
            if (!t.createdAt) return false;
            return new Date(t.createdAt).toISOString().split('T')[0] === dateString;
          }).length;
          
          return {
            name: date.toLocaleDateString(undefined, { weekday: 'short' }),
            tickets: count
          };
        });

        setChartData(dynamicChartData);

        setStats({
          totalTickets: tickets.length,
          openTickets: tickets.filter(t => t.status === 'Open').length,
          resolvedTickets: tickets.filter(t => t.status === 'Resolved').length,
          newLeads: leadsRes.data.length,
          appointments: appts.length,
          pendingAppointments: appts.filter(a => a.status === 'Pending').length,
          faqCount: kbRes.data.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, colorClass, bgClass }) => (
    <div className={`p-6 rounded-2xl shadow-sm border border-slate-100 ${bgClass} transition-all duration-300 hover:shadow-md hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm font-semibold mb-1">{title}</p>
          <h3 className={`text-3xl font-extrabold ${colorClass}`}>{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorClass.replace('text-', 'bg-').replace('600', '100')} ${colorClass}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 mt-2">Welcome back! Here's what's happening with your platform today.</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm border border-blue-100">
          <TrendingUp size={16} />
          <span>Systems Optimal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Tickets" value={stats.totalTickets} icon={Ticket} colorClass="text-slate-600" bgClass="bg-white" />
        <StatCard title="Open Tickets" value={stats.openTickets} icon={Activity} colorClass="text-blue-600" bgClass="bg-blue-50/50" />
        <StatCard title="Resolved Tickets" value={stats.resolvedTickets} icon={CheckCircle2} colorClass="text-emerald-600" bgClass="bg-emerald-50/50" />
        <StatCard title="Total Leads" value={stats.newLeads} icon={Users} colorClass="text-amber-600" bgClass="bg-amber-50/50" />
        <StatCard title="Total Appointments" value={stats.appointments} icon={Calendar} colorClass="text-purple-600" bgClass="bg-purple-50/50" />
        <StatCard title="Pending Appointments" value={stats.pendingAppointments} icon={Clock} colorClass="text-indigo-600" bgClass="bg-indigo-50/50" />
        <StatCard title="Knowledge Base" value={stats.faqCount} icon={BookOpen} colorClass="text-teal-600" bgClass="bg-teal-50/50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[300px] flex flex-col">
           <div className="mb-6 flex justify-between items-center">
             <h3 className="text-lg font-bold text-slate-800">Weekly Ticket Volume</h3>
             <select className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 7 Days</option>
                <option>This Month</option>
             </select>
           </div>
           <div className="flex-1 w-full h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                 />
                 <Area type="monotone" dataKey="tickets" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTickets)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute -right-6 -top-6 opacity-20">
            <CheckCircle2 size={120} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Great Job!</h3>
          <p className="text-white/90 mb-6">You've resolved {stats.resolvedTickets} tickets so far. Keep up the excellent support!</p>
          <button className="bg-white text-indigo-600 hover:bg-slate-50 font-bold py-2 px-5 rounded-xl transition w-max shadow-sm">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
