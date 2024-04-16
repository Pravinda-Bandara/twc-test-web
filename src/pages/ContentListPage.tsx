import ButtonOne from "../component/ButtonOne.tsx";
import Logo from "../component/Logo.tsx";

export function ContactListPage() {
    const contactList = [
        {
            id: 1,
            profilePic: 'https://via.placeholder.com/50',
            fullName: 'John Doe',
            gender: 'Male',
            email: 'john@example.com',
            phoneNumber: '123-456-7890',
        },
        {
            id: 2,
            profilePic: 'https://via.placeholder.com/50',
            fullName: 'Jane Smith',
            gender: 'Female',
            email: 'jane@example.com',
            phoneNumber: '987-654-3210',
        },
        {
            id: 2,
            profilePic: 'https://via.placeholder.com/50',
            fullName: 'Jane Smith',
            gender: 'Female',
            email: 'jane@example.com',
            phoneNumber: '987-654-3210',
        }
    ];

    const handleEdit = () => {
        // Implement edit functionality
    };

    const handleDelete = () => {
        // Implement delete functionality
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div>
                    <Logo textColor="text-black-500"/>
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold text-3xl ">Contact</h1>
                            <ButtonOne isBlack={true} text="Add new content"/>
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
                                {contactList.map((contact) => (
                                    <tr key={contact.id} className="text-center">
                                        <td className="py-2 px-4">
                                            <div className="flex justify-center">
                                                <img className="rounded-full h-12 w-12" src={contact.profilePic}
                                                     alt="Profile"/>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4">{contact.fullName}</td>
                                        <td className="py-2 px-4">{contact.gender}</td>
                                        <td className="py-2 px-4">{contact.email}</td>
                                        <td className="py-2 px-4">{contact.phoneNumber}</td>
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
                                                onClick={() => handleDelete()}
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
                    <button className="underline float-end" type="button"> LogOut
                    </button>
                </div>

            </div>


        </>
    );
}
