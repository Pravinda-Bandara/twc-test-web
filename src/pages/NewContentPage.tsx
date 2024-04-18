import {useState, FormEvent, useContext, useEffect} from 'react';
import Logo from "../component/Logo.tsx";
import { Store } from "../Store.tsx";
import {Gender, useSignupMutation} from "../hooks/contactHooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ApiError, getError} from "../utils/ErrorUtil.ts";
import {UpdateValidationUtil} from "../utils/UpdateValidationUtil.ts";

export function NewContentPage() {
    const navigate = useNavigate()
    const redirect ='/login'
    const { state, dispatch } = useContext(Store);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');


    const userID: string|undefined = state.userInfo;
    const signupMutation = useSignupMutation();

    const handleAddContent = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const validationError = UpdateValidationUtil(fullName, phoneNumber, email, gender);
            if (validationError) {
                return;
            }
            await signupMutation.mutateAsync({
                user: userID!,
                name: fullName,
                number: phoneNumber,
                email: email,
                gender: gender as Gender
            });
        } catch (err) {
            toast.error(getError(err as ApiError),{
                autoClose:1000
            })
        }
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setGender('');
    };
    const handleLogOut = () => {
        dispatch({ type: 'USER_SIGNOUT' })
        localStorage.removeItem('userInfo')
        navigate(redirect)
    };
    useEffect(() => {
        if (state.userInfo === null ) {
            navigate(redirect);
        }
    }, [state.userInfo, navigate]);

    return (
        <>
            <div className="flex justify-evenly items-center h-screen flex-col">
                <div>
                    <Logo textColor="text-white" imageSize="w-10" textSize="text-3xl" />

                    <h1 className="text-4xl text-white font-bold py-10">New Content</h1>
                    <form onSubmit={handleAddContent} className="grid grid-cols-2 gap-4 items-center">
                        <div>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="full name"
                                className="rounded-3xl h-10 py-6 px-8 my-2 mr-5 text-customBlue w-11/12 placeholder-customBlue"

                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e-mail"
                                className="rounded-3xl h-10 py-6 px-8 my-2  text-customBlue w-11/12  placeholder-customBlue"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="phone number"
                                className="rounded-3xl h-10 py-6 px-8 my-2 mr-5 text-customBlue w-11/12  placeholder-customBlue"
                            />
                        </div>
                        <div className="flex px-4">
                            <label className="text-white mr-10">Gender:</label>
                            <div>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={() => setGender('male')}
                                    required
                                    className="w-3"

                                />
                                <label htmlFor="male" className="text-white px-1 pr-14">Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={() => setGender('female')}
                                    required
                                    className="w-3"
                                />
                                <label htmlFor="female" className="text-white px-1">Female</label>
                            </div>
                        </div>
                        <button type="submit"
                                className="custom-button w-3/5"
                        >
                            Add Contact
                        </button>
                    </form>
                </div>
                <div className="self-end">
                    <div className="self-end">
                        <div className="float-end flex flex-row-reverse">


                            <button className="underline  text-white mx-2 text-xl" type="button"
                                    onClick={() => handleLogOut()}>LogOut
                            </button>
                            <i className="bi bi-box-arrow-left text-2xl text-white"></i>

                            <button className="underline float-end text-white text-xl px-9" type="button"
                                    onClick={() => navigate("/contacts")}> Show My Contacts
                            </button>

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}
