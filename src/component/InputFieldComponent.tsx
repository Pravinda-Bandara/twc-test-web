import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputFieldComponent: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="custom-input"
        />
    );
};

export default InputFieldComponent;
