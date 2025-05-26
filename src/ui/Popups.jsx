import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { hidePopup } from "../state/slicers/popupSlice";

function Popups({ }) {
    const dispatch = useDispatch();
    const {isVisible, messeage, type} = useSelector(state => state.popup)

    const Wrapper = styled(motion.div)`
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: ${props => 
            props.type === "success" ? "#218838"
            : props.type === "failure" ? "#B02A37" : props.type === "warning" ? "#B38600" 
            : "rgba(18, 18, 18, 1)" };
        padding: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
    `

    const Text = styled.h1`
        flex-grow: 1;
        font-weight: 700;
        color: #FFFFFF;
        font-size: 12px;
        user-select: none;
    `

    const CloseBtn = styled(motion.svg)`
        flex-grow: 0;
        width: 12px;
        height: 12px;
        padding: 0px 20px;
        border-radius: 5px;
        cursor: pointer;
        stroke: #FFFFFF;
    `

    const popupVariants = {
        hidden: { y: '100%', opacity: 0 }, // Starts off-screen at the bottom
        visible: { y: '0%', opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } },
        exit: { y: '100%', opacity: 0, transition: { duration: 0.3 } },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <Wrapper
                    variants={popupVariants}
                    initial={"hidden"}
                    animate={"visible"}
                    exit={"exit"}
                    type={type}
                >
                    <Text>{messeage}</Text>
                    <CloseBtn viewBox="0 0 10 10"
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation()
                            dispatch(hidePopup())
                        }}
                    >
                        <path d="M1 1 L9 9 M9 1 L1 9" strokeWidth="1" />
                    </CloseBtn>
                </Wrapper>
            )}
        </AnimatePresence>
    )

}

export default Popups