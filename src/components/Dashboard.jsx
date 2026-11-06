import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import RecipeGenerator from './RecipeGenerator';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto 20px auto', backgroundColor: '#ffffff', padding: '16px 24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>AI Recipe App 🍲</h1>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: '#ef4444', color: '#ffffff', fontWeight: '600', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
        >
          Log Out
        </button>
      </header>

      <main>
        <RecipeGenerator />
      </main>
    </div>
  );
};

export default Dashboard;