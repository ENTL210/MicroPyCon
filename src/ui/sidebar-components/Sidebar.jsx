import styled from "styled-components";
import FileTab from "./FileTab";

function Sidebar() {
    const Sidebar = styled.div`
    width: ${(props) => props.sidebarWidth || '215px'};
    position: relative;
    margin: 50px 0px 7.5px 0;
    padding:5px;
    color:black;
    display: flex;
    justify-content: flex-start;
    padding: 0px 0px 0px 5px;
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