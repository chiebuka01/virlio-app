import { useState } from "react";
import axios from "axios";
import { Input } from "../components/Input";
import Button from "../components/Button";

const API_URL = import.meta.env.VITE_API_URL;

interface VideoPost {
  title: string;
  description: string;
  publisher: string;
  producer: string;
  genre: string;
  ageRating: string;
  video: File | null;
}

function UploadVideoPage() {
  const [video, setVideo] = useState<VideoPost>({
    title: "",
    description: "",
    publisher: "",
    producer: "",
    genre: "",
    ageRating: "",
    video: null,
  });

  const handleChange = (e: any) => {
    setVideo({
      ...video,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("title", video.title);
          formData.append("description", video.description);
          formData.append("publisher", video.publisher);
          formData.append("producer", video.producer);
          formData.append("genre", video.genre);
          formData.append("ageRating", video.ageRating);

          if (video.video) {
            formData.append("video", video.video);
          }

          const token = localStorage.getItem("token");

          try {
            const res = await axios.post(`${API_URL}/videos`, formData, {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Input name="title" placeholder="Title" onChange={handleChange} />
        <Input
          type="textarea"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <Input
          name="publisher"
          placeholder="Publisher"
          onChange={handleChange}
        />
        <Input
          name="producer"
          placeholder="Producer"
          onChange={handleChange}
        />
        <Input name="genre" placeholder="Genre" onChange={handleChange} />
        <Input
          name="ageRating"
          placeholder="Age Rating (e.g. PG, 18)"
          onChange={handleChange}
        />

        <input
          type="file"
          name="video"
          onChange={(e) =>
            setVideo({
              ...video,
              video: e.target.files ? e.target.files[0] : null,
            })
          }
        />
        <Button>Upload</Button>
      </form>
    </div>
  );
}

export default UploadVideoPage;
