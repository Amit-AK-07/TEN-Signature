import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../lib/config";

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["Cloud Kitchen", "Restaurant", "Take Away"];

  useEffect(() => {
    // Fetch blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/article-list/`
        );
        const blogs = response.data.data || [];
        setBlogPosts(blogs);
        setLatestBlogs(blogs.slice(0, 3)); // Latest 3 blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    // Fetch tags
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/tags-list/`
        );
        setTags(response.data.results || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchBlogs();
    fetchTags();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-6">Loading blogs...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-12 lg:px-24 font-[poppins]">
      <h1 className="text-[20px] sm:text-[30px] font-bold text-gray-900 mb-2">
        Blogs
      </h1>
      <p className="text-sm text-gray-500 mb-6">Home / Blogs</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blog posts */}
        <div className="md:col-span-2">
          {blogPosts.map((post) => {
            const date = new Date(post.created_at);
            const month = date.toLocaleString("default", { month: "short" });
            const day = date.getDate();

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <Link
                  to={`/blogs-posts-card/${post.id}`}
                  state={{ post }}
                  className="block bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="relative">
                    <img
                      src={post.article_image}
                      alt={post.name}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-[-12px] right-4 bg-white text-[#181A20] text-center shadow-md rounded-md px-2 py-1 w-15">
                      <p className="text-[13px] text-gray-500 font-normal">
                        {month}
                      </p>
                      <p className="text-[20px] font-semibold">{day}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-600 mb-1">
                      {post.tags.map((tag) => tag.name).join(", ")}
                    </p>
                    <h2 className="text-[20px] font-bold text-gray-800 mb-1">
                      {post.name}
                    </h2>
                    <p
                      className="text-[14px] text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: post.description.substring(0, 120) + "...",
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Pagination */}
          <div className="flex flex-col items-center mt-2 md:mt-6">
            <div className="flex space-x-2 items-center">
              <button className="w-8 h-8 rounded-full bg-white border text-[#181a20] flex items-center justify-center shadow">
                &lt;
              </button>
              <button className="w-8 h-8 rounded-full bg-emerald-400 text-white font-semibold flex items-center justify-center shadow">
                1
              </button>
              <button className="w-8 h-8 rounded-full bg-white border text-[#181a20] flex items-center justify-center shadow">
                &gt;
              </button>
            </div>
            <p className="text-sm text-[#181a20] mt-2">
              {blogPosts.length} blogs found
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Categories (STATIC) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <h3 className="text-md font-semibold text-[#181a20] mb-2">
              Categories
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              {categories.map((cat, idx) => (
                <li
                  className="hover:text-[#26c4a0] cursor-pointer text-[#181a20]"
                  key={idx}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Latest Blogs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Latest Blogs
            </h3>
            <ul className="space-y-4">
              {latestBlogs.map((blog) => {
                const formattedDate = new Date(
                  blog.created_at
                ).toLocaleDateString("en-US", {
                  weekday: "short", // Tue
                  month: "long", // July
                  day: "numeric", // 1
                  year: "numeric", // 2025
                });
                return (
                  <li key={blog.id}>
                    <Link
                      to={`/blogs-posts-card/${blog.id}`}
                      state={{ post: blog }}
                      className="flex space-x-3 text-sm no-underline text-inherit"
                    >
                      <img
                        src={blog.article_image}
                        alt={blog.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-[#181a20] line-clamp-2 hover:text-[#26c4a0]">
                          {blog.name}
                        </p>
                        <p className="text-gray-500 font-[system-ui] text-xs">
                          {formattedDate}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Popular Tags */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <h3 className="text-[15px] font-semibold text-[#181a20] mb-2">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-[14px] font-[system-ui] border px-3 py-1 rounded-full text-gray-700"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

export default Blogs;