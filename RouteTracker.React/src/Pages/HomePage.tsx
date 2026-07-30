import RouteTile from "../Components/RouteTile"

const red = "#BD0000"
const orange = "#DE4A00"
const yellow = "#FFEE14"
const green = "#1D8216"
const blue = "#0072C4"
const purple = "#4E1C8A"
const pink = "#FF00FF"
const white = "#F2F2F2"
const black = "#212121"

function HomePage() {
    return (
        <>
            <RouteTile grade="5.7" color={red} date="12/12/2026" setter="bob" location="Line 40" />
            <RouteTile grade="5.8" color={orange} date="12/12/2026" setter="bob" location="Line 40" />
            <RouteTile grade="5.9" color={yellow} date="12/12/2026" setter="bob" location="Line 40" />
            <RouteTile grade="5.10" color={green} date="12/12/2026" setter="bob" location="Line 40" />
            <RouteTile grade="5.11" color={blue} date="12/12/2026" setter="bob" location="Section 4" />
            <RouteTile grade="5.12" color={purple} date="12/12/2026" setter="bob" location="Line 40" />
            <RouteTile grade="5.12a" color={pink} date="12/12/2026" setter="bob" location="Line 40" />
            <RouteTile grade="5.12b" color={white} date="12/12/2026" setter="bob" location="Line 40" />
            <RouteTile grade="5.13c" color={black} date="12/12/2026" setter="bob" location="Line 40" />
        </>
    )
}

export default HomePage