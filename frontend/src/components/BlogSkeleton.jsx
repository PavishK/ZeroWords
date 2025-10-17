import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { serverApi } from '../services/api.js';

function BlogSkeleton({ cards, fromDB = false }) {
  const [MotionDiv, setMotionDiv] = useState(null);
  const [ count, setCount ] = useState(6);

  const get_Count = async() =>{
    try {
      const res = await serverApi.get("/api/posts/get-posts-count/");
      setCount(res.data);
    } catch (error) {
      setCount(cards);
    }
  }

  useEffect(() => {
    import('framer-motion').then((mod) => setMotionDiv(mod.motion.div));
    
    if(fromDB)
      get_Count();
    else
      setCount(cards)

  }, []);

  if (!MotionDiv) return null;

  return (
    Array.from({ length: count }).map((_, index) => (
        <MotionDiv
          key={index}
          initial={{ opacity: 0}}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4}}
        >
          <SkeletonTheme baseColor="#DCCFC0" highlightColor="#A2AF9B">
            <div className="flex border-2 border-border rounded-xl shadow-md transition-shadow duration-300 overflow-hidden bg-white">
              {/* Image Skeleton */}
              <div className="w-40 h-40 flex-shrink-0">
                <Skeleton className="w-full h-full" />
              </div>

              {/* Content Skeleton */}
              <div className="flex flex-col justify-between p-4 w-full">
                <div>
                  <Skeleton height={20} width={`80%`} className="mb-2" />
                  <Skeleton height={14} count={3} className="mt-1" />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <Skeleton height={16} width={60} />
                  <div className="flex items-center gap-2">
                    <Skeleton circle={true} height={20} width={20} />
                  </div>
                </div>
              </div>
            </div>
          </SkeletonTheme>
        </MotionDiv>
      ))  
  );
}

export default BlogSkeleton;
