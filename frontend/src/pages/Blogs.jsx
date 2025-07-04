import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title:
      "Things to Keep in Mind Before Leasing a Restaurant Property in India",
    category: "Start A Restaurant",
    description:
      "Leasing the right property is one of the most crucial decisions when starting a restaurant business ...",
    image:
      "https://www.broki.in/_next/image?url=https%3A%2F%2Fadmin.broki.in%2Fstorage%2F617%2FSales-2-1240x720.jpg&w=1920&q=75",
    date: "May 22",
    year: "2025",
  },
  {
    id: 2,
    title: "7 Essential Steps to Successfully Set Up a Cloud Kitchen in India",
    category: "Cloud Kitchen",
    description:
      "Leasing the right property is one of the most crucial decisions when starting a restaurant business ...",
    image:
      "https://www.broki.in/_next/image?url=https%3A%2F%2Fadmin.broki.in%2Fstorage%2F1263%2FThings-to-keep-in-mind-before-leasing-a-restaurant-property-in-India.jpg&w=828&q=75",
    date: "Feb 11",
    year: "2025",
  },
  {
    id: 3,
    title: "7 Essential Steps to Successfully Set Up a Cloud Kitchen in India",
    category: "Cloud Kitchen",
    description:
      "Leasing the right property is one of the most crucial decisions when starting a restaurant business ...",
    image:
      "https://www.broki.in/_next/image?url=https%3A%2F%2Fadmin.broki.in%2Fstorage%2F618%2FCloud-kitchen-1240x720.png&w=1920&q=75",
    date: "Feb 15",
    year: "2024",
  },
];

const latestBlogs = blogPosts;
const categories = ["Cloud Kitchen", "Restaurant", "Take Away"];
const tags = [
  "Online Food Delivery",
  "Sell A Restaurant",
  "Start A Restaurant",
  "Cloud Kitchen",
];

const Blogs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-12 lg:px-24 font-[poppins]">
      <h1 className="text-[20px] sm:text-[30px] font-bold text-gray-900 mb-2">
        Blogs
      </h1>
      <p className="text-sm text-gray-500 mb-6">Home / Blogs</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blog posts */}
        <div className="md:col-span-2">
          {blogPosts.map((post) => (
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
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-[-12px] right-4 bg-white text-[#181A20] text-center shadow-md rounded-md px-2 py-1 w-15">
                    <p className="text-[13px] text-gray-500 font-normal">
                      {post.date.split(" ")[0]}
                    </p>{" "}
                    {/* Month */}
                    <p className="text-[20px] font-semibold">
                      {post.date.split(" ")[1]}
                    </p>{" "}
                    {/* Date */}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-600 mb-1">{post.category}</p>
                  <h2 className="text-[20px] font-bold text-gray-800 mb-1">
                    {post.title}
                  </h2>
                  <p className="text-[14px] text-gray-600">
                    {post.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}

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
            <p className="text-sm text-[#181a20] mt-2">1–10 of 120 available</p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Categories */}
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
              {latestBlogs.map((blog) => (
                <li key={blog.id}>
                  <Link
                    to={`/blogs-posts-card/${blog.id}`}
                    state={{ post: blog }}
                    className="flex space-x-3 text-sm no-underline text-inherit"
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[#181a20] line-clamp-2 hover:text-[#26c4a0]">
                        {blog.title}
                      </p>
                      <p className="text-gray-500 font-[system-ui] text-xs">
                        {blog.date} {blog.year}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tags */}
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
            <div className="flex flex-wrap gap-2 ">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[14px] font-[system-ui] border px-3 py-1 rounded-full text-gray-700"
                >
                  {tag}
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
