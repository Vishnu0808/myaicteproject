import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Newspaper, Loader2 } from 'lucide-react';
import Card from './card';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles/list');
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch articles');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
    <br/><br/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card
            key={article._id}
            title={article.heading}
            text={article.description}
            imageUrl={article.image}
            link={article.link}
          />
        ))}
      </div>
      {articles.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No articles found</p>
        </div>
      )}
    </div>
  );
};

export default News;