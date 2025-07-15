import React, { useState } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Database,
} from 'lucide-react';
import Icon from '../../components/ui/Icon';

const Settings = () => {
  const [settings, setSettings] = useState({
    /* ---------- Notifications ---------- */
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotionalEmails: true,
    weeklyDigest: false,
    soundNotifications: true,
    /* ---------- Privacy ---------- */
    profileVisibility: 'public',
    showOrderHistory: false,
    shareLocation: true,
    allowReviews: true,
    /* ---------- App Prefs ---------- */
    darkMode: false,
    language: 'en',
    currency: 'USD',
    autoReorder: true,
    savePaymentMethods: true,
    rememberAddresses: true,
    /* ---------- Marketing ---------- */
    personalizedAds: true,
    dataCollection: true,
    thirdPartySharing: false,
    marketingCommunications: true,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  /* ───────────────────────────────
                Helpers
  ─────────────────────────────── */
  const handleToggle = (key) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  const handleSelectChange = (key, val) =>
    setSettings((s) => ({ ...s, [key]: val }));

  const handleSaveSettings = () => console.log('Settings saved:', settings);

  const handleResetSettings = () => {
    if (window.confirm('Reset all settings to default?')) {
      setSettings({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        orderUpdates: true,
        promotionalEmails: false,
        weeklyDigest: false,
        soundNotifications: true,
        profileVisibility: 'public',
        showOrderHistory: false,
        shareLocation: false,
        allowReviews: true,
        darkMode: false,
        language: 'en',
        currency: 'USD',
        autoReorder: false,
        savePaymentMethods: true,
        rememberAddresses: true,
        personalizedAds: false,
        dataCollection: true,
        thirdPartySharing: false,
        marketingCommunications: false,
      });
    }
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE MY ACCOUNT') {
      console.log('Account deletion requested');
      setShowDeleteConfirm(false);
    }
  };

  /* ───────────────────────────────
           Reusable Components
  ─────────────────────────────── */
  const ToggleSwitch = ({ enabled, onToggle, disabled }) => (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
        enabled ? 'bg-yellow-400' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingItem = ({
    icon,
    title,
    description,
    children,
    warning = false,
  }) => (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
        warning ? 'border-red-200 bg-red-50' : 'border-cream bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            warning ? 'bg-red-100' : 'bg-yellow-100'
          }`}
        >
          <Icon name={icon} className={`w-5 h-5 ${warning ? 'text-red-600' : 'text-yellow-600'}`} />
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold ${warning ? 'text-red-800' : 'text-charcoal'}`}>
            {title}
          </h3>
          <p
            className={`text-sm mt-1 ${
              warning ? 'text-red-600' : 'text-medium-gray'
            }`}
          >
            {description}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );

  /* ───────────────────────────────
                JSX
  ─────────────────────────────── */
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Settings</h1>
          <p className="text-medium-gray mt-1">
            Manage your account preferences and privacy
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleResetSettings}
            className="flex items-center gap-2 px-4 py-2 text-medium-gray hover:text-charcoal border border-cream hover:border-gray-300 rounded-lg transition-colors"
          >
            <Icon name={"refresh-cw"} className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Icon name={"save"} className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* 1. Notifications */}
      {/* (unchanged code above) */}

      {/* 2. Privacy & Security */}
      {/* (unchanged code above) */}

      {/* 3. App Preferences */}
      {/* (unchanged code above) */}

      {/* 4. Data & Marketing */}
      <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
        <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-3">
          <Icon name={"database"} className="w-6 h-6 text-yellow-600" />
          Data &amp; Marketing
        </h2>
        <div className="space-y-4">
          <SettingItem
            icon={"star"}
            title="Personalized Ads"
            description="Show ads based on your preferences and order history"
          >
            <ToggleSwitch
              enabled={settings.personalizedAds}
              onToggle={() => handleToggle('personalizedAds')}
            />
          </SettingItem>

          <SettingItem
            icon={"database"}
            title="Data Collection"
            description="Allow collection of anonymized usage data to improve our service"
          >
            <ToggleSwitch
              enabled={settings.dataCollection}
              onToggle={() => handleToggle('dataCollection')}
            />
          </SettingItem>

          <SettingItem
            icon={"users"}
            title="Third-Party Sharing"
            description="Permit sharing of limited data with trusted partners"
          >
            <ToggleSwitch
              enabled={settings.thirdPartySharing}
              onToggle={() => handleToggle('thirdPartySharing')}
            />
          </SettingItem>

          <SettingItem
            icon={"mail"}
            title="Marketing Communications"
            description="Receive product updates and newsletters"
          >
            <ToggleSwitch
              enabled={settings.marketingCommunications}
              onToggle={() => handleToggle('marketingCommunications')}
            />
          </SettingItem>
        </div>
      </div>

      {/* 5. Danger Zone */}
      <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-6">
        <h2 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-3">
          <Icon name={"alert-triangle"} className="w-6 h-6 text-red-600" />
          Danger Zone
        </h2>
        <div className="space-y-4">
          <SettingItem
            icon={"lucide-trash-2"}
            title="Delete Account"
            description="Permanently delete your account and all associated data"
            warning
          >
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Delete
            </button>
          </SettingItem>
        </div>

        {/* Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="mt-6 p-4 border border-red-200 rounded-lg bg-red-50 space-y-3">
            <p className="text-red-700">
              Type <strong>DELETE MY ACCOUNT</strong> to confirm.
            </p>
            <input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-400"
            />
            <div className="flex gap-2">
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE MY ACCOUNT'}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
