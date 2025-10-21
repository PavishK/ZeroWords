import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authApi } from '../services/api';
import PlaceHolder from '../assets/images/placeholder.jpg';
import BlogSkeleton from '../components/BlogSkeleton';
import CategoryIcon from '../components/CategoryIcon';
import CreatePost from '../components/CreatePost';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import DeletePopup from '../components/DeletePopup';
import UpdatePostPopup from '../components/UpdatePostPopup';

export default function MyPosts() {

  const { user_id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();
  const [ userPosts, setUserPosts ] =  useState([]);
  const [ loading, setLoading ] = useState(true);
  
  const addNewPostIntoPosts = (data) => {
    setUserPosts([ data, ...userPosts]);
  }

  const fetchPosts = async(id) => {
    try {
      const res = await authApi.get(`/api/posts/get-posts-by-user-id/${id}/`);
      setUserPosts(res.data);
    } catch (error) {
      console.log(error);
      if(error.status == 404){
        setUserPosts([]);
      } else {
        toast.error("Please login to coninue!");
        setTimeout(()=>nav('/auth/login', { replace:true }),300);
      }
    } finally {
      setTimeout(()=>setLoading(false),800);
    }
  }

  const updateUserPost = ( data ) => {
    const index = userPosts.findIndex(v => v.id === data.id);
    const updatedData = [...userPosts];
    updatedData[index] = data;
    setUserPosts(updatedData);
  }

  const deleteUserPost = ( post_id ) => {
    setUserPosts(
      userPosts.filter((v)=>v.id!=post_id)
    );
  } 

  useEffect(()=>{

    if(user_id){
      fetchPosts(user_id);
    }

  },[])
  return (
   <div className="relative w-screen mt-6 p-6 flex justify-center bg-bg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {loading ? (
          <BlogSkeleton cards={userPosts.length} fromDB={true} />
        ) : userPosts.length > 0
        ? (
          userPosts.map((item, index) => (
            <div
              key={index}
              className="relative flex border-2 border-border rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer bg-white">
              <div className='absolute top-0 right-0  w-fit h-fit rounded-bl-xl bg-red-600 p-1 text-white flex items-center justify-center'>
                <DeletePopup deleteUserPosts={deleteUserPost} postId={item.id}/>
              </div>

              {/* Image */}
              <div className=" relative w-32 sm:w-40 h-48 flex-shrink-0">
                <img
                  src={ item.image_url }
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-4 w-full">

                <div>
                  <h2 className="text-lg font-semibold text-heading line-clamp-2">{item.title}</h2>
                  <p className="text-text text-sm mt-1 line-clamp-3">{item.content}</p>
                </div>

                {/* Bottom row: Read more + Category */}
                <div className="flex items-center justify-between mt-4">
                  <div className=' w-fit p-1.5 rounded-xl bg-green-600'>
                  <UpdatePostPopup post={item} updatePost={updateUserPost} />
                  </div>
                  <div className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded-full" title={ item.category}>
                    <CategoryIcon name={item.category} className="w-5 h-5 text-text"/>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) 
        :<div className='text-xl font-medium'>
          <h1>Create your first post now!</h1>
        </div> 
        }
      </div>
      
      {/* Create Post */}
      { user && <CreatePost addNewPost={addNewPostIntoPosts}/>}

    </div>
  )
}
