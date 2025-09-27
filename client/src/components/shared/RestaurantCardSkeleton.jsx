const SkeletonCard = ({ width }) => (
  <div className="flex-shrink-0 px-2" style={{ width }}>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full flex flex-col overflow-hidden animate-pulse">
      {/* Skeleton Image */}
      <div className="h-34 bg-gray-200 flex-shrink-0 relative">
        <div className="absolute bottom-3 left-3 bg-gray-300 rounded-lg w-20 h-6"></div>
        <div className="absolute top-3 right-3 bg-gray-300 rounded-full w-16 h-6"></div>
      </div>

      {/* Skeleton Content */}
      <div className="px-3 pt-1 pb-2 space-y-2">
        {/* Restaurant name skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-1.5">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-12"></div>
        </div>

        {/* Footer skeleton */}
        <div className="border-t border-gray-100 pt-2 flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonCard;
