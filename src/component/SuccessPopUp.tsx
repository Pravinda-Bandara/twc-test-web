import React from 'react';

// Define the type for the props
type SuccessPopUpProps = {
    message: string;
    onOk: () => void;
};

const SuccessPopUp: React.FC<SuccessPopUpProps> = ({ message, onOk }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md">
                <p className="text-lg mb-4">{message}</p>
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded" onClick={onOk}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPopUp;
