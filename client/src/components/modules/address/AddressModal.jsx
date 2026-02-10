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
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="text-text-main mb-4 text-2xl font-bold">
          {initialData ? 'Edit Address' : 'Add New Address'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              value={formData.addressLine1}
              onChange={handleChange}
              required
              className="bg-bg-subtle text-text-main col-span-2 rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:ring-yellow-500"
            />

            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2 (Apt, Suite, etc.)"
              value={formData.addressLine2}
              onChange={handleChange}
              className="bg-bg-subtle text-text-main col-span-2 rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:ring-yellow-500"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="bg-bg-subtle text-text-main rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:ring-yellow-500"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="bg-bg-subtle text-text-main rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:ring-yellow-500"
            />

            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="bg-bg-subtle text-text-main rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:ring-yellow-500"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="bg-bg-subtle text-text-main rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:ring-yellow-500"
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
                className="bg-bg-subtle text-text-main rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:ring-yellow-500"
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
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-yellow-500 focus:ring-yellow-500"
              />

              <label
                htmlFor="isDefault"
                className="text-text-secondary select-none"
              >
                Set as default address
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseAddressModal}
              className="text-text-main cursor-pointer rounded-lg bg-gray-200 px-6 py-3 transition-colors hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-primary-hover cursor-pointer rounded-lg px-6 py-3 text-white transition-colors hover:bg-yellow-600"
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
