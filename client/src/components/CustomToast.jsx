import React from 'react';
import Icon from './ui/Icon';
import toast from 'react-hot-toast';

const CustomToast = ({
  message,
  actionText,
  onActionClick,
  t,
  stackIndex = 0,
}) => {
  const offset = stackIndex * 50; // Each toast will be offset by 50px

  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-sm w-full bg-white text-charcoal rounded-2xl border border-gray-200 shadow-xl flex items-center justify-between p-4 space-x-4`}
      style={{
        transform: `translateY(${-offset}px)`,
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      {/* Icon for visual feedback */}
      <div className="flex-shrink-0">
        <Icon name="heart" className="w-6 h-6 text-red-500" />
      </div>

      <div className="flex-grow text-sm font-medium pr-2">
        <p className="line-clamp-2">{message}</p>
      </div>

      <div className="flex-shrink-0 flex items-center space-x-4">
        {actionText && (
          <button
            onClick={() => {
              onActionClick();
              toast.dismiss(t.id);
            }}
            className="text-yellow-500 hover:text-yellow-600 transition-colors font-semibold text-sm whitespace-nowrap cursor-pointer"
          >
            {actionText}
          </button>
        )}
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-gray-400 hover:text-charcoal transition-colors flex-shrink-0 cursor-pointer"
        >
          <Icon name="x-circle" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
