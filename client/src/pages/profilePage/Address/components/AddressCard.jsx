import { useAddressActions } from '../../../../hooks/useAddressActions';

const AddressCard = ({ address, onEdit, onDelete }) => {
  const { handleOpenDeleteAddressModal } = useAddressActions();

  return (
    <div className="group relative h-42 sm:h-56 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-yellow-200 transition-all duration-300 overflow-hidden">
      {/* Default Badge */}
      {address.isDefault && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-br from-yellow-400 to-primary-hover text-white text-xs font-semibold px-2.5 py-1 rounded-bl-lg shadow-sm">
            Default
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="flex flex-col h-full p-5 pt-7">
        {/* Address Type Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-5 bg-gradient-to-b from-yellow-400 to-primary-hover rounded-full"></div>
          <h3 className="text-base font-semibold text-text-main truncate">
            {address.addressType || 'Address'}
          </h3>
        </div>

        {/* Address Details - Fixed height container */}
        <div className="flex-1 mb-4 text-sm text-text-secondary leading-snug space-y-0.5 min-h-0">
          <p className="font-medium text-text-main truncate">
            {address.addressLine1}
          </p>
          {address.addressLine2 && (
            <p className="truncate">{address.addressLine2}</p>
          )}
          <p className="truncate">
            {address.city}, {address.state} {address.zipCode}
          </p>
          <p className="text-xs text-text-muted truncate">{address.country}</p>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="flex gap-4 mt-auto">
          <button
            onClick={() => onEdit(address)}
            className="cursor-pointer px-5 py-2 text-sm font-medium text-text-secondary bg-bg-subtle border border-border rounded-lg hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 transition-all duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => handleOpenDeleteAddressModal(address._id)}
            className="cursor-pointer px-6 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Subtle hover accent */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-primary-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default AddressCard;
