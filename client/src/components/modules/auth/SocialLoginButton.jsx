const SocialLoginButton = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="cursor-pointer w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
  >
    <img
      src="https://img.icons8.com/color/48/google-logo.png"
      alt="Google"
      className="w-6 h-6"
    />
    <span className="text-gray-700 hover:text-gray-800 font-medium cursor-pointer">
      Continue with Google
    </span>
  </button>
);

export default SocialLoginButton;
