import { useDispatch, useSelector } from "react-redux";
import { ContactState, setError, setModalState } from "../stores/contactSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: ContactState) => state.isModalOpen);

  const closeModal = () => {
    dispatch(setModalState(false));
    dispatch(setError(""));
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New Contact</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Avatar URL</label>
                <input
                  type="text"
                  name="avatar"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
