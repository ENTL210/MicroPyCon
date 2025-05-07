import React from "react";
import { motion, AnimatePresence, easeIn, easeOut} from 'motion/react';
import styled from 'styled-components'

import { useDispatch, useSelector } from "react-redux";
import { updateDirectoryPath } from "../../state/directory/directorySlice";


function WelcomingScreen() {
    const dispatch = useDispatch();
    const WelcomingScreen = styled(motion.div)`
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    `

    const WelcomePhraseWrapper = styled(motion.p)`
    background: linear-gradient(45deg, #FF75C3, #FFA647, #FFE83F, #9FFF5B, #7EEBCE, #70E2FF);
    background-size: 400% 400%;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    font-size: 40px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    `

    const FileDialogLauncherWrapper = styled(motion.div)`
    position: absolute;
    bottom: 10%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    `

    const FileDialogLauncherBtn = styled(motion.button)`
    background: rgba(18, 18, 18, 1); 
    box-shadow: 0.5px 0.5px 0.5px 0.2px rgba( 0, 0, 0, 0.3);
    border: 1.2px solid rgba(255, 255, 255, .3);
    border-radius: 5px;
    -webkit-backdrop-filter: blur(10px) saturate(180%);
    cursor: pointer;
    color: inherit;
    font: inherit;
    outline: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    `

    const Text = styled.h1`
    font-weight: 700;
    color: #FFFFFF;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    `

    const WelcomePhraseAnimation = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            backgroundPosition: '100% 0%',
            transition: {
                delay: 0.5,
                ease: 'easeInOut',
                duration: 4,
                staggerChildren: 0.05,
                repeat: Infinity,  // Repeat the animation infinitely
                repeatType: 'mirror',
            }
        }
    }

    const WelcomePhraseTextAnimation = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
        }
    }

    const welcomeText = "Welcome to MicroPycon"

    return (
        <WelcomingScreen
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0
            }}
            transition={{
                ease: easeOut,
                duration: 1
            }}
        >
            <WelcomePhraseWrapper
                variants={WelcomePhraseAnimation}
                initial="hidden"
                animate="visible"
            >
                {welcomeText.split("").map((char, index) => {
                    return (
                        <motion.span key={char + "-" + index} variants={WelcomePhraseTextAnimation}>
                            {char}
                        </motion.span>
                    )
                })}
            </WelcomePhraseWrapper>
            <FileDialogLauncherWrapper>
                <FileDialogLauncherBtn
                    whileHover={{
                        backgroundColor: "rgba(46,150,255, 1)"
                    }}
                    onClick={async () => {
                        try {
                            const filePath = await window.electron.openFileDialog();
                            if (filePath.length > 0) {
                                dispatch(updateDirectoryPath(filePath[0]))
                            }
                        } catch (err) {
                            console.log("Failed to open dialog", err)
                        }
                    }}
                >
                    <Text>Open a File</Text> 
                </FileDialogLauncherBtn>
                <FileDialogLauncherBtn
                    whileHover={{
                        backgroundColor: "rgba(46,150,255, 1)",
                    }}
                    onClick={async () => {
                        try {
                            const folderPath = await window.electron.openDirectoryDialog();
                            if (folderPath.length > 0) {
                                dispatch(updateDirectoryPath(folderPath[0]))
                            }
                        } catch (err) {
                            console.log("Failed to open dialog", err)
                        }
                    }}
                >
                    <Text>Open a Folder</Text> 
                </FileDialogLauncherBtn>
            </FileDialogLauncherWrapper>
        </WelcomingScreen>
    )
}

export default WelcomingScreen;