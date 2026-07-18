import { FiMusic } from "react-icons/fi";
import CommentSection from "./CommentSection";

interface Props {
  videos: any[];
}

function VideoFeed({ videos }: Props) {
  return (
    <>
      {videos.map((video) => {
        return (
          <div key={video._id} className="bg-black mb-6">
            <div>
              <header className="">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <h1>{video.title}</h1>
                    <h3 className="text-xs ml-2">{video.genre}</h3>
                  </div>
                  <button className="border-red-500 border-2 rounded-md px-4 py-1 text-sm text-red-400 font-bold">
                    Follow
                  </button>
                </div>
                <p>{video.description}</p>
                <p className="flex items-center gap-x-2 text-xs text-slate-400">
                  {video.publisher && <span>Publisher: {video.publisher}</span>}
                  {video.ageRating && <span>Age: {video.ageRating}</span>}
                </p>
                <p className="flex items-center gap-x-2">
                  <FiMusic className="w-3 h-3" />
                  Song name - author
                </p>
              </header>
            </div>
            <video
              className="rounded-lg w-1/3"
              src={video.video}
              controls
              autoPlay={true}
              muted
              loop
            />
            <CommentSection videoId={video._id} />
          </div>
        );
      })}
    </>
  );
}

export default VideoFeed;
