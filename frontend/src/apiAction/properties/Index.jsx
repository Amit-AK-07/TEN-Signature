import axios from "axios";
import { BASE_URL } from "../../lib/config";

const BASE_URLS = BASE_URL;

export const fetchProperties = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Add filters
    if (params.city) queryParams.append('city', params.city);
    if (params.category) queryParams.append('category', params.category);
    if (params.price_min) queryParams.append('price_min', params.price_min);
    if (params.price_max) queryParams.append('price_max', params.price_max);
    if (params.sqft_min) queryParams.append('sqft_min', params.sqft_min);
    if (params.sqft_max) queryParams.append('sqft_max', params.sqft_max);
    if (params.property_for !== undefined) queryParams.append('property_for', params.property_for);
    if (params.listing_status) queryParams.append('listing_status', params.listing_status);
    
    // Add search
    if (params.search) queryParams.append('search', params.search);
    
    // Add ordering
    if (params.ordering) queryParams.append('ordering', params.ordering);
    
    // Add pagination
    if (params.page) queryParams.append('page', params.page);
    if (params.page_size) queryParams.append('page_size', params.page_size);
    
    const url = `${BASE_URLS}/filter-property-list/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCities = async () => {
  try {
    const res = await axios.get(`${BASE_URLS}/cities/`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URLS}/categories/`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPropertyDetail = async (id) => {
  try {
    const res = await axios.post(`${BASE_URLS}/property-detail/`, { id });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchNearbyProperties = async (city, excludeId, page = 1, perPage = 5) => {
  try {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (excludeId) params.append('exclude_id', excludeId);
    params.append('page', page);
    params.append('per_page', perPage);
    
    const res = await axios.get(`${BASE_URLS}/nearby-property-list/?${params.toString()}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};