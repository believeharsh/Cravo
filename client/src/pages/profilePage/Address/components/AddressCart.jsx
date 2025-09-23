import { useAddressActions } from '../../../../hooks/useAddressActions';

const AddressCard = ({ address, onEdit, onDelete }) => {
  const { handleOpenDeleteAddressModal } = useAddressActions();
  return (
    <div className="relative p-6 bg-white rounded-xl shadow-md border border-gray-200 w-full">
      {address.isDefault && (
        <span className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full shadow-lg">
          Default
        </span>
      )}
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {address.addressType || 'Address'}
      </h3>
      <p className="text-gray-700">{address.addressLine1}</p>
      {address.addressLine2 && (
        <p className="text-gray-700">{address.addressLine2}</p>
      )}

      <p className="text-gray-700">
        {address.city}, {address.state} {address.zipCode}
      </p>
      <p className="text-gray-700">{address.country}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(address)}
          className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => handleOpenDeleteAddressModal(address._id)}
          className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default AddressCard;
