import { Edit, PenLineIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';
import { category_names } from './CategoryIcon';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function UpdatePostPopup({ post, updatePost }) {
  const [MotionDiv, setMotionDiv] = useState(null);
  const [togglePopup, setTogglePopup] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    import('framer-motion').then((mod) => setMotionDiv(() => mod.motion.div));
  }, []);

  if (!MotionDiv) return null;

  const handleInputChange = (e) => {
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      toast.loading('Updating post...', { id: 'updatePost' });
      const res = await authApi.put(`/api/posts/update-post-by-id/${post.id}/`, data);
      toast.success(res.data.message, { id: 'updatePost' });
      updatePost(data);
      setTogglePopup(false);
    } catch (error) {
      toast.error('Unable to update post', { id: 'updatePost' });
    } finally {
      setLoading(false);
    }
  };

  const validUrl = () => {
    try {
      new URL(updatedPost.image_url);
      return true;
    } catch {
      return false;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!updatedPost.title || !updatedPost.category || !updatedPost.image_url || !updatedPost.content) {
      toast.error('Please fill out all fields!');
      return;
    }
    if (!validUrl()) {
      toast.error('Invalid image URL!');
      return;
    }
    handleUpdate(updatedPost);
  };

  return (
    <AnimatePresence mode="wait">
      <SkeletonTheme baseColor="#DCCFC0" highlightColor="#A2AF9B">
        {!togglePopup ? (
          <MotionDiv
            key="update-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setTogglePopup(true)}
            className="text-white flex gap-x-0.5 items-center justify-normal font-medium"
          >
            <Edit size={20}/>
            Edit
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
              className="relative bg-bg w-full max-w-[500px] rounded-2xl shadow-xl p-6 border border-border"
            >
              <XIcon
                size={26}
                onClick={() => setTogglePopup(false)}
                className="text-red-600 absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform"
              />

              <h2 className="text-2xl font-semibold text-heading mb-4 text-center">
                Update Post
              </h2>

              <form className="flex flex-col gap-4 mt-2" onSubmit={onSubmitHandler}>
                {/* Title */}
                <div>
                  <label className="block text-text font-medium mb-1">Title</label>
                  {!loading ? (
                    <input
                      type="text"
                      name="title"
                      value={updatedPost.title}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/20 text-text placeholder:text-gray-500"
                      placeholder="Enter title..."
                      disabled={loading}
                    />
                  ) : (
                    <Skeleton height={40} />
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-text font-medium mb-1">Category</label>
                  {!loading ? (
                    <input
                      type="text"
                      name="category"
                      value={updatedPost.category}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/20 text-text placeholder:text-gray-500"
                      placeholder="Enter category name..."
                      disabled={loading}
                      list="category-list"
                    />
                  ) : (
                    <Skeleton height={40} />
                  )}
                  <datalist id="category-list">
                    {category_names.map((v, i) => (
                      <option key={i} value={v} />
                    ))}
                  </datalist>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-text font-medium mb-1">Image URL</label>
                  {!loading ? (
                    <input
                      type="url"
                      name="image_url"
                      value={updatedPost.image_url}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/20 text-text placeholder:text-gray-500"
                      placeholder="Enter image link..."
                      disabled={loading}
                    />
                  ) : (
                    <Skeleton height={40} />
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-text font-medium mb-1">Content</label>
                  {!loading ? (
                    <textarea
                      name="content"
                      value={updatedPost.content}
                      onChange={handleInputChange}
                      className="w-full h-32 p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/20 text-text placeholder:text-gray-500 resize-none"
                      placeholder="Write something..."
                      disabled={loading}
                    />
                  ) : (
                    <Skeleton height={120} />
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white font-medium py-2 rounded-lg hover:bg-heading transition duration-200 disabled:opacity-70"
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </form>
            </MotionDiv>
          </MotionDiv>
        )}
      </SkeletonTheme>
    </AnimatePresence>
  );
}

export default UpdatePostPopup;
