import NavButton from "./NavButton"

type NavBarProps = {
    isCreateRouteOpen: boolean
    onToggleCreateRoute: () => void
}

function NavBar({ isCreateRouteOpen, onToggleCreateRoute }: NavBarProps) {
    return (
        <div className="bg-gray-800 rounded-md h-10 shadow-md shadow-black/20">
            <div className="flex justify-center">
                <NavButton
                    text={isCreateRouteOpen ? "Close" : "Add Route"}
                    onClick={onToggleCreateRoute}
                ></NavButton>
            </div>
        </div>
    )
}

export default NavBar