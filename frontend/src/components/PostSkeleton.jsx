import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Calendar, TypeIcon, UserIcon } from "lucide-react";
import CategoryIcon from "../components/CategoryIcon";

function PostSkeleton() {
  const [MotionDiv, setMotionDiv] = useState();

  useEffect(() => {
    import('framer-motion').then(( mod ) => setMotionDiv(mod.motion.div));
  }, []);

  if(!MotionDiv) return;
  return (
    <SkeletonTheme baseColor="#DCCFC0" highlightColor="#A2AF9B">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full rounded-2xl shadow-lg p-6 border border-border bg-bg transition-shadow duration-500 hover:shadow-xl"
        >
          {/* Header */}
          <div className="flex flex-col  gap-4">
            <div className="w-full">
            <div className="flex items-center gap-3">
              <TypeIcon size={30} className="text-primary" />
              <Skeleton width={400} height={40} />
            </div>
              <div className="sm:hidden">
                <Skeleton width={350} height={40} count={3}/>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start  justify-start sm:justify-between gap-3">
              <div className="flex items-center gap-1 text-sm sm:text-base font-medium text-text">
                <UserIcon size={22} className="text-primary" />
                <Skeleton width={100} height={20} />
              </div>
              <div className="flex items-center justify-center gap-1 rounded-full text-sm font-semibold shadow-sm text-primary bg-bg border border-border">
                <Skeleton circle={true} height={20} width={20} />
                <Skeleton width={60} height={20} />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full h-96 rounded-xl overflow-hidden mt-6 shadow-md border border-border">
            <Skeleton className="w-full h-full" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-xl flex items-center gap-2 font-semibold text-sm shadow-md text-primary bg-bg">
              <Calendar size={18} />
              <Skeleton width={60} height={16} />
            </div>
          </div>

          {/* Content */}
          <div className="mt-6 text-text text-base leading-relaxed space-y-2">
            <Skeleton count={4} />
          </div>
        </MotionDiv>
    </SkeletonTheme>
  );
}

export default PostSkeleton;
