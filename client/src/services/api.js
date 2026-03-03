import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL
});

const getApiOrigin = () => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch (_error) {
    return window.location.origin;
  }
};

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return '';
  }

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  return `${getApiOrigin()}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
};

export const getPostShareUrl = (postId) => `${window.location.origin}/post/${postId}`;

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('adminToken', token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem('adminToken');
  }
};

const existingToken = localStorage.getItem('adminToken');
if (existingToken) {
  setAuthToken(existingToken);
}
