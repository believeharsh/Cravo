import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllAddresses,
  createNewAddress,
  updateAddress,
  deleteAddress,
} from '../features/address/addressSlice';
import {
  openDeleteAddressModal,
  closeDeleteAddressModal,
  openAddressModal,
  closeAddressModal,
} from '../features/ui/uiSlice';
import { useToastStack } from './useStackToasts';
import CustomToast from '../components/CustomToast';

export const useAddressActions = () => {
  const dispatch = useDispatch();
  const itemId = useSelector(state => state.ui.address.deleteAddressModalProps);
  const { showStackedToast } = useToastStack();

  const handleFetchAllAddresses = () => {
    dispatch(fetchAllAddresses());
  };

  const handleCreateNewAddress = async addressData => {
    try {
      await dispatch(createNewAddress(addressData)).unwrap();
      showStackedToast(
        CustomToast,
        {
          message: 'New address created successfully',
          actionText: '',
          onActionClick: () => {},
        },
        { duration: 3000 }
      );
    } catch (error) {
      // You can add a custom error toast here if needed
      console.error('Failed to create address:', error);
    }
  };

  const handleUpdateAddress = async updated_Data => {
    const addressId = updated_Data._id;
    const updates = updated_Data;
    try {
      await dispatch(updateAddress({ addressId, updates })).unwrap();
      showStackedToast(
        CustomToast,
        {
          message: 'Address updated successfully',
          actionText: '',
          onActionClick: () => {},
        },
        { duration: 3000 }
      );
    } catch (error) {
      console.error('Failed to update address:', error);
    }
  };

  const handleDeleteAddress = async addressId => {
    try {
      await dispatch(deleteAddress(addressId)).unwrap();
      dispatch(closeDeleteAddressModal());
      showStackedToast(
        CustomToast,
        {
          message: 'Address has been Deleted',
          actionText: '',
          onActionClick: () => {},
        },
        { duration: 3000 }
      );
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  const handleCloseDeleteAddressModal = () => {
    dispatch(closeDeleteAddressModal());
  };

  const handleOpenDeleteAddressModal = addressId => {
    dispatch(openDeleteAddressModal(addressId));
  };

  const handleCloseAddressModal = () => {
    dispatch(closeAddressModal());
  };
  const handleOpenAddressModal = () => {
    dispatch(openAddressModal());
  };

  return {
    handleFetchAllAddresses,
    handleCreateNewAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    handleOpenDeleteAddressModal,
    handleCloseDeleteAddressModal,
    handleOpenAddressModal,
    handleCloseAddressModal,
    deleteId: itemId,
  };
};
