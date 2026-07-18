import axios from "axios";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import VideoFeed from "../components/VideoFeed";
import SearchBar from "../components/SearchBar";

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const [videos, setVideos] = useState<any[]>([]);

  const loadVideos = async () => {
    const res = await axios.get(`${API_URL}/videos`);
    setVideos(res.data);
  };

  const searchVideos = async (query: string) => {
    if (!query) {
      loadVideos();
      return;
    }
    const res = await axios.get(`${API_URL}/videos/search`, {
      params: { q: query },
    });
    setVideos(res.data);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <Layout>
      <SearchBar onSearch={searchVideos} />
      {videos.length === 0 ? (
        <h1>No videos yet</h1>
      ) : (
        <VideoFeed videos={videos} />
      )}
    </Layout>
  );
}

export default HomePage;
