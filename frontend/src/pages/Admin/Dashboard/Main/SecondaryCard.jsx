const SecondaryCard = ({ pill, content, info, gradient }) => {
  return (
    <div className="relative bg-[#1a1a1a] rounded-xl border border-white/10 p-6 backdrop-blur-sm">
      {/* Gradient Background Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-10 rounded-xl`} />
      
      {/* Pill Label */}
      {pill && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className={`px-4 py-1 rounded-full bg-gradient-to-r ${gradient} shadow-lg`}>
            <span className="text-white text-sm font-medium">{pill}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center pt-6">
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient}">
          {content}
        </div>
        
        {info && (
          <div className="mt-4 text-sm text-gray-400">
            {info}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondaryCard;
