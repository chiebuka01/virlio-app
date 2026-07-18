import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Input } from "../components/Input";
import Button from "../components/Button";
import { Layout } from "../components/Layout";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setVideo({
      ...video,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="p-6">
        {error && (
          <p className="bg-red-900 text-slate-200 mb-2 px-3 py-2 rounded-sm">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-900 text-slate-200 mb-2 px-3 py-2 rounded-sm">
            Video uploaded successfully!
          </p>
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setSuccess(false);

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

            if (!token) {
              setError("You must be logged in to upload a video.");
              return;
            }

            try {
              const res = await axios.post(`${API_URL}/videos`, formData, {
                headers: { Authorization: `Bearer ${token}` },
              });
              console.log(res);
              setSuccess(true);
            } catch (err) {
              if (err instanceof AxiosError) {
                setError(
                  err.response?.data?.message ||
                    "Upload failed. Please try again."
                );
              } else {
                setError("Upload failed. Please try again.");
              }
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
    </Layout>
  );
}

export default UploadVideoPage;
