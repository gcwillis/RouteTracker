type ButtonProps = {
    text: string
    onClick?: () => void
}

function NavButton(props: ButtonProps) {
    return (
        <button type="button" onClick={props.onClick}
            className="bg-black/20 h-10 rounded-sm p-1 select-none
            border-2 border-black/5 hover:border-blue-900 active:border-white">

            {props.text}

        </button>
    )
}

export default NavButton