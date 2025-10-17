import { PenLineIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { authApi } from '../services/api';
import { useAuth } from '../context/auth';
import { category_names } from './CategoryIcon';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function CreatePost({ addNewPost }) {
  const { user } = useAuth();
  const [MotionDiv, setMotionDiv] = useState(null);
  const [togglePopup, setTogglePopup] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    category: '',
    image_url: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const createPost = async (data) => {
    try {
      setLoading(true);
      toast.loading('Creating post...', { id: 'newPost' });
      const res = await authApi.post('/api/posts/save-post/', data);
      toast.success(res.data.message, { id: 'newPost' });
      addNewPost({...data, created_at: Date.now(), id:res.data.post_id});
      setTogglePopup(false);
    } catch (error) {
      console.log(error);
      toast.error('Unable to create post', { id: 'newPost' });
    } finally {
      setLoading(false);
    }
  };

  const validUrl = () => {
    try {
      new URL(newPost.image_url);
      return true;
    } catch {
      return false;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!newPost.title || !newPost.category || !newPost.image_url || !newPost.content) {
      toast.error('Please fill out all fields!');
      return;
    }

    if (!validUrl()) {
      toast.error('Invalid image URL!');
      return;
    }

    createPost({ ...newPost, author: user.id });
  };

  useEffect(() => {
    import('framer-motion').then((mod) => setMotionDiv(() => mod.motion.div));
  }, []);

  if (!MotionDiv) return null;

  return (
    <AnimatePresence mode="wait">
      <SkeletonTheme baseColor="#DCCFC0" highlightColor="#A2AF9B">

      {!togglePopup ? (
        <MotionDiv
          key="create-btn"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.2, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setTogglePopup(true)}
          className="fixed hover:scale-110 cursor-pointer bottom-4 right-4 text-text bg-secondary border-text border-2 p-3 flex items-center justify-center rounded-full shadow-md"
        >
          <PenLineIcon size={26} />
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
            <h2 className="text-2xl font-semibold text-heading mb-4 text-center">
              Create Post
            </h2>

            <XIcon
              size={26}
              onClick={() => setTogglePopup(false)}
              className="text-red-600 absolute right-3 top-3 cursor-pointer hover:scale-110 transition-transform"
            />

            <form className="flex flex-col gap-4 mt-2" onSubmit={onSubmitHandler}>
              {/* Title */}
              <div>
                <label className="block text-text font-medium mb-1">Title</label>
                { !loading
                ? <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/20 text-text placeholder:text-gray-500"
                  placeholder="Enter title..."
                  disabled={loading}
                />
                : <Skeleton height={40}/>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-text font-medium mb-1">
                  Category
                </label>

                { !loading
                ? <input
                  type="text"
                  name="category"
                  value={newPost.category}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/20 text-text placeholder:text-gray-500"
                  placeholder="Enter category name..."
                  disabled={loading}
                  list="category-list"
                />
                : <Skeleton height={40}/>}

                <datalist id="category-list">
                  {category_names.map((v, i) => (
                    <option key={i} value={v} />
                  ))}
                </datalist>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-text font-medium mb-1">
                  Image URL
                </label>
                { !loading
                ? <input
                  type="url"
                  name="image_url"
                  value={newPost.image_url}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/20 text-text placeholder:text-gray-500"
                  placeholder="Enter image link..."
                  disabled={loading}
                />
                : <Skeleton height={40}/>}
              </div>

              {/* Content */}
              <div>
                <label className="block text-text font-medium mb-1">
                  Content
                </label>
                { !loading 
                ? <textarea
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  className="w-full h-32 p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-secondary/20 text-text placeholder:text-gray-500 resize-none"
                  placeholder="Write something..."
                  disabled={loading}
                ></textarea>
                : <Skeleton height={120}/>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white font-medium py-2 rounded-lg hover:bg-heading transition duration-200 disabled:opacity-70"
              >
                {loading ? 'Posting...' : 'Post'}
              </button>
            </form>
          </MotionDiv>
        </MotionDiv>
      )}
      </SkeletonTheme>
    </AnimatePresence>
  );
}

export default CreatePost;
