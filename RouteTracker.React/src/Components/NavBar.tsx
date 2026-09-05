import NavButton from "./NavButton"

function NavBar() {
    return (
        <div className="bg-gray-800 rounded-md h-10 shadow-md shadow-black/20">
            <div className="flex justify-center">
                <NavButton text="Add Route"></NavButton>
            </div>
        </div>
    )
}

export default NavBar