import { useState, useCallback } from 'react';
import { marketplaceApi } from '../services/api';

export const useMarketplace = () => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const browse = useCallback(async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await marketplaceApi.browse(filters);
      setProducts(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getFeatured = useCallback(async () => {
    try {
      setLoading(true);
      const response = await marketplaceApi.getFeatured();
      setFeatured(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getStats = useCallback(async () => {
    try {
      const response = await marketplaceApi.getStats();
      setStats(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  return {
    products,
    featured,
    stats,
    loading,
    error,
    browse,
    getFeatured,
    getStats,
  };
};

export default useMarketplace;