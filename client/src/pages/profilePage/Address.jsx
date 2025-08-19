import React, { useState } from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import Icon from '../../components/ui/Icon';

const Addresses = () => {
  const [addresses, setAddresses] = useState([
    // (same seed data as before) …
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'home',
    label: '',
    name: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: false,
  });

  const addressTypes = [
    { value: 'home', label: 'Home', icon: 'home' },
    { value: 'work', label: 'Work', icon: 'building' },
    { value: 'other', label: 'Other', icon: 'map-pin' },
  ];

  /* ───────────────────────────────
              Helpers / CRUD
  ─────────────────────────────── */
  const resetForm = () => {
    setFormData({
      type: 'home',
      label: '',
      name: '',
      phone: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false,
    });
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddingNew(true);
    setEditingId(null);
  };

  const handleEdit = address => {
    setFormData(address);
    setEditingId(address.id);
    setIsAddingNew(false);
  };

  const handleSave = () => {
    if (isAddingNew) {
      const newAddress = {
        ...formData,
        id: Date.now(),
        label:
          formData.label ||
          addressTypes.find(t => t.value === formData.type)?.label,
      };
      setAddresses([...addresses, newAddress]);
    } else {
      setAddresses(
        addresses.map(addr =>
          addr.id === editingId ? { ...formData, id: editingId } : addr
        )
      );
    }
    handleCancel();
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const handleSetDefault = id => {
    setAddresses(
      addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const getAddressIcon = type => {
    const match = addressTypes.find(t => t.value === type);
    return match ? match.icon : MapPin;
  };

  /* ───────────────────────────────
                    UI
  ─────────────────────────────── */
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">My Addresses</h1>
          <p className="text-medium-gray mt-1">
            Manage your delivery addresses
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <Icon name={'plus'} className="w-5 h-5" />
          Add New Address
        </button>
      </div>

      {/* Add / Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
          {/* (form markup unchanged) */}
          {/* … */}
        </div>
      )}

      {/* Address List */}
      <div className="space-y-4">
        {addresses.map(address => {
          const Icon = getAddressIcon(address.type);
          return (
            <div
              key={address.id}
              className={`bg-white rounded-2xl shadow-lg border p-6 transition-all hover:shadow-xl ${
                address.isDefault
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-cream'
              }`}
            >
              <div className="flex items-start justify-between">
                {/* Icon + Details */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      address.isDefault ? 'bg-yellow-400' : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        address.isDefault ? 'text-white' : 'text-medium-gray'
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-charcoal">
                        {address.label}
                      </h3>
                      {address.isDefault && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-400 text-white text-xs font-medium rounded-full">
                          <Icon name={'star'} className="w-3 h-3" />
                          Default
                        </span>
                      )}
                    </div>

                    <div className="text-medium-gray space-y-1">
                      <p className="font-medium text-charcoal">
                        {address.name}
                      </p>
                      <p>{address.phone}</p>
                      <p>
                        {address.street}
                        {address.apartment && `, ${address.apartment}`}
                      </p>
                      <p>
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="px-3 py-2 text-sm text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                    >
                      Set Default
                    </button>
                  )}

                  <button
                    onClick={() => handleEdit(address)}
                    className="p-2 text-mint-green hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Icon name={'lucide-edit-3'} className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Icon name={'lucide-trash-2'} className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Addresses;
