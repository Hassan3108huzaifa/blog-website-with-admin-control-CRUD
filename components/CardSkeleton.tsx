// components/SkeletonCard.tsx

const SkeletonCard = () => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl animate-pulse">
        <div className="w-full h-56 bg-gray-300"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <div className="h-4 bg-gray-300 rounded w-20 mr-2"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    );
  };
  
  export default SkeletonCard;
  