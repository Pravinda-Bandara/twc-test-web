import { useState } from 'react';

// Define the type for the props
type DeletePopUpProps = {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

const DeletePopUp: React.FC<DeletePopUpProps> = ({ message, onConfirm, onCancel }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleConfirm = () => {
        setIsVisible(false);
        onConfirm();
    };

    const handleCancel = () => {
        setIsVisible(false);
        onCancel();
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ${isVisible ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded shadow-md">
                <p className="text-lg mb-4">{message}</p>
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded" onClick={handleConfirm}>Yes</button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={handleCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopUp;
