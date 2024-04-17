
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
    const {state, dispatch} = useContext(Store)
    const [editRow, setEditRow] = useState('')

    const [nameEdit, setNameEdit] = useState('');
    const [genderEdit, setGenderEdit] = useState('')
    const [emailEdit, setEmailEdit] = useState('')
    const [numberEdit, setNumberEdit] = useState('')

    const { mutateAsync: updateUser, isPending: loadingUpdate } =
        useUpdateContactMutation()

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
    if (state.userInfo==null){
        navigate(redirect)
    }
    useEffect(() => {
        if (state.userInfo === null ) {
            navigate(redirect);
        }
    }, [state.userInfo, navigate]);

    const handleDelete = async (contactId:string) => {
        try {
            await deleteContact(contactId);
            refetch();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    async function handleSaveEdit() {
        console.log(editRow)
        try {
            await updateUser({
                _id: editRow!,
                name: nameEdit,
                email: emailEdit,
                gender: genderEdit,
                number: numberEdit
            });
            toast.success('User updated successfully');
        } catch (err) {
            toast.error(getError(err as unknown as ApiError));
        }
        setEditRow('');
        refetch();
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div>
                    <Logo textColor="text-black-500"/>
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold text-3xl ">Contact</h1>
                            <button type="button" onClick={()=>navigate(addNewContact)}>add new contest</button>
                        </div>
                        <div className="rounded-3xl border-2 p-5 flex justify-center">
                            <table>
                                <thead >
                                <tr className="text-center">
                                    <th >Profile Pic</th>
                                    <th >Full Name</th>
                                    <th >Gender</th>
                                    <th >Email</th>
                                    <th >Phone Number</th>
                                    <th >Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {contacts?.map((contact) => (
                                    <tr  key={contact._id} className="text-center">
                                        <td className="w-1/6">
                                            <div className="flex justify-center">
                                                {contact.gender == 'male' ?
                                                    <img className="rounded-full h-12 w-12" src="/src/assets/maleProPic.png"
                                                         alt="Profile"/> :
                                                    <img className="rounded-full h-12 w-12" src="/src/assets/femaleProPic.png"
                                                         alt="Profile"/>}
                                            </div>
                                        </td>
                                        {editRow==contact._id? <>
                                            <td ><input className="text-center bg-blue-300"  onChange={(e) => setNameEdit(e.target.value)} value={nameEdit} type="text"/></td>
                                            <td ><input className="text-center bg-blue-300" onChange={(e) => setGenderEdit(e.target.value)}  value={genderEdit} type="text"/></td>
                                            <td ><input className="text-center bg-blue-300" onChange={(e) => setEmailEdit(e.target.value)}  value={emailEdit} type="text"/></td>
                                            <td ><input className="text-center bg-blue-300" onChange={(e) => setNumberEdit(e.target.value)}  value={numberEdit} type="text"/></td>
                                            <td><button onClick={()=>handleSaveEdit()}>Save</button></td>
                                        </> : <>
                                            <td ><input className="text-center outline-none"  disabled={false} value={contact.name} type="text"/></td>
                                            <td ><input className="text-center outline-none" disabled={false} value={contact.gender} type="text"/></td>
                                            <td ><input className="text-center outline-none" disabled={false} value={contact.email} type="text"/></td>
                                            <td ><input className="text-center outline-none" disabled={false} value={contact.number} type="text"/></td>
                                            <td >
                        <span role="img"
                              aria-label="Edit"
                              className="cursor-pointer m-0.5"
                              onClick={() => handleEdit(contact._id,contact.name,contact.gender,contact.email,contact.number)}>✏️</span>
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
                    <button className="underline float-end" type="button" onClick={() => handleLogOut()}> LogOut
                    </button>
                </div>

            </div>


        </>
    );
}
