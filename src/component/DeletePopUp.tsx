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
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50 ${isVisible ? 'block' : 'hidden'}`}>
            <div className="bg-white px-9 pb-2 pt-5 rounded-2xl shadow-md">
                <p className="text-lg mb-4">{message}</p>
                <div className="flex justify-center">
                    <button className="custom-button  p-1 mb-3 mt-4 mr-2 border-customBlue" onClick={handleConfirm}>Yes</button>
                    <button className="custom-button-white p-1 mb-3 mt-4 " onClick={handleCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopUp;
