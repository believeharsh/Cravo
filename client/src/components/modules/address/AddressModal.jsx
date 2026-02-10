import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddressActions } from '../../../hooks/useAddressActions';

const AddressModal = ({ initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      addressType: 'Home',
      isDefault: false,
    }
  );
  const {
    handleCloseAddressModal,
    handleCreateNewAddress,
    handleUpdateAddress,
  } = useAddressActions();
  const { isAddressModalOpen } = useSelector(state => state.ui);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (initialData) {
      handleUpdateAddress(formData);
    } else {
      handleCreateNewAddress(formData);
    }
    handleCloseAddressModal();
  };

  //   if (!isAddressModalOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-text-main mb-4">
          {initialData ? 'Edit Address' : 'Add New Address'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              value={formData.addressLine1}
              onChange={handleChange}
              required
              className="col-span-2 p-3 border border-gray-300 rounded-lg bg-bg-subtle text-text-main focus:ring-yellow-500 focus:border-yellow-500"
            />

            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2 (Apt, Suite, etc.)"
              value={formData.addressLine2}
              onChange={handleChange}
              className="col-span-2 p-3 border border-gray-300 rounded-lg bg-bg-subtle text-text-main focus:ring-yellow-500 focus:border-yellow-500"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg bg-bg-subtle text-text-main focus:ring-yellow-500 focus:border-yellow-500"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg bg-bg-subtle text-text-main focus:ring-yellow-500 focus:border-yellow-500"
            />

            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg bg-bg-subtle text-text-main focus:ring-yellow-500 focus:border-yellow-500"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg bg-bg-subtle text-text-main focus:ring-yellow-500 focus:border-yellow-500"
            />

            <div className="col-span-2 flex items-center gap-4">
              <label htmlFor="addressType" className="text-text-secondary">
                Type:
              </label>

              <select
                name="addressType"
                id="addressType"
                value={formData.addressType}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg bg-bg-subtle text-text-main focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                name="isDefault"
                id="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="w-4 h-4 text-yellow-500 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
              />

              <label htmlFor="isDefault" className="text-text-secondary select-none">
                Set as default address
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseAddressModal}
              className="cursor-pointer px-6 py-3 text-text-main bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer px-6 py-3 text-white bg-primary-hover rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
