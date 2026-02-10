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
    <div className="flex flex-1 flex-col justify-between">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-text-main text-3xl font-bold">
            Verify Your Email
          </h2>
          <p className="text-text-muted mt-2 text-sm">
            A 6-digit code has been sent to{' '}
            <span className="font-semibold">{email}</span>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-red-500">
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
            className="w-full rounded-xl border border-gray-300 px-4 py-4 text-center text-2xl tracking-widest placeholder-gray-400 transition-all focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="bg-primary-hover w-full rounded-xl py-3 font-semibold text-white shadow-lg transition-colors hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? <LoadingSpinner /> : 'Verify OTP'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-auto text-center">
        <p className="text-text-muted text-sm">
          Didn't receive the code?
          <button
            onClick={resendOTP}
            disabled={resendCooldown > 0 || isResending}
            className="ml-1 font-semibold text-yellow-600 hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
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
    className="hover:bg-bg-subtle flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 transition-colors duration-200"
  >
    <img
      src="https://img.icons8.com/color/48/google-logo.png"
      alt="Google"
      className="h-6 w-6"
    />
    <span className="text-text-secondary font-medium">
      Continue with Google
    </span>
  </button>
);

// components/ui/LoadingSpinner.jsx
const LoadingSpinner = () => (
  <svg
    className="h-5 w-5 animate-spin text-white"
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
