import React, { useEffect, useState } from 'react';
import { Trash2Icon, XIcon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';

function DeletePopup({ deleteUserPosts, postId }) {
  const [MotionDiv, setMotionDiv] = useState(null);
  const [togglePopup, setTogglePopup] = useState(false);

  useEffect(() => {
    import('framer-motion').then((mod) => setMotionDiv(() => mod.motion.div));
  }, []);

  if (!MotionDiv) return null;

  const handleDelete = async() => {
    try {
        toast.loading("Deleting...", { id:"deletePost"});
        const res = await authApi.delete(`/api/posts/delete-post-by-id/${postId}/`);
        toast.success(res.data, { id:"deletePost"});
    } catch (error) {
        toast.loading(error.response.data, { id:"deletePost"});
    } finally {
        deleteUserPosts(postId);
        setTogglePopup(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
        {!togglePopup ? (
          <MotionDiv
            key="delete-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setTogglePopup(true)}
            className="text-white cursor-pointer"
          >
            <Trash2Icon size={26} />
          </MotionDiv>
        ) : (
          <MotionDiv
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <MotionDiv
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="relative z-[999] bg-white w-full max-w-[400px] rounded-2xl shadow-xl p-6 border border-gray-300"
            >
              <XIcon
                size={24}
                onClick={() => setTogglePopup(false)}
                className="text-gray-600 absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform"
              />

              <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">
                Delete Post
              </h2>

              <p className="text-center text-gray-700 mb-6">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>

              <div className="flex justify-center">
                <button
                  onClick={handleDelete}
                  className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
    </AnimatePresence>
  );
}

export default DeletePopup;
