import { FaCommentDots } from 'react-icons/fa';

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="group relative bg-[#2a2a2a] hover:bg-[#333333] rounded-lg border border-white/5 p-4 transition-all duration-200">
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-200"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{date}</p>
        </div>

        {/* Comments */}
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
          <FaCommentDots className="text-purple-500" />
          <span className="text-gray-300 font-medium">{comments}</span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-500/0 group-hover:from-purple-600/10 group-hover:to-blue-500/10 rounded-lg transition-all duration-200" />
    </div>
  );
};

export default VideoCard;
