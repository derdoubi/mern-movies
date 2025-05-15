const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="relative bg-slate-800 text-white border-2 border-blue-400 rounded-xl shadow-2xl w-11/12 max-w-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-blue-300 hover:text-blue-200 text-3xl font-bold transition duration-200"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
