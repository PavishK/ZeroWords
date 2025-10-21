import { Calendar, TypeIcon, UserIcon } from "lucide-react";
import CategoryIcon from "../components/CategoryIcon";
import PlaceHolder from "../assets/images/placeholder.jpg";
import { useEffect, useState } from "react";
import PostSkeleton from "../components/PostSkeleton";
import { authApi, serverApi } from '../services/api';
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BlogSkeleton from "../components/BlogSkeleton";

function Posts() {
  const { post_id } = useParams();
  const [ postData, setPostData ] = useState({ category: "", content: "", created_at: "", id: 0, image_url: "", title: "", author:"", email:""});
  const [ relatedData, setRelatedData ] = useState([]);
  const [makeLoading, setMakeLoading] = useState(true);
  const [ loading, setLoading ] = useState(true);

  const filterData = ( datas, filter ) => {
    const related = datas.filter( v => v.category === filter.category && v.id !== filter.id);
    return related;
  }

  const getPostData = async( id ) =>{
    try {
      const res = await authApi.get(`/api/posts/get-post-by-id/${id}/`);
      setPostData(res.data);
      getPostDatas(res.data);
    } catch (error) {
      toast.error("Please login to continue viewing!");
    } finally {
      setTimeout(()=>setMakeLoading(false),1000);
    }
  }


  const getPostDatas = async( filter ) => {
    try {
      const res = await serverApi.get("/api/posts/get-posts/");
      setRelatedData(filterData(res.data, filter ));
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(()=>setLoading(false),800);
    }
  }
  
  useEffect(()=>{
    getPostData(post_id);
  },[post_id]);

  return (
    <div className="min-h-screen w-full bg-bg sm:p-8 p-3 flex flex-col items-center gap-8 overflow-x-scroll">
      {makeLoading ? (
        <PostSkeleton />
      ) : (
        <div className="w-full rounded-2xl shadow-lg sm:p-6 border border-border bg-bg transition-shadow duration-500 hover:shadow-xl">
          
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 ">
              <TypeIcon size={30} className="text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold text-heading">
                {postData.title || "Login to view"}
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start  justify-start sm:justify-between gap-3">
              <div className="flex capitalize items-center gap-1 text-sm sm:text-base font-medium text-text">
                <UserIcon size={22} className="text-primary" />
                <a href={`mailto:${postData.author_email}`}>{postData.author_name}</a>
              </div>
              <div className="flex items-center justify-center gap-1 rounded-full text-sm font-semibold shadow-sm text-primary bg-bg border border-border">
                <CategoryIcon name={postData.category} className={'text-xl'}/>
                {postData.category}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full h-96 rounded-xl overflow-hidden mt-6 shadow-md hover:scale-105 transform transition-transform duration-500 border border-border">
            <img
              src={postData.image_url}
              alt="Post Thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-xl flex items-center gap-2 font-semibold text-sm shadow-md text-primary bg-bg">
              <Calendar size={18} />
              {new Date(postData.created_at).toDateString()}
            </div>
          </div>

          {/* Content */}
          <div className="mt-6 text-text text-base leading-relaxed">
            <p className="first-line:uppercase first-line:tracking-widest first-letter:text-4xl first-letter:font-bold first-letter:text-primary">
              {postData.content}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-y-3 items-start justify-start">
            <h1 className="text-2xl font-bold text-text">Related posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {
                loading 
                ? <BlogSkeleton cards={3} fromDB={false} />
                : relatedData.length > 0
                  ? relatedData.map((val, i) => (<RelatedPosts key={i} item={val}/>))
                  : <div className="text-lg text-center font-medium w-full"> No related posts found!</div>
              }
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Posts;

function RelatedPosts({ item }) {

    const nav = useNavigate();

    const moveToRelated = () => {
      window.scrollTo({ top:0, behavior:'smooth'});
      nav("/blog/posts/" + item.id);
    }

  return (
    <div 
    className="flex border-2 border-border rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer bg-white"
    onClick={moveToRelated}>
      {/* Image */}
      <div className="w-32 sm:w-40 h-48 flex-shrink-0">
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 w-full">
        <div>
          <h2 className="text-lg font-semibold text-heading line-clamp-2">{item.title}</h2>
          <p className="text-text text-sm mt-1 line-clamp-3">{ item.content}</p>
        </div>

        {/* Bottom row: Read more + Category */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-primary font-medium hover:underline" onClick={moveToRelated}>Read more</span>
          <div className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded-full">
            <CategoryIcon name={item.category} className="w-5 h-5 text-text"/>
          </div>
        </div>
      </div>
    </div>
  )
}
