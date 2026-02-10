const SocialLoginButton = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 transition-colors duration-200 hover:bg-gray-100"
  >
    <img
      src="https://img.icons8.com/color/48/google-logo.png"
      alt="Google"
      className="h-6 w-6"
    />
    <span className="text-text-secondary hover:text-text-main cursor-pointer font-medium">
      Continue with Google
    </span>
  </button>
);

export default SocialLoginButton;
