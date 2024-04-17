
import Logo from "../component/Logo.tsx";

import {
    Gender,
    useDeleteContactMutation,
    useGetContactListQuery,
    useUpdateContactMutation,
} from "../hooks/contactHooks.ts";
import {useContext, useEffect, useState} from "react";
import {Store} from "../Store.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ApiError, getError} from "../utils/ErrorUtil.ts";


export function ContactListPage() {

    const navigate = useNavigate()
    const redirect ='/login'
    const addNewContact ='/addcontact'

    const { data:contacts,refetch} = useGetContactListQuery();
    const { mutateAsync: deleteContact } = useDeleteContactMutation();
    const { mutateAsync: updateUser} = useUpdateContactMutation()

    const {state, dispatch} = useContext(Store)

    const [editRow, setEditRow] = useState('')
    const [nameEdit, setNameEdit] = useState('');
    const [genderEdit, setGenderEdit] = useState('')
    const [emailEdit, setEmailEdit] = useState('')
    const [numberEdit, setNumberEdit] = useState('')



    useEffect(() => {
        if (state.userInfo === null ) {
            navigate(redirect);
        }if (contacts?.length==0){
            navigate("/welcome")
        }
    }, [state.userInfo, navigate,contacts]);

    const handleEdit = (rowId: string, name: string, gender: Gender, email: string, number: string) => {
        setNameEdit(name)
        setGenderEdit(gender)
        setEmailEdit(email)
        setNumberEdit(number)
        setEditRow(rowId)
    };

    const handleLogOut = () => {
        dispatch({ type: 'USER_SIGNOUT' })
        localStorage.removeItem('userInfo')
        navigate(redirect)
    };

    const handleDelete = async (contactId:string) => {
        try {
            await deleteContact(contactId);
            refetch();
        } catch (err) {
            toast.error(getError(err as unknown as ApiError));
        }
    };
    async function handleSaveEdit() {
        try {
            await updateUser({
                _id: editRow!,
                name: nameEdit,
                email: emailEdit,
                gender: genderEdit,
                number: numberEdit
            });
        } catch (err) {
            toast.error(getError(err as unknown as ApiError));
        }
        setEditRow('');
        refetch();
    }


    return (
        <>
            <div className="flex justify-center items-center h-screen flex-col">
                <div>
                    <Logo textColor="text-white" imageSize="w-10" textSize="text-3xl" />
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold text-3xl text-white">Contact</h1>

                            <button type="button" className="custom-button w-1/4"
                                    onClick={() => navigate(addNewContact)}>add new contest
                            </button>

                        </div>
                        <div className="rounded-3xl border-2 pb-4 px-12 flex justify-center bg-white">
                            <table>
                                <thead className="px-12">
                                <tr className="text-center ">
                                    <th className="py-5">Profile</th>
                                    <th>Full Name</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {contacts?.map((contact) => (
                                    <tr key={contact._id} className="text-center">
                                        <td className="w-1/6">
                                            <div className="flex justify-center">
                                                {contact.gender == 'male' ?
                                                    <img className="rounded-full h-12 w-12 my-1"
                                                         src="/src/assets/maleProPic.png"
                                                         alt="Profile"/> :
                                                    <img className="rounded-full h-12 w-12 my-1"
                                                         src="/src/assets/femaleProPic.png"
                                                         alt="Profile"/>}
                                            </div>
                                        </td>
                                        {editRow == contact._id ? <>
                                            <td><input className="bg-blue-100 nameInput"
                                                       onChange={(e) => setNameEdit(e.target.value)} value={nameEdit}
                                                       type="text"/></td>
                                            <td><input className="bg-blue-100 genderInput"
                                                       onChange={(e) => setGenderEdit(e.target.value)}
                                                       value={genderEdit} type="text"/></td>
                                            <td><input className="bg-blue-100 emailInput"
                                                       onChange={(e) => setEmailEdit(e.target.value)} value={emailEdit}
                                                       type="text"/></td>
                                            <td><input className="bg-blue-100 numberInput"
                                                       onChange={(e) => setNumberEdit(e.target.value)}
                                                       value={numberEdit} type="text"/></td>
                                            <td>
                                                <button className="w-max px-2 m-0 custom-button"
                                                        onClick={() => handleSaveEdit()}>Save
                                                </button>
                                            </td>
                                        </> : <>
                                            <td><input  disabled={false}
                                                       value={contact.name} type="text" className="nameInput" /></td>
                                            <td><input  disabled={false}
                                                       value={contact.gender} className="genderInput" type="text"/></td>
                                            <td><input  disabled={false}
                                                       value={contact.email} type="text" className="emailInput" /></td>
                                            <td><input disabled={false}
                                                       value={contact.number} type="text" className="numberInput" /></td>
                                            <td>
                        <span role="img"
                              aria-label="Edit"
                              className="cursor-pointer m-0.5"
                              onClick={() => handleEdit(contact._id, contact.name, contact.gender, contact.email, contact.number)}>✏️</span>
                                                <span role="img"
                                                      aria-label="Delete"
                                                      className="cursor-pointer m-0.5"
                                                      onClick={() => handleDelete(contact._id)}>🗑️</span>
                                            </td>
                                        </>}


                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="self-end mb-10">
                    <button className="underline float-end text-white mt-5" type="button"
                            onClick={() => handleLogOut()}> LogOut
                    </button>
                </div>


            </div>


        </>
    );
}
