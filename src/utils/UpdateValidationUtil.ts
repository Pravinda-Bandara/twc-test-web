import { toast } from 'react-toastify';

export function UpdateValidationUtil(name:string, number:string, email:string, gender:string) {
    if (name.trim() === '') {
        toast.error('Name cannot be empty');
        return 'Name cannot be empty';
    }

    if (!/^[\d\s+-]+$/.test(number.trim())) {
        toast.error('Number must be a valid number');
        return 'Number must be a valid number';
    }

    // Regular expression for validating email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
        toast.error('Invalid email format');
        return 'Invalid email format';
    }

    if (gender !== 'male' && gender !== 'female') {
        toast.error('Gender must be either "male" or "female"');
        return 'Gender must be either "male" or "female"';
    }

    return ''; // Return empty string if all validations pass
}