import SliderOne from "../assets/images/sliderone.webp";
import SliderTwo from "../assets/images/slidertwo.webp";
import SliderThree from "../assets/images/sliderthree.webp";
import SliderFour from "../assets/images/sliderfour.webp";
import SliderFive from "../assets/images/sliderfive.webp";
import SliderSix from "../assets/images/slidersix.webp";
import SliderSeven from "../assets/images/sliderseven.webp";
import SliderEight from "../assets/images/slidereight.webp";
import SliderNine from "../assets/images/slidernine.webp";
import SliderTen from "../assets/images/sliderten.webp";
import PropertyOne from "../assets/images/propertyone.webp";
import PropertyTwo from "../assets/images/propertytwo.jpeg";
import PropertyThree from "../assets/images/propertythree.png";
import BlogOne from "../assets/images/blogone.webp";
import BlogTwo from "../assets/images/blogtwo.webp";
import BlogThree from "../assets/images/blogthree.webp";
import DownloadImg from "../assets/images/download-img.webp";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
  faApple,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";

import {
  faAngleRight,
  faCogs,
  faFlask,
  faKey,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Listings", to: "/listings", icon: faAngleRight },
  { label: "Our Team", to: "/our-team" },
  { label: "Services", to: "/services", icon: faAngleRight },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact Us", to: "/contact-us" },
];

export const tabs = [
  { id: "real-estate", label: "Real Estate" },
  { id: "services", label: "Services" },
];

export const cities = ["Select a city", "New York", "Los Angeles", "Chicago"];
export const categories = ["Select a category", "Restaurant", "Cafe", "Bar"];

export const logos = [
  {
    src: SliderOne,
    alt: "Swiggy",
  },
  {
    src: SliderTwo,
    alt: "Taj",
  },
  {
    src: SliderThree,
    alt: "Le Marche",
  },
  {
    src: SliderFour,
    alt: "Karigari",
  },
  {
    src: SliderFive,
    alt: "Dineout",
  },
  {
    src: SliderSix,
    alt: "Speed Kitchen",
  },
  {
    src: SliderSeven,
    alt: "hotel",
  },
  {
    src: SliderEight,
    alt: "Zomato",
  },
  {
    src: SliderNine,
    alt: "realstate",
  },
  {
    src: SliderTen,
    alt: "states",
  },
];

export const properties = [
  {
    id: 1,
    priceBold: "₹1.75 Lakh",
    priceNormal: "/mo",
    type: "rent", // or "sale"
    title:
      "Fine Dining Restaurant for Rent in Geeta colony, Delhi - 31 , New Delhi,Delhi",
    sqft: "800 sqft",
    imgSrc: PropertyOne,
    imgAlt:
      "Fine Dining Restaurant Interior with orange balloons and tables arranged in rows",
  },
  {
    id: 2,
    priceBold: "₹10 Lakh",
    priceNormal: "/mo",
    type: "sale",
    title: "Restaurant Space for lease In Connaught Place",
    sqft: "3300 sqft",
    imgSrc: PropertyTwo,
    imgAlt: "Retail Restaurant Space For Lease sign on building window",
  },
  {
    id: 3,
    priceBold: "₹1.10 Lakh",
    priceNormal: "/mo",
    type: "rent", // or "sale"
    title: "Space available on lease in Rajinder Nagar",
    sqft: "270 sqft",
    imgSrc: PropertyThree,
    imgAlt: "For Lease sign on gray building with windows",
  },
  {
    id: 4,
    priceBold: "₹90 Thousand",
    priceNormal: "/mo",
    type: "sale",
    title: "Space available on lease in old Rajinder Nagar",
    sqft: "125 sqft",
    imgSrc: PropertyOne,
    imgAlt: "For Lease sign on gray building with windows",
  },
  {
    id: 5,
    priceBold: "₹1.75 Lakh",
    priceNormal: "/mo",
    type: "rent", // or "sale"
    title:
      "Fine Dining Restaurant for Rent in Geeta colony, Delhi - 31 , New Delhi,Delhi",
    sqft: "800 sqft",
    imgSrc: PropertyOne,
    imgAlt:
      "Fine Dining Restaurant Interior with orange balloons and tables arranged in rows",
  },
  {
    id: 6,
    priceBold: "₹10 Lakh",
    priceNormal: "/mo",
    type: "sale",
    title: "Restaurant Space for lease In Connaught Place",
    sqft: "3300 sqft",
    imgSrc: PropertyTwo,
    imgAlt: "Retail Restaurant Space For Lease sign on building window",
  },
  {
    id: 7,
    priceBold: "₹1.10 Lakh",
    priceNormal: "/mo",
    type: "rent", // or "sale"
    title: "Space available on lease in Rajinder Nagar",
    sqft: "270 sqft",
    imgSrc: PropertyThree,
    imgAlt: "For Lease sign on gray building with windows",
  },
  {
    id: 8,
    priceBold: "₹90 Thousand",
    priceNormal: "/mo",
    type: "sale",
    title: "Space available on lease in old Rajinder Nagar",
    sqft: "125 sqft",
    imgSrc: PropertyOne,
    imgAlt: "For Lease sign on gray building with windows",
  },
];

export const features = [
  {
    icon: faShieldAlt,
    title: "Strategic Partnerships",
    desc: "Benefit from our strong network of industry-leading partners and vendors, providing you with the best resources and opportunities.",
  },
  {
    icon: faKey,
    title: "Industry Expertise",
    desc: "With years of experience in the F&B industry, our team of experts brings deep knowledge and innovative strategies to help your business succeed.",
  },
  {
    icon: faFlask,
    title: "Scalable and Flexible",
    desc: "Our services are designed to grow with your business, offering scalability and flexibility to meet your evolving needs.",
  },
  {
    icon: faCogs,
    title: "Quality and Reliability",
    desc: "We are committed to delivering high-quality services with a focus on reliability, ensuring your business operations run smoothly.",
  },
];

export const outletOptions = [
  { value: "", label: "Select..." },
  { value: "cafe", label: "Cafe" },
  { value: "restaurant", label: "Restaurant" },
  { value: "retail", label: "Retail" },
  { value: "office", label: "Office" },
];

export const locationOptions = [
  { value: "", label: "Select..." },
  { value: "newyork", label: "New York" },
  { value: "losangeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "houston", label: "Houston" },
];

export const popularSearches = [
  "Cloud Kitchen on Rent",
  "Cloud Kitchen For Sale",
  "Cloud Kitchen in New Delhi",
  "Cloud Kitchen in Gurugram",
  "Cloud Kitchen in Noida",
  "Cloud Kitchen in Greater Noida",
  "Cloud Kitchen in Ghaziabad",
  "Cloud Kitchen for rent in New Delhi",
  "Cloud Kitchen for rent in Noida",
  "Cloud Kitchen for rent in Gurugram",
  "Cloud Kitchen for rent in Greater Noida",
];

export const otherSearches = [
  "Cloud Kitchen on Rent in Faridabad",
  "Restaurant for sale near me",
  "Restaurant for Sale in New Delhi",
  "Restaurant on Rent in New Delhi",
  "Restaurant in Noida",
  "Restaurant for Sale in Noida",
  "Restaurant for rent in Noida",
  "Restaurant for Sale",
  "Restaurant for Sale in Gurugram",
  "Restaurant for Rent in Gurugram",
  "Restaurant for Sale in Faridabad",
  "Restaurant in Faridabad",
];

export const socialLinks = [
  { href: "#", label: "Facebook", icon: faFacebookF },
  { href: "#", label: "Instagram", icon: faInstagram },
  { href: "#", label: "LinkedIn", icon: faLinkedinIn },
  { href: "#", label: "WhatsApp", icon: faWhatsapp },
];

// Month names
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const appLinks = [
  {
    href: "/",
    alt: "Apple logo icon in white on dark background",
    smallText: "Download on the",
    boldText: "Apple Store",
    icon: faApple,
  },
  {
    href: "/",
    alt: "Google Play icon in white on dark background",
    smallText: "Get it on",
    boldText: "Google Play",
    icon: faGooglePlay,
  },
];

export const links = ["Privacy", "Terms", "Refund", "Sitemap"];

export const blogPost = [
  {
    id: 1,
    category: "Cloud Kitchen",
    title: "7 Essential Steps to Successfully Set Up a Cloud Kitchen in India",
    image: BlogOne,
    date: new Date(2023, 1, 11), // February 11
  },
  {
    id: 2,
    category: "Sell A Restaurant",
    title: "5 Things you should keep in mind when closing the restaurant",
    image: BlogTwo,
    date: new Date(2023, 7, 27), // August 27
  },
  {
    id: 3,
    category: "Start A Restaurant",
    title: "Things to keep in mind while starting a restaurant/food business",
    image: BlogThree,
    date: new Date(2023, 7, 1), // August 1
  },
];

export const appImages = [
  {
    id: 1,
    src: DownloadImg,
    alt: "Mobile phone screen showing an app interface with search bar, location dropdown, notification icon, and properties listings with images",
    width: 280,
    height: 600,
    className: "w-full h-auto rounded-2xl shadow-lg",
  },
];

export const listingsData = [
  {
    id: 1,
    price: "₹8 Lakh",
    title: "Restaurant for sale in Ghaziabad",
    location: "Ghaziabad",
    size: "350 sqft",
    img: "https://admin.broki.in/storage/1284/1000011235.jpg",
  },
  {
    id: 2,
    price: "₹10 Lakh",
    title: "Cloud kitchen set up for sale in Powai",
    location: "Mumbai",
    size: "180 sqft",
    img: "	https://admin.broki.in/storage/1239/7247.jpeg",
    featured: true,
  },
  {
    id: 3,
    price: "₹22 Lakh",
    title: "Luxury Cafe Space in Delhi",
    location: "Delhi",
    size: "400 sqft",
    img: "	https://admin.broki.in/storage/1224/7239.jpeg",
    featured: true,
  },
  {
    id: 4,
    price: "₹6 Lakh",
    title: "Takeaway Joint in Pune",
    location: "Pune",
    size: "150 sqft",
    img: "	https://admin.broki.in/storage/1219/7238.jpeg",
  },
  {
    id: 5,
    price: "₹8 Lakh",
    title: "Restaurant for sale in Ghaziabad",
    location: "Ghaziabad",
    size: "350 sqft",
    img: "https://admin.broki.in/storage/1236/7245.jpeg",
  },
  {
    id: 6,
    price: "₹10 Lakh",
    title: "Cloud kitchen set up for sale in Powai",
    location: "Mumbai",
    size: "180 sqft",
    img: "	https://admin.broki.in/storage/1264/7248.jpeg",
    featured: true,
  },
  {
    id: 7,
    price: "₹22 Lakh",
    title: "Luxury Cafe Space in Delhi",
    location: "Delhi",
    size: "400 sqft",
    img: "https://admin.broki.in/storage/1236/7245.jpeg",
    featured: true,
  },
  {
    id: 8,
    price: "₹6 Lakh",
    title: "Takeaway Joint in Pune",
    location: "Pune",
    size: "150 sqft",
    img: "	https://admin.broki.in/storage/1245/1000296914.jpg",
  },
  {
    id: 9,
    price: "₹8 Lakh",
    title: "Restaurant for sale in Ghaziabad",
    location: "Ghaziabad",
    size: "350 sqft",
    img: "	https://admin.broki.in/storage/1264/7248.jpeg",
  },
  {
    id: 10,
    price: "₹10 Lakh",
    title: "Cloud kitchen set up for sale in Powai",
    location: "Mumbai",
    size: "180 sqft",
    img: "	https://admin.broki.in/storage/1219/7238.jpeg",
    featured: true,
  },
  {
    id: 11,
    price: "₹6 Lakh",
    title: "Takeaway Joint in Pune",
    location: "Delhi",
    size: "400 sqft",
    img: "	https://admin.broki.in/storage/1224/7239.jpeg",
    featured: true,
  },
  {
    id: 12,
    price: "₹22 Lakh",
    title: " Luxury Cafe Space in Delhi",
    location: "Pune",
    size: "150 sqft",

    img: "https://admin.broki.in/storage/1284/1000011235.jpg",
  },
];
export const servicesLinks = [
  {
    id: 1,
    title: "Food Photography by Anamika",
    provider: "Anamika Vaishnav",
    price: 500,
    image:
      "https://www.broki.in/_next/image?url=https%3A%2F%2Fservices.broki.in%2Fstorage%2F403%2FScreenshot-2025-01-20-at-11.52.14%E2%80%AFAM.png&w=828&q=75",
    featured: true,
  },
  {
    id: 2,
    title: "Food Photography by Manjula",
    provider: "Dr. Manjula Viljh",
    price: 2500,
    image:
      "https://www.broki.in/_next/image?url=https%3A%2F%2Fservices.broki.in%2Fstorage%2F378%2FScreenshot-2024-12-05-at-6.06.17%E2%80%AFPM.png&w=828&q=75",
    featured: true,
  },
  {
    id: 3,
    title: "Food Photography by Indraneil",
    provider: "Indraneil Tomar",
    price: 2667,
    image:
      "https://www.broki.in/_next/image?url=https%3A%2F%2Fservices.broki.in%2Fstorage%2F389%2FDSC_0077.jpg&w=828&q=75",
    featured: true,
  },
  {
    id: 4,
    title: "Food Photography by Dev",
    provider: "Dev Patel",
    price: 1000,
    image:
      "https://www.broki.in/_next/image?url=https%3A%2F%2Fservices.broki.in%2Fstorage%2F381%2FScreenshot-2024-12-05-at-6.08.11%E2%80%AFPM.png&w=828&q=75",
    featured: true,
  },
  {
    id: 5,
    title: "Food Photography by Riya",
    provider: "Riya Sharma",
    price: 15000,
    image:
      "https://www.broki.in/_next/image?url=https%3A%2F%2Fservices.broki.in%2Fstorage%2F382%2FScreenshot-2024-12-05-at-6.09.21%E2%80%AFPM.png&w=828&q=75",
    featured: false,
  },
  {
    id: 6,
    title: "Food Photography by Kabir",
    provider: "Kabir Mehta",
    price: 1750,
    image:
      "https://www.broki.in/_next/image?url=https%3A%2F%2Fservices.broki.in%2Fstorage%2F375%2FScreenshot-2024-12-05-at-6.04.42%E2%80%AFPM.png&w=384&q=75",
    featured: true,
  },
];

// Listing Page Data

export const defaultFilters = {
  location: "All Locations",
  category: "All Categories",
  property_for: "All",
  minPrice: "",
  maxPrice: "",
};

export const filterOptions = [
  {
    label: "Listing Status",
    key: "status",
    options: ["All", "For Sale", "For Rent"],
  },
  {
    label: "Property Type",
    key: "type",
    options: ["All Types", "Restaurant", "Cloud Kitchen"],
  },
  {
    label: "Location",
    key: "location",
    options: ["All Locations", "Ghaziabad", "Mumbai", "Delhi", "Pune"],
  },
];

// Dashboard
export const bookingsData = [
  {
    id: "BKG001",
    service: "Home Cleaning",
    date: "2025-05-20",
    user: "John Doe",
    provider: "CleanCo",
    status: "Confirmed",
    amount: "₹1500",
    payment: "Paid",
  },
  {
    id: "BKG002",
    service: "Plumbing",
    date: "2025-05-18",
    user: "Jane Smith",
    provider: "PipeFixers",
    status: "Completed",
    amount: "₹800",
    payment: "Paid",
  },
  {
    id: "BKG003",
    service: "AC Repair",
    date: "2025-05-15",
    user: "Bob Martin",
    provider: "CoolServ",
    status: "Pending",
    amount: "₹1200",
    payment: "Unpaid",
  },
];

export const propertiesData = [
  {
    details: "2BHK Flat in Green Valley",
    for: "Rent",
    status: "Active",
    action: "Edit",
  },
  {
    details: "3BHK Villa in Lakeview",
    for: "Sale",
    status: "Pending",
    action: "Edit",
  },
  {
    details: "Studio Apartment in Downtown",
    for: "Rent",
    status: "Inactive",
    action: "Edit",
  },
];

export const listingProductDetail = {
  title: "Fine Dining Restaurant for Rent in Geeta Colony",
  location: {
    city: "New Delhi",
    full: "Geeta Colony, Delhi - 31, New Delhi, India",
  },
  age: "3 Years",
  code: "BR-outlet-7099",
  size: "800 sqft",
  price: 175000,
  pricePerSqft: 219,
  yearBuilt: 2022,
  monthlySales: "₹400000",
  currentRental: "₹160000",
  propertyStatus: "For Rent",
  propertyType: "Restaurant",
  images: [
    "https://admin.broki.in/storage/843/1000064828.jpg",
    "https://admin.broki.in/storage/845/1000064829.jpg",
    "	https://admin.broki.in/storage/844/1000064830.jpg",
    "https://admin.broki.in/storage/843/1000064828.jpg",
  ],
};

//   Home Data

// src/lib/constants.js

// ✅ Static imports for images
import BlogImg1 from "../assets//images/blogone.webp";
import BlogImg2 from "../assets/images/blogtwo.webp";
import BlogImg3 from "../assets/images/blogthree.webp";

// ✅ Tabs for switching between Real Estate and Services
export const tabss = [
  { id: "real-estate", label: "Real Estate" },
  { id: "services", label: "Services" },
];

// ✅ Cities for dropdown
export const citiess = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"];

// ✅ Categories
export const categoriess = [
  "Residential",
  "Commercial",
  "Plot",
  "Farmhouse",
  "Villa",
];

// Services Section Data Below

import {
  faHouse,
  faCalendar,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import EYS_img1 from "../assets/images/servicesDetail-img.png";
import EYS_img2 from "../assets/images/servicesDetail-img.png";
import EYS_img3 from "../assets/images/servicesDetail-img.png";

// Add-on icons (if not embedded directly in data)
export const ADDON_ICONS = {
  "Extra item": EYS_img1,
  "Props/Crockery/Styling": EYS_img2,
  "Additional Setup Fee": EYS_img3,
};

export const DEFAULT_SERVICE = {
  name: "Harry's ",
  price: 0,
  category: "General",
  description:
    "Professional food photography service for restaurants and cafes.",
  serviceId: "AN001",
  provider: "Anamika Vaishnav",
  price: 500,
  category: "Food Photography",
  serviceType: "On-Site Service",
  itemsCovered: 1,
  images: [anamika3, food1, anamika2],
  addOns: [
    { title: "Extra item", price: 200 },
    { title: "Props/Crockery/Styling", price: 500 },
    { title: "Additional Setup Fee", price: 1000 },
  ],
};
// Placeholder for fallback
export const PLACEHOLDER_IMAGE = "https://via.placeholder.com/600x400";

// Static service type
export const SERVICE_TYPE = "On-Site Service";

// Overview section fields
export const getOverviewData = (price, category) => [
  { label: "Price", value: `₹${price}`, icon: faHouse },
  { label: "Category", value: category, icon: faCalendar },
  { label: "Service Type", value: SERVICE_TYPE, icon: faUserTie },
];

// Price breakdown fields
export const getPriceBreakdown = (price, addOnsTotal, tax) => [
  { label: "Base Price", amount: price },
  { label: "Base Discount (0%)", amount: 0 },
  { label: "Addons Total", amount: addOnsTotal },
  { label: "Tax (18%)", amount: tax },
];

export const OVERVIEW_FIELDS = [
  {
    label: "Price",
    value: "₹2500 per item",
    icon: "faHouse",
    description: "Price per item for the service",
  },
  {
    label: "Category",
    value: "Photography",
    icon: "faCalendar",
    description: "Category of the service",
  },
  {
    label: "Service Type",
    value: "On-Site Service",
    icon: "faUserTie",
    description: "Type of service provided",
  },
];

export const PRICE_LABELS = {
  basePrice: "Base Price",
  discount: "Base Discount (0%)",
  addons: "Addons Total",
  tax: "Tax (18%)",
  total: "Total Price",
};
export const SERVICE_FAQS = [
  {
    question: "What does the photoshoot package include?",
    answer:
      "Package includes a professional 7–8 hour photoshoot for up to 20 food items. The package covers high-resolution, edited photos that are ready for use in menus, social media, and marketing materials.",
  },
  {
    question: "Can I choose style of photography?",
    answer:
      "Yes, you can choose the photography style that best fits your brand. Discuss your preferences before the shoot.",
  },
  {
    question: "How many final photos will I receive?",
    answer:
      "You will receive 20 professionally edited, high-resolution images.",
  },
  {
    question: "Do you provide props and backdrops for a shoot?",
    answer:
      "Yes, we can provide standard props and backdrops upon request. Custom setups may incur additional charges.",
  },
  {
    question: "Can I book extra time or include more items?",
    answer:
      "Absolutely. Additional time and items can be accommodated for an extra fee. Let us know your requirements in advance.",
  },
  {
    question: "Do you shoot on location or at a studio?",
    answer:
      "We offer both on-location and studio shoots depending on your preference and availability.",
  },
  {
    question: "How soon will I get the photos?",
    answer:
      "You will receive your edited photos within 3–5 business days after the shoot.",
  },
  {
    question: "What is your cancellation or rescheduling policy?",
    answer:
      "Cancellations made 48 hours before the shoot are fully refundable. Rescheduling is allowed once with prior notice.",
  },
  {
    question: "How can I get started?",
    answer:
      "Simply reach out through the contact form or booking button to schedule a consultation and confirm your session.",
  },
];

export const SERVICE_ADDONS = [
  {
    title: "Extra item",
    price: 200,
    description: "Add an extra food item to your photoshoot.",
  },
  {
    title: "Props/Crockery/Styling",
    price: 500,
    description: "Includes props, crockery, and styling for your shoot.",
  },
  {
    title: "Additional Setup Fee",
    price: 1000,
    description: "Covers additional setup requirements for the shoot.",
  },
];

// Services data

import food1 from "../assets/images/food1.webp";

import anamika2 from "../assets/images/anamika_img2.png";
import anamika3 from "../assets/images/anamika_img3.png";

import indra1 from "../assets/images/indraneil_img1.png";
import indra2 from "../assets/images/indraneil_img2.png";
import indra3 from "../assets/images/indraneil_img3.jpg";
import indra4 from "../assets/images/indraneil_img4.png";

import manjula1 from "../assets/images/manjula_img1.png";
import manjula2 from "../assets/images/manjula_img2.png";
import manjula3 from "../assets/images/manjula_img3.png";

import Krishnendu1 from "../assets/images/Krishnendu_img1.png";
import Krishnendu2 from "../assets/images/Krishnendu_img2.png";

import manish1 from "../assets/images/manish_img1.png";
import manish2 from "../assets/images/manish_img2.png";

import ishant1 from "../assets/images/ishant_img1.png";

export const servicesData = [
  {
    serviceId: "AN001",
    name: "Anamika",
    price: 500,
    category: "Food Photography",
    itemsCovered: 1,
    image: food1,
    images: [food1, anamika2, anamika3],
    description:
      "Anamika is an experienced food photographer known for vibrant and creative compositions that bring out the best in every dish.",
    addOns: [
      { title: "Extra item", price: 200 },
      { title: "Props/Crockery/Styling", price: 350 },
      { title: "Additional Setup Fee", price: 500 },
    ],
  },
  {
    serviceId: "EX005",
    name: "Manish",
    price: 1800,
    category: "Food Photography",
    itemsCovered: 2,
    image: manish1,
    images: [manish1, manish2],
    description:
      "Manish specializes in high-end food photography for restaurants and gourmet brands, blending technical expertise with artistic flair.",
    addOns: [
      { title: "Extra item", price: 450 },
      { title: "Props/Crockery/Styling", price: 900 },
      { title: "Additional Setup Fee", price: 1200 },
    ],
  },
  {
    serviceId: "EX006",
    name: "Ishant",
    price: 900,
    category: "Food Photography",
    itemsCovered: 1,
    image: ishant1,
    images: [ishant1],
    description:
      "Ishant delivers clean and appealing food visuals, ideal for cafes, cloud kitchens, and digital menus with quick turnaround time.",
    addOns: [
      { title: "Extra item", price: 250 },
      { title: "Props/Crockery/Styling", price: 400 },
      { title: "Additional Setup Fee", price: 600 },
    ],
  },
  {
    serviceId: "EX007",
    name: "Manish Kumar",
    price: 2100,
    category: "Food Photography",
    itemsCovered: 3,
    image: manish2,
    images: [food1],
    description:
      "MonkeyDluffy is known for dramatic food photography with bold styling and storytelling, perfect for marketing and campaigns.",
    addOns: [
      { title: "Extra item", price: 500 },
      { title: "Props/Crockery/Styling", price: 1200 },
      { title: "Additional Setup Fee", price: 1800 },
    ],
  },
  {
    serviceId: "IN002",
    name: "Indraneil",
    price: 2667,
    category: "Food Photography",
    itemsCovered: 2,
    image: indra1,
    images: [indra1, indra2, indra3, indra4],
    description:
      "Indraneil is a skilled food photographer with 7 years of experience, known for visually stunning, high-quality images for brands and menus.",
    addOns: [
      { title: "Extra item", price: 400 },
      { title: "Props/Crockery/Styling", price: 900 },
      { title: "Additional Setup Fee", price: 1500 },
    ],
  },
  {
    serviceId: "KR004",
    name: "Krishnendu",
    price: 1000,
    category: "Food Photography",
    itemsCovered: 1,
    image: Krishnendu1,
    images: [Krishnendu1, Krishnendu2],
    description:
      "Krishnendu provides minimalist, clean photography tailored for delivery apps and product showcases with consistent styling.",
    addOns: [
      { title: "Extra item", price: 300 },
      { title: "Props/Crockery/Styling", price: 600 },
      { title: "Additional Setup Fee", price: 800 },
    ],
  },
  {
    serviceId: "MJ003",
    name: "Manjula",
    price: 2500,
    category: "Food Photography",
    itemsCovered: 1,
    image: manjula1,
    images: [manjula1, manjula2, manjula3],
    description:
      "Manjula combines artistic angles with top-notch styling to create striking food imagery suitable for campaigns and cookbooks.",
    addOns: [
      { title: "Extra item", price: 350 },
      { title: "Props/Crockery/Styling", price: 850 },
      { title: "Additional Setup Fee", price: 1000 },
    ],
  },
];
