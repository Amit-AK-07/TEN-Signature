import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom"; // import Here to use the location hook
import { motion } from "framer-motion";
import NearbyListings from "./NearbyListings";

const BlogsPostsCard = () => {
  const location = useLocation(); // use the useLocation hook to access the location object
  const { post } = location.state || {}; // safely access the post data from the location state
  console.log(post);

  const blogPostsData = {
    title: post.title || "12 Essential Tips for Leasing a Restaurant Property",
    author: post.category,
    date: "May 2025",
    image: post.image,
    introParagraphs: [
      "Leasing the right property can make or break your restaurant business. Before signing any lease, it’s crucial to consider these 12 key points to ensure your investment is sound and future-proof.",
      "Here’s what every aspiring restaurateur should look out for before locking in a restaurant location.",
    ],
    conclusion: [
      "Choosing the right restaurant property involves more than just a great location. From legal compliance to infrastructure and landlord cooperation, each of these factors plays a crucial role in your restaurant’s success.",
      "At Broki.in, we specialize in helping F&B entrepreneurs secure the right space with the right terms. Reach out to us before you sign anything—we’re here to make your restaurant journey smoother.",
    ],
    sections: [
      {
        title: "1. Location Is Everything",
        content: [
          "The location of your restaurant is perhaps the most significant factor that will influence your success...",
          "You need to assess whether the area attracts foot traffic from your target audience...",
        ],
      },
      {
        title: "2. Understand Your Target Audience",
        content: [
          "Not all zones are suitable for every restaurant concept...",
          "Tools like Zomato and Swiggy insights, along with market research, can help you understand local consumption trends...",
        ],
      },
      {
        title: "3. Verify the Property’s Zoning & Licensing",
        content: [
          "One of the biggest mistakes new restaurant owners make is leasing spaces without ensuring they are zoned and approved for F&B operations.",
          "It’s essential to confirm that the property has all necessary licenses and approvals for restaurant use. This includes commercial zoning clearance, FSSAI eligibility, fire safety No Objection Certificate (NOC), and sanitation approvals.",
          "Without these, you may face delays, penalties, or even shutdowns. We always recommend verifying these details in advance—or better yet, let experts like Broki.in handle your licensing compliance to avoid legal complications.",
        ],
      },
      {
        title: "4. Don’t Overextend on Rent",
        content: [
          "As a rule of thumb, your rent should ideally not exceed 10% to 15% of your projected monthly revenue.",
          "If your rent is disproportionately high, it will eat into your profits and create financial stress, especially during slow periods.",
          "In premium areas, negotiating a revenue-linked rental agreement can help de-risk your business. Understanding the rental trends in your city and negotiating effectively with landlords is a service we provide at Broki.in, ensuring you stay financially sustainable from day one.",
        ],
      },
      {
        title: "5. Review the Lease Agreement Carefully",
        content: [
          "Lease agreements can contain several clauses that might affect your flexibility and finances.",
          "It’s important to carefully review the lock-in period, annual rent escalation terms, exit clauses, permissions for interior modifications, and sub-leasing rights.",
          "We strongly advise getting your lease vetted by a legal professional with experience in commercial F&B leases.",
          "At Broki.in, we help clients avoid traps hidden in fine print and negotiate favorable terms that support long-term growth.",
        ],
      },
      {
        title: "6. Assess Power Load & Utilities",
        content: [
          "A fully functional restaurant requires more than just an attractive space—it needs proper infrastructure.",
          "You must ensure the property has adequate electrical load to support kitchen appliances, refrigeration, air conditioning, and lighting.",
          "Consistent water supply, drainage lines, and provisions for exhaust systems are also essential.",
          "Inadequate utilities can lead to operational delays or increased retrofitting costs.",
          "We assess such technical readiness during the site selection process to ensure you're not left with surprise expenses.",
        ],
      },
      {
        title: "7. Scope for Renovation & Customization",
        content: [
          "Most restaurant properties will need interior and structural modifications to suit your brand identity and kitchen workflow.",
          "From installing kitchen exhaust systems to setting up drainage lines and custom lighting, every detail matters.",
          "Before you sign the lease, ensure that the landlord allows such changes and provides written consent.",
          "It’s also wise to budget for civil work, as design and compliance go hand in hand.",
          "Broki.in assists brands in managing these negotiations and planning compliant design changes.",
        ],
      },
      {
        title: "8. Storage & Back-of-House Requirements",
        content: [
          "While dining areas are the face of the restaurant, the back-of-house operations drive its efficiency.",
          "Many first-time restaurateurs overlook the importance of adequate space for storage, dishwashing, staff restrooms, and waste disposal.",
          "A well-planned backend setup helps maintain hygiene, staff efficiency, and regulatory compliance.",
          "When evaluating a property, factor in the operational workflow and whether the layout can accommodate these essential functions smoothly.",
        ],
      },
      {
        title: "9. Parking & Delivery Access",
        content: [
          "In India’s congested urban spaces, lack of parking can be a major turn-off for dine-in customers.",
          "Additionally, with food delivery becoming a major revenue stream, easy access for Swiggy and Zomato delivery partners is crucial.",
          "Ensure the property is accessible for two-wheelers, has space for quick pickups, and won’t lead to neighborhood disputes due to traffic or noise.",
          "Properties with dedicated loading/unloading zones can be a big plus.",
        ],
      },
      {
        title: "10. Investigate the Property’s History",
        content: [
          "It’s worth knowing whether the property has previously housed a restaurant.",
          "If so, understanding why it shut down can reveal important insights—be it landlord issues, license problems, or customer complaints.",
          "You should also check for pending dues, unresolved legal matters, or structural maintenance issues like water leakage, pest infestation, or poor ventilation.",
          "A detailed property inspection can save you significant headaches down the line.",
        ],
      },
      {
        title: "11. Confirm Building Compliance & Fire Safety",
        content: [
          "Fire safety is a non-negotiable element of any restaurant setup.",
          "The property must meet the building code and be equipped with the appropriate safety infrastructure.",
          "This includes fire exits, smoke detectors, extinguishers, and sprinkler systems.",
          "Obtaining a fire NOC is mandatory in most jurisdictions.",
          "Ignoring fire safety can lead to fines, closures, or worse—so always verify these elements before you invest in the space.",
        ],
      },
      {
        title: "12. Choose a Landlord Who Understands the F&B Business",
        content: [
          "Finally, your relationship with the landlord can significantly affect your restaurant’s day-to-day functioning.",
          "At Brok.in, we help mediate between landlords and restaurateurs to ensure expectations are aligned and disputes are minimized.",
        ],
      },
    ],
  };

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
            <h1 className="text-3xl font-bold">{blogPostsData.title}</h1>
            <p className="text-sm text-gray-500 mt-2 text-start">
              {blogPostsData.author} &nbsp;|&nbsp; May 27, 2025
            </p>
          </div>

          {/* Image */}
          <div className="mb-8 flex justify-center">
            <img
              src={blogPostsData.image}
              alt="Blog"
              className="rounded-lg shadow-md w-full md:w-[650px] object-cover"
            />
          </div>
          <motion.div
            className="prose max-w-none mb-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Intro Paragraphs */}
            <div className="prose max-w-none mb-10">
              {blogPostsData.introParagraphs?.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>
          {/* Sections */}
          <motion.div
            className="prose max-w-none mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {blogPostsData.sections?.map((section, index) => (
              <div key={index} className="mb-8">
                <h3 className="font-semibold text-lg">{section.title}</h3>
                {section.content?.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            ))}
          </motion.div>
          {/* Conclusion */}
          <motion.div
            className="prose max-w-none border-t pt-6 text-gray-700"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {blogPostsData.conclusion?.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>
          {/* Footer Section */}
          {/* <div className="flex justify-evenly"> */}
          <motion.div
            className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-sm text-gray-600 flex items-center gap-4">
              <span className="font-medium">Share this post:</span>
              <div className="flex gap-2 text-gray-700">
                <a href="#">
                  {/* <FaFacebook /> */}
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
            <div className="">
              <button className="bg-[hsla(8,79%,62%,.07)] text-black px-4 py-2 rounded-full text-sm">
                Start A Restaurant
              </button>
              <button className="bg-[hsla(8,79%,62%,.07)] text-black px-4 ml-5 py-2 rounded-full text-sm">
                Cloud Kitchen
              </button>
            </div>
          </motion.div>
        </div>
        <NearbyListings />
      </motion.div>
    </>
  );
};

export default BlogsPostsCard;
