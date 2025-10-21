import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Mail, FileText } from 'lucide-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { authApi } from '../services/api';
import toast from 'react-hot-toast';

function Profile() {
  const { user_id } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const res = await authApi.get('/api/auth/profile-data/');
      setUser(res.data.data);
    } catch (error) {
      toast.error('Please login to continue');
      nav('/auth/login');
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [user_id]);

  return (
    <SkeletonTheme baseColor="#DCCFC0" highlightColor="#A2AF9B">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-bg text-text">
        <div className="max-w-md w-full rounded-2xl shadow-lg p-8 text-center relative overflow-hidden bg-secondary border border-border">
          {/* Decorative Circle */}
          <div className="absolute w-40 animate-pulse h-40 rounded-full opacity-20 -top-10 -right-10 bg-primary"></div>

          {/* User Logo or Skeleton */}
          {loading ? (
            <div className="flex justify-center mb-4">
              <Skeleton circle width={96} height={96} />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl font-bold mb-4 shadow-md bg-primary text-bg">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Username */}
          <h1 className="text-2xl font-semibold mb-2 text-heading">
            {loading ? <Skeleton width={120} /> : user.username}
          </h1>

          {/* Email */}
          <div className="flex items-center justify-center space-x-2 mb-6 text-lg">
            {loading ? (
              <Skeleton width={180} height={14} />
            ) : (
              <>
                <Mail size={16} />
                <span>{user.email}</span>
              </>
            )}
          </div>

          {/* Divider */}
          {!loading && <div className="w-16 h-[2px] mx-auto mb-6 bg-primary"></div>}

          {/* Stats Card */}
          <div className="p-4 rounded-xl shadow-inner flex flex-col items-center justify-center mt-4 bg-bg border border-border hover:scale-105 transition-transform">
            {loading ? (
              <Skeleton width={50} height={50} />
            ) : (
              <div onClick={()=>nav('/blog/my-posts/'+user_id)} className='cursor-pointer'>
                <FileText size={28} className="mb-2 text-heading" />
                <h2 className="text-xl font-bold text-heading">{user.postCount}</h2>
                <p className="text-sm">Posts</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default Profile;
