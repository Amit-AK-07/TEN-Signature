import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NearbyListings from "./NearbyListings";
import axios from "axios";

const BlogsPostsCard = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [post, setPost] = useState(null);

  // Fetch blog details when component loads
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://broki-clone-ui.onrender.com/api/article-detail/${id}/`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };
    fetchPost();
  }, [id]);

  // Format date to: Tue, July 1 2025
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!post) {
    return <p className="text-center py-10">Loading blog post...</p>;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto py-12 px-4 md:px-6">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{post.name}</h1>
            <p className="text-sm text-gray-500 mt-2 text-start">
              {formatDate(post.created_at)}
            </p>
          </div>

          {/* Image */}
          <div className="mb-8 flex justify-center">
            <img
              src={post.article_image}
              alt={post.name}
              className="rounded-lg shadow-md w-full md:w-[650px] object-cover"
            />
          </div>

          {/* Description */}
          <motion.div
            className="prose max-w-none mb-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: post.description || "<p>No content available.</p>",
              }}
            />
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Social Icons */}
            <div className="text-sm text-gray-600 flex items-center gap-4">
              <span className="font-medium">Share this post:</span>
              <div className="flex gap-2 text-gray-700">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} className="text-sm ml-2" />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-sm ml-2"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="text-sm ml-2"
                  />
                </a>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-[hsla(8,79%,62%,.07)] text-black px-4 py-2 rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        <NearbyListings />
      </motion.div>
    </>
  );
};

export default BlogsPostsCard;