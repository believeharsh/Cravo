const RestaurantSkeletonCard = ({ width }) => (
  <div className="flex-shrink-0 px-2" style={{ width }}>
    <div className="flex w-full animate-pulse flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      {/* Skeleton Image */}
      <div className="relative h-34 flex-shrink-0 bg-gray-200">
        <div className="absolute bottom-3 left-3 h-6 w-20 rounded-lg bg-gray-300"></div>
        <div className="absolute top-3 right-3 h-6 w-16 rounded-full bg-gray-300"></div>
      </div>

      {/* Skeleton Content */}
      <div className="space-y-2 px-3 pt-1 pb-2">
        {/* Restaurant name skeleton */}
        <div className="h-6 w-3/4 rounded bg-gray-200"></div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-16 rounded bg-gray-200"></div>
          <div className="h-4 w-20 rounded bg-gray-200"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-1.5">
          <div className="h-6 w-16 rounded-full bg-gray-200"></div>
          <div className="h-6 w-20 rounded-full bg-gray-200"></div>
          <div className="h-6 w-12 rounded-full bg-gray-200"></div>
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between border-t border-gray-100 pt-2">
          <div className="h-4 w-16 rounded bg-gray-200"></div>
          <div className="h-4 w-20 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
);

export default RestaurantSkeletonCard;
