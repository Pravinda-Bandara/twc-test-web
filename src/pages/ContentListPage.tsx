
import Logo from "../component/Logo.tsx";

import {useDeleteContactMutation, useGetContactListQuery} from "../hooks/contactHooks.ts";
import {useContext, useEffect} from "react";
import {Store} from "../Store.tsx";
import {useNavigate} from "react-router-dom";


export function ContactListPage() {

    const navigate = useNavigate()
    const redirect ='/login'
    const addNewContact ='/addcontact'
    const { data:contacts,refetch} = useGetContactListQuery();
    const { mutateAsync: deleteContact } = useDeleteContactMutation();
    const {state, dispatch} = useContext(Store)
    console.log(state.userInfo);
    const handleEdit = () => {
        // Implement edit functionality
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
                                    <th className="py-2 px-4">Profile Pic</th>
                                    <th className="py-2 px-4">Full Name</th>
                                    <th className="py-2 px-4">Gender</th>
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Phone Number</th>
                                    <th className="py-2 px-4">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {contacts?.map((contact) => (
                                    <tr key={contact._id} className="text-center">
                                        <td className="py-2 px-4">
                                            <div className="flex justify-center">
                                                <img className="rounded-full h-12 w-12" src="/src/assets/react.svg"
                                                     alt="Profile"/>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4">{contact.name}</td>
                                        <td className="py-2 px-4">{contact.gender}</td>
                                        <td className="py-2 px-4">{contact.email}</td>
                                        <td className="py-2 px-4">{contact.number}</td>
                                        <td className="py-2 px-4">
                        <span
                            role="img"
                            aria-label="Edit"
                            className="cursor-pointer m-0.5"
                            onClick={() => handleEdit()}
                        >
                            ✏️
                        </span>
                                            <span
                                                role="img"
                                                aria-label="Delete"
                                                className="cursor-pointer m-0.5"
                                                onClick={() => handleDelete(contact._id)}
                                            >
                            🗑️
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className="underline float-end" type="button" onClick={() =>handleLogOut()}> LogOut
                    </button>
                </div>

            </div>


        </>
    );
}
