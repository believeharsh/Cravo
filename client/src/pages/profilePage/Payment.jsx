import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Save,
  Eye,
  EyeOff,
  Calendar,
  DollarSign,
  Receipt,
  Clock,
  Filter,
  Download,
  Star,
  Shield,
  Wallet,
} from 'lucide-react';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('methods'); // 'methods', 'history', 'billing'
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [editingCardId, setEditingCardId] = useState(null);
  const [showCardNumber, setShowCardNumber] = useState({});
  const [filterPeriod, setFilterPeriod] = useState('all');

  /* ───────────────────────────────
                Data
  ─────────────────────────────── */
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit',
      brand: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      holderName: 'John Doe',
      isDefault: true,
      nickname: 'Personal Visa',
    },
    {
      id: 2,
      type: 'credit',
      brand: 'mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '2026',
      holderName: 'John Doe',
      isDefault: false,
      nickname: 'Work Card',
    },
    {
      id: 3,
      type: 'paypal',
      email: 'john.doe@email.com',
      isDefault: false,
      nickname: 'PayPal Account',
    },
  ]);

  const [transactions] = useState([
    // (seed data unchanged) …
  ]);

  const [cardForm, setCardForm] = useState({
    holderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nickname: '',
    isDefault: false,
  });

  /* ───────────────────────────────
           Helpers / Utilities
  ─────────────────────────────── */
  const cardBrands = {
    visa: { name: 'Visa', color: 'bg-blue-600' },
    mastercard: { name: 'Mastercard', color: 'bg-red-600' },
    amex: { name: 'American Express', color: 'bg-green-600' },
    discover: { name: 'Discover', color: 'bg-orange-600' },
  };

  const getCardBrand = (number) => {
    const first = number.charAt(0);
    if (first === '4') return 'visa';
    if (first === '5') return 'mastercard';
    if (first === '3') return 'amex';
    if (first === '6') return 'discover';
    return 'visa';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-mint-green bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'refunded':
        return 'text-blue-600 bg-blue-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-medium-gray bg-gray-50';
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filterPeriod === 'all') return true;
    const diff = Date.now() - new Date(t.date).getTime();
    const day = 24 * 60 * 60 * 1000;
    if (filterPeriod === 'week') return diff <= 7 * day;
    if (filterPeriod === 'month') return diff <= 30 * day;
    if (filterPeriod === 'year') return diff <= 365 * day;
    return true;
  });

  /* ───────────────────────────────
           CRUD: Payment Methods
  ─────────────────────────────── */
  const handleAddCard = () => {
    setCardForm({
      holderName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      nickname: '',
      isDefault: false,
    });
    setIsAddingCard(true);
    setEditingCardId(null);
  };

  const handleEditCard = (method) => {
    setCardForm({
      holderName: method.holderName,
      cardNumber: '',
      expiryMonth: method.expiryMonth || '',
      expiryYear: method.expiryYear || '',
      cvv: '',
      nickname: method.nickname,
      isDefault: method.isDefault,
    });
    setIsAddingCard(true);
    setEditingCardId(method.id);
  };

  const handleSaveCard = () => {
    const brand = getCardBrand(cardForm.cardNumber || '4');
    const base = {
      type: 'credit',
      brand,
      last4: (cardForm.cardNumber || '').slice(-4),
      expiryMonth: cardForm.expiryMonth,
      expiryYear: cardForm.expiryYear,
      holderName: cardForm.holderName,
      nickname: cardForm.nickname || `${cardBrands[brand].name} Card`,
      isDefault: cardForm.isDefault,
    };

    setPaymentMethods((prev) => {
      // if editing
      if (editingCardId) {
        return prev.map((m) =>
          m.id === editingCardId ? { ...m, ...base } : m,
        );
      }
      // adding
      const id = Date.now();
      if (cardForm.isDefault) prev = prev.map((m) => ({ ...m, isDefault: false }));
      return [...prev, { ...base, id }];
    });

    setIsAddingCard(false);
    setEditingCardId(null);
  };

  const handleDeleteCard = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setPaymentMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id })),
    );
  };

  const toggleCardVisibility = (id) =>
    setShowCardNumber((v) => ({ ...v, [id]: !v[id] }));

  /* ───────────────────────────────
                Tabs
  ─────────────────────────────── */
  const PaymentMethodsTab = () => (
    <div className="space-y-6">
      {/* Header & Add button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-charcoal">Payment Methods</h2>
        <button
          onClick={handleAddCard}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add New Card
        </button>
      </div>

      {/* Add / Edit Form */}
      {isAddingCard && (
        <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-charcoal">
              {editingCardId ? 'Edit Card' : 'Add New Card'}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleSaveCard}
                className="flex items-center gap-2 px-4 py-2 bg-mint-green hover:bg-green-500 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => {
                  setIsAddingCard(false);
                  setEditingCardId(null);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>

          {/* --- Form Fields (unchanged from your snippet) --- */}
          {/* Holder, number, expiry, cvv, nickname, default checkbox */}
          {/* (keep exactly as in your original code) */}
        </div>
      )}

      {/* Existing cards list */}
      <div className="space-y-4">
        {paymentMethods.map((m) => (
          <div
            key={m.id}
            className={`bg-white rounded-2xl shadow-lg border p-6 transition-all hover:shadow-xl ${
              m.isDefault ? 'border-yellow-400 bg-yellow-50' : 'border-cream'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Icon & details */}
              <div className="flex items-center gap-4">
                {/* Avatar circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    m.type === 'credit'
                      ? cardBrands[m.brand].color
                      : 'bg-blue-500'
                  }`}
                >
                  {m.type === 'credit' ? (
                    <CreditCard className="w-6 h-6 text-white" />
                  ) : (
                    <Wallet className="w-6 h-6 text-white" />
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal flex items-center gap-2">
                    {m.nickname}
                    {m.isDefault && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-400 text-white text-xs rounded-full">
                        <Star className="w-3 h-3" /> Default
                      </span>
                    )}
                  </h4>

                  {m.type === 'credit' ? (
                    <p className="text-medium-gray text-sm">
                      {showCardNumber[m.id]
                        ? `•••• ${m.last4}`
                        : '•••• •••• •••• ' + m.last4}
                      &nbsp;| Expires {m.expiryMonth}/{m.expiryYear}
                    </p>
                  ) : (
                    <p className="text-medium-gray text-sm">{m.email}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {m.type === 'credit' && (
                  <button
                    onClick={() => toggleCardVisibility(m.id)}
                    className="p-2 text-medium-gray hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {showCardNumber[m.id] ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                )}

                {!m.isDefault && (
                  <button
                    onClick={() => handleSetDefault(m.id)}
                    className="px-3 py-2 text-sm text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                  >
                    Set Default
                  </button>
                )}

                <button
                  onClick={() => handleEditCard(m)}
                  className="p-2 text-mint-green hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleDeleteCard(m.id)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const HistoryTab = () => (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-charcoal">Transaction History</h2>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-medium-gray w-5 h-5" />
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="pl-10 pr-8 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400 bg-white"
          >
            <option value="all">All Time</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        {filteredTransactions.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl shadow-lg border border-cream p-6 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-charcoal flex items-center gap-2">
                  {t.restaurant}
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(
                      t.status,
                    )}`}
                  >
                    {t.status}
                  </span>
                </h4>
                <p className="text-medium-gray text-sm">{t.paymentMethod}</p>
                <p className="text-medium-gray text-sm">
                  {new Date(t.date).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-mint-green">${t.amount.toFixed(2)}</p>
                <p className="text-sm text-medium-gray">{t.orderId}</p>
                <button className="mt-2 flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 px-3 py-1 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Receipt
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="mt-4 flex flex-wrap gap-2">
              {t.items.map((i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-cream text-coffee rounded-full text-xs"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-cream p-12 text-center">
            <Receipt className="w-10 h-10 mx-auto text-yellow-400" />
            <h3 className="mt-4 text-xl font-semibold text-charcoal">
              No transactions found
            </h3>
            <p className="text-medium-gray">
              Change the filter period to see your past orders.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const BillingTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-charcoal">Billing &amp; Security</h2>

      <div className="bg-white rounded-2xl shadow-lg border border-cream p-6 flex items-start gap-6">
        <Shield className="w-10 h-10 text-yellow-400 flex-shrink-0" />

        <div className="flex-1">
          <h3 className="font-semibold text-charcoal mb-1">Secure Payments</h3>
          <p className="text-medium-gray text-sm">
            All card information is encrypted and processed over secure channels.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
        <h3 className="font-semibold text-charcoal mb-4">Next Payment</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-medium-gray">
            <Calendar className="w-5 h-5" />
            <span>15 July 2025</span>
          </div>
          <div className="flex items-center gap-3 text-medium-gray">
            <DollarSign className="w-5 h-5" />
            <span>$24.99</span>
          </div>
          <button className="flex items-center gap-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Invoice
          </button>
        </div>
      </div>
    </div>
  );

  /* ───────────────────────────────
             Main Render
  ─────────────────────────────── */
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Tabs bar */}
      <div className="flex gap-2 bg-white rounded-lg p-1 border border-cream">
        {[
          { id: 'methods', label: 'Payment Methods' },
          { id: 'history', label: 'History' },
          { id: 'billing', label: 'Billing' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-yellow-400 text-white'
                : 'text-medium-gray hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'methods' && <PaymentMethodsTab />}
      {activeTab === 'history' && <HistoryTab />}
      {activeTab === 'billing' && <BillingTab />}
    </div>
  );
};

export default Payments;
