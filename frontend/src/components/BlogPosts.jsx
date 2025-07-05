import { monthNames } from "../lib/Constant";
import { Link } from "react-router-dom";

const BlogPosts = ({ post }) => {
  // 🗓 Parse date from API
  const postDate = post.created_at ? new Date(post.created_at) : new Date();
  const day = postDate.getDate();
  const month = monthNames[postDate.getMonth()];

  return (
    <article className="relative rounded-xl w-full max-w-sm mx-auto cursor-pointer">
      <Link to={`/blogs-posts-card/${post.id}`} state={{ post }}>
        <div className="overflow-hidden rounded-xl ">
          <img
            src={post.article_image || "/default-blog.jpg"} // ✅ Use API field + fallback
            alt={`${post.tags[0]?.name || "Blog"} image`}
            className="img-animattion transition-all duration-400 ease-in-out rounded-tl-xl rounded-bl-xl w-full object-cover"
            height="220"
            width="400"
          />
        </div>
        <div className="absolute bottom-4 right-4 text-right">
          <div className="absolute top-[-124px] right-4 text-center bg-white rounded-xl w-[70px] h-[70px] pt-[10px] leading-[25px] shadow-[0_6px_15px_rgba(64,79,104,0.05)]">
            <p className="text-xs font-normal leading-none">{month}</p>
            <p className="text-xl font-semibold text-gray-600">{day}</p>
          </div>
        </div>
        <div className="px-4 pt-4 pb-6">
          <p className="text-[13px] text-gray-500 mb-1">
            {post.tags[0]?.name || "General"} {/* ✅ Safe category */}
          </p>
          <h3 className="font-semibold text-[15px] leading-snug">
            {post.name || "Untitled Blog"} {/* ✅ Safe title */}
          </h3>
        </div>
      </Link>
    </article>
  );
};

export default BlogPosts;