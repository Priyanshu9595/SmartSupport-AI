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
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [rawTickets, setRawTickets] = useState([]);

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
        
        setRawTickets(tickets);

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

  useEffect(() => {
    if (!rawTickets.length) return;

    let dateArray = [];
    if (timeRange === 'Last 7 Days') {
      dateArray = Array.from({length: 7}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d;
      });
    } else if (timeRange === 'This Month') {
      dateArray = Array.from({length: 30}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return d;
      });
    }

    const dynamicChartData = dateArray.map(date => {
      const dateString = date.toISOString().split('T')[0];
      const count = rawTickets.filter(t => {
        if (!t.createdAt) return false;
        return new Date(t.createdAt).toISOString().split('T')[0] === dateString;
      }).length;
      
      return {
        name: timeRange === 'Last 7 Days' 
          ? date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short' })
          : date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short' }),
        tickets: count
      };
    });

    setChartData(dynamicChartData);
  }, [timeRange, rawTickets]);

  const StatCard = ({ title, value, icon: Icon, iconColorClass, bgClass }) => (
    <div className={`p-4 rounded-xl shadow-sm border border-border bg-surface transition-all duration-150 hover:shadow-md hover:border-border-strong`}>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-2">
        <div>
          <p className="text-[11px] text-text-secondary font-medium mb-1 whitespace-nowrap">{title}</p>
          <h3 className="text-[24px] font-semibold text-text-primary leading-tight">{value}</h3>
        </div>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${bgClass} ${iconColorClass}`}>
          <Icon size={16} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary tracking-tight">Dashboard Overview</h2>
          <p className="text-[14px] text-text-secondary mt-1">Welcome back! Here's what's happening with your platform today.</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-lg font-medium text-[13px] border border-transparent">
          <TrendingUp size={16} />
          <span>Systems Optimal</span>
        </div>
      </div>

      {/* Stats Cards - Static Single Row on Large Screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-8">
        <StatCard title="Total Tickets" value={stats.totalTickets} icon={Ticket} iconColorClass="text-brand-600" bgClass="bg-brand-50" />
        <StatCard title="Open Tickets" value={stats.openTickets} icon={Activity} iconColorClass="text-warning-text" bgClass="bg-warning-bg" />
        <StatCard title="Resolved Tickets" value={stats.resolvedTickets} icon={CheckCircle2} iconColorClass="text-success-text" bgClass="bg-success-bg" />
        <StatCard title="Total Leads" value={stats.newLeads} icon={Users} iconColorClass="text-neutral-text" bgClass="bg-neutral-bg" />
        <StatCard title="Total Appointments" value={stats.appointments} icon={Calendar} iconColorClass="text-brand-600" bgClass="bg-brand-50" />
        <StatCard title="Pending Appointments" value={stats.pendingAppointments} icon={Clock} iconColorClass="text-warning-text" bgClass="bg-warning-bg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface p-6 rounded-xl shadow-sm border border-border min-h-[300px] flex flex-col">
           <div className="mb-6 flex justify-between items-center">
             <h3 className="text-lg font-semibold text-text-primary">Weekly Ticket Volume</h3>
             <select 
               value={timeRange} 
               onChange={(e) => setTimeRange(e.target.value)}
               className="text-[13px] py-1 h-8 bg-surface border border-border-strong text-text-primary rounded-lg focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12"
             >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="This Month">This Month</option>
             </select>
           </div>
           <div className="flex-1 w-full h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E7EC" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#98A2B3', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#98A2B3', fontSize: 12}} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E4E7EC', color: '#101828', borderRadius: '8px', padding: '8px 12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                   itemStyle={{ color: '#2563EB', fontWeight: '500' }}
                   cursor={{ stroke: '#D0D5DD', strokeWidth: 1, strokeDasharray: '4 4' }}
                 />
                 <Area type="monotone" dataKey="tickets" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorTickets)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-surface p-8 rounded-xl shadow-sm border border-border relative overflow-hidden flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-success-bg text-success-text rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Great Job!</h3>
          <p className="text-text-secondary text-[14px] mb-8">You've resolved {stats.resolvedTickets} tickets so far. Keep up the excellent support!</p>
          <button className="bg-brand-50 text-brand-600 hover:bg-subtle text-[14px] font-medium py-2.5 px-6 rounded-lg transition-colors border border-transparent w-full">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
