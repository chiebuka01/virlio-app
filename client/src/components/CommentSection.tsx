import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Props {
  videoId: string;
}

function CommentSection({ videoId }: Props) {
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const loadComments = async () => {
    const res = await axios.get(`${API_URL}/videos/${videoId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    loadComments();
  }, [videoId]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to comment and rate.");
      return;
    }
    await axios.post(
      `${API_URL}/videos/${videoId}/comments`,
      { text, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setText("");
    loadComments();
  };

  return (
    <div className="mt-2 px-4">
      <form onSubmit={submitComment} className="flex gap-x-2 mb-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-zinc-800 px-2 py-1 outline-none focus:outline-sky-500 text-slate-300 flex-1"
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="bg-zinc-800 px-2 py-1 text-slate-300"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} ⭐
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-400 px-4 py-1 rounded-sm"
        >
          Post
        </button>
      </form>
      <div className="flex flex-col gap-y-1">
        {comments.map((comment) => (
          <div key={comment._id} className="text-sm text-slate-300">
            <span className="text-yellow-400">
              {"⭐".repeat(comment.rating || 0)}
            </span>{" "}
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
