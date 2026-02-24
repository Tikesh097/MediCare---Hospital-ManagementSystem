import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Hospital } from 'lucide-react';

const NotFound = () => {
  const { user } = useAuth();
  const dashboardMap = { admin: '/admin', doctor: '/doctor', patient: '/patient' };
  const homeLink = user ? dashboardMap[user.role] || '/' : '/login';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <Hospital className="h-16 w-16 text-blue-200 mx-auto mb-6" />
        <h1 className="text-8xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link to={homeLink} className="btn-primary">
          {user ? 'Back to Dashboard' : 'Go to Login'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
