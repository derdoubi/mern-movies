import { FaCommentDots } from 'react-icons/fa';  // If you want to use a comment icon

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="flex items-center w-full sm:w-[90%] md:w-[80%] mt-5 bg-[#1A1A1A] p-4 rounded-lg shadow-lg hover:bg-[#2A2A2A] transition-all duration-300 ease-in-out">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img
          src={image}
          alt="Card Image"
          className="h-[3rem] sm:h-[4rem] md:h-[5rem] w-auto rounded-lg"
        />
      </div>

      {/* Title and Date Section */}
      <div className="ml-4 flex flex-col">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>

      {/* Comments Section */}
      <div className="flex-grow flex justify-end items-center">
        <div className="flex items-center text-white text-lg">
          <FaCommentDots className="mr-2" />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
