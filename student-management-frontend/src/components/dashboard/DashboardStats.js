import React, { useEffect, useState } from 'react';
import "../../styles/Dashboard.css";

export default function DashboardStats() {
    const [stats, setStats] = useState({ students: 0, teachers: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        async function fetchStats(){
        try{
            const token = localStorage.getItem('authToken');
            const res = await fetch('/api/admin/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if(!res.ok) throw new Error('Failed to fetch stats');
            const data = await res.json();
            setStats(data);
        } catch(err){
            console.error(err);
            setError(err.message);
        } finally{
            setLoading(false);
        }
        }
        fetchStats();
    }, []);
    
    
    if(loading) return <div>Loading…</div>;
    if(error) return <div>Error: {error}</div>;
    
    
    return (
        <div className="grid grid-cols-2 gap-4">
        <div className="card p-4">Students: <strong>{stats.students}</strong></div>
        <div className="card p-4">Teachers: <strong>{stats.teachers}</strong></div>
        </div>
    );
}