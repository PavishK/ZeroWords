import { useNavigate } from 'react-router-dom';
import BlogSkeleton from '../components/BlogSkeleton';
import PlaceHolder from '../assets/images/placeholder.jpg';
import { useEffect, useState } from 'react';
import { serverApi } from '../services/api';
import { useAuth } from '../context/auth';
import CategoryIcon from '../components/CategoryIcon';
import { PenLineIcon } from 'lucide-react';
import CreatePost from '../components/CreatePost';

function Blogs() {
  const navigate = useNavigate();
  const { user, loading:userLoaded } = useAuth();
  const [ posts, setPosts ] = useState([]);
  const [loading, setLoading] = useState(true);

  const latestPost = (date) =>{
    const postDate = new Date(date).toDateString();
    const today = new Date().toDateString();
    return postDate === today;
  }

  const getPostDatas = async() => {
    try {
      const res = await serverApi.get("/api/posts/get-posts/");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(()=>setLoading(false),3000);
    }
  }

  const addNewPostIntoPosts = (data) => {
    setPosts([ data, ...posts]);
  }
  useEffect(() => {
    getPostDatas();
  }, [ ]);

  return (
    <div className="relative w-screen mt-6 p-6 flex justify-center bg-bg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {loading ? (
          <BlogSkeleton cards={3} fromDB={true} />
        ) : posts.length > 0
        ? (
          posts.map((item, index) => (
            <div
              key={index}
              className="flex border-2 border-border rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer bg-white"
              onClick={() => navigate("/blog/posts/" + item.id)}
            >
              {/* Image */}
              <div className=" relative w-32 sm:w-40 h-48 flex-shrink-0">
                <img
                  src={ item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                { latestPost(item.created_at) &&
                 <div className={`absolute left-1 animate-pulse text-white font-semibold  top-1 bg-green-600 text-xs p-1 rounded-lg`}>
                  <p>New</p>
                </div>}

                { user?.id === item.author &&
                 <div className='absolute left-1 text-text font-medium bottom-1 bg-bg text-xs p-1 rounded-sm'>
                  <p>Posted by you</p>
                </div>}

              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-4 w-full">
                <div>
                  <h2 className="text-lg font-semibold text-heading line-clamp-2">{item.title}</h2>
                  <p className="text-text text-sm mt-1 line-clamp-3">{item.content}</p>
                </div>

                {/* Bottom row: Read more + Category */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-primary font-medium hover:underline">Read more</span>
                  <div className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded-full" title={ item.category}>
                    <CategoryIcon name={item.category} className="w-5 h-5 text-text"/>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) 
        :<div className='text-xl font-medium'>
          <h1>No posts has been published yet!</h1>
        </div> 
        }
      </div>
      
      {/* Create Post */}
      { user && <CreatePost addNewPost={addNewPostIntoPosts}/>}

    </div>
  );
}

export default Blogs;
