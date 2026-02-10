import Icon from '../../../components/ui/Icon';

/**
 * Renders a card for a single delivery address.
 *
 * @param {object} props - Component props.
 * @param {object} props.address - The address object to display.
 * @param {boolean} props.isSelected - True if this address is currently selected.
 * @param {function(): void} props.onClick - Function to call when the card is clicked.
 * @returns {JSX.Element} The AddressCard component.
 */

const AddressCard = ({ address, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-4 transition-all ${
        isSelected
          ? 'border-border-focus bg-yellow-50'
          : 'border-cream hover:border-gray-300'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            isSelected ? 'bg-primary' : 'bg-gray-100'
          }`}
        >
          <Icon
            name={address.icon}
            className={`h-4 w-4 ${
              isSelected ? 'text-white' : 'text-medium-gray'
            }`}
          />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-charcoal font-semibold">{address.type}</span>
            {address.isDefault && (
              <span className="bg-mint-green rounded-full px-2 py-0.5 text-xs text-white">
                Default
              </span>
            )}
          </div>
          <p className="text-charcoal text-sm">{address.address}</p>
          <p className="text-medium-gray text-sm">{address.city}</p>
          {address.landmark && (
            <p className="text-medium-gray mt-1 text-xs">{address.landmark}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
