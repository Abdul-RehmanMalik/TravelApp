interface SnackbarProps {
  message: string;
  onClose: () => void;
}
export default function FailureSnackbar({ message, onClose }: SnackbarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-center z-50">
      <div className="w-full max-w-xs p-4 mb-4 text-gray-500 bg-yellow-100 rounded-lg shadow dark:bg-yellow-800 dark:text-yellow-200">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-9.293a1 1 0 01-1.414 1.414L9 10.414V13a1 1 0 11-2 0v-3a1 1 0 012 0v2.586l1.293-1.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Warning icon</span>
            <span className="ml-2 text-sm font-medium">{message}</span>
          </div>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
