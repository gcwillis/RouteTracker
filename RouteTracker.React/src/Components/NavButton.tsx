type ButtonProps = {
    text: string
}

function NavButton(props: ButtonProps) {
    return (
        <h2 
            className="bg-black/20 h-10 rounded-sm p-1 select-none
            border-2 border-black/5 hover:border-blue-900 active:border-white">

            {props.text}

        </h2>
    )
}

export default NavButton