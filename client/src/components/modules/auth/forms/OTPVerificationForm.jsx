const OTPVerificationForm = ({ email, otpVerification, onSuccess }) => {
  const {
    otp,
    setOtp,
    isLoading,
    error,
    resendCooldown,
    isResending,
    verifyOTP,
    resendOTP,
  } = otpVerification;

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await verifyOTP(e);
    if (result.success) {
      onSuccess();
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-between">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-text-main">
            Verify Your Email
          </h2>
          <p className="mt-2 text-text-muted text-sm">
            A 6-digit code has been sent to{' '}
            <span className="font-semibold">{email}</span>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter OTP"
            required
            maxLength="6"
            className="w-full text-center text-2xl tracking-widest border border-gray-300 rounded-xl px-4 py-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          />

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-primary-hover text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? <LoadingSpinner /> : 'Verify OTP'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center mt-auto">
        <p className="text-text-muted text-sm">
          Didn't receive the code?
          <button
            onClick={resendOTP}
            disabled={resendCooldown > 0 || isResending}
            className="text-yellow-600 font-semibold ml-1 hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
          >
            {isResending
              ? 'Sending...'
              : `Resend OTP${resendCooldown > 0 ? ` (${resendCooldown}s)` : ''}`}
          </button>
        </p>
      </div>
    </div>
  );
};

// components/modules/auth/SocialLoginButton.jsx
const SocialLoginButton = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-bg-subtle transition-colors duration-200"
  >
    <img
      src="https://img.icons8.com/color/48/google-logo.png"
      alt="Google"
      className="w-6 h-6"
    />
    <span className="text-text-secondary font-medium">Continue with Google</span>
  </button>
);

// components/ui/LoadingSpinner.jsx
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default OTPVerificationForm;
