import Logo from "../component/Logo.tsx";

export function WelcomePage() {
    return (
        <>
            <Logo textColor="text-black-500" />
            <h1>Welcome</h1>
            <p>This is where your contacts will live. Click the button bellow to add a new content</p>
            <button type="button">add contacts</button>
        </>

    );
}