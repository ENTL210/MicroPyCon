import styled from "styled-components";
import FileTab from "./FileTab";

function Sidebar() {
    const Sidebar = styled.div`
    width: 215px;
    margin: 50px 0px 7.5px 15px;
    color:black;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    font-weight: 700;
    `

    return(
        <Sidebar>
            <FileTab/>
        </Sidebar>
    )
}

export default Sidebar