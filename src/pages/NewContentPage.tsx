import { useState, FormEvent } from 'react';
import Logo from "../component/Logo.tsx";
import ButtonOne from "../component/ButtonOne.tsx";

export function NewContentPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');

    const handleAddContent = (event: FormEvent) => {
        event.preventDefault();
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Phone Number:', phoneNumber);
        console.log('Gender:', gender);
    };

    return (
        <>
        <div className="flex justify-evenly items-center h-screen">
            <div>
                <Logo textColor="text-black-500"/>
                <h1 className="text-3xl font-bold py-10">New Content</h1>
                <form onSubmit={handleAddContent} className="grid grid-cols-2 gap-4 items-center">
                    <div>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="full name"
                            required
                            className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e-mail"
                            required
                            className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="phone number"
                            required
                            className="border-black border-2 rounded-3xl h-10
                                p-5 my-2"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label>Gender:</label>
                        <div>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={() => setGender('male')}

                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={() => setGender('female')}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>

                </form>
                <div>
                    <ButtonOne isBlack={true} text="Add Content"/>
                </div>
                <button className="underline float-end" type="button"> LogOut
                </button>
            </div>
        </div>
        </>
    );
}
