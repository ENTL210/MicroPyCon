import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react';
import styled from 'styled-components'
import Sidebar from './sidebar-components/Sidebar'
import { easeIn, easeOut } from 'motion';
import fileIcon from './assets/file-icon.png'
import folderIcon from './assets/folder-icon.png'

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [selectedFolderPath, setSelectedFolderPath] = useState("")
  const [selectedFilePath, setSelectedFilePath] = useState("")
  const [selectedFolder, setSelectedFolder] = useState([])

  useEffect(() => {
    window.electron.onFetchSelectedDirectory((event, path) => {
      setSelectedFolderPath("")
      setSelectedFolderPath(path)

    });
    window.electron.onFetchSelectedFile((event, path) => {
      setSelectedFolderPath("")
      setSelectedFilePath(path)
    })
  })

  useEffect(() => {
    console.log(selectedFolderPath)
    async function output()  {
      try {
        const files = await window.electron.getDirectoryContents(selectedFolderPath);
        setSelectedFolder(files)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
 
    if (selectedFolderPath.length > 0) {
      output()
    }

  }, [selectedFolderPath])

  const RootContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  `

  const Main = styled(motion.div)`
  background-color: rgba(44,44,43,1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `

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
    background: linear-gradient(45deg, #ff6347, #4CAF50, #1E90FF, #ff6347);
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
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #464950;
    padding: 10px;
    border-radius: 50%;

    img {
      width: 25px;
    }
  `

  const WelcomePhraseAnimation = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      backgroundPosition: '100% 0%',
      transition: {
        delay: 0.5,
        ease: 'linear',
        duration: 2.5,
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
    <RootContainer>
      <Sidebar sidebarWidth={`${sidebarWidth}px`} selectedDirectory={selectedFolder}/>
      <Main
        initial={{
          width: '100vw',
          margin: '50px 7.5px 7.5px 7.5px',
        }}
        animate={{
          opacity: 1,
          width: (selectedFilePath.length > 0 || selectedFolderPath.length > 0) ? `calc(100vw - ${sidebarWidth}px)` : '100vw',
          margin: (selectedFilePath.length > 0 || selectedFolderPath.length > 0) ? `7.5px 7.5px 7.5px 7.5px ` : '50px 7.5px 7.5px 7.5px',
          transition: {
            ease: easeIn,
            duration: 0.5,
          }
        }}
      >

        <AnimatePresence>
          {(selectedFilePath.length == 0 && selectedFolderPath.length == 0) && (
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
                        setSelectedFilePath(filePath)
                      }
                    } catch (err) {
                      console.log("Failed to open dialog", err)
                    }
                  }}
                >
                  <img src={fileIcon} alt="" />
                </FileDialogLauncherBtn>
                <FileDialogLauncherBtn
                  whileHover={{
                    backgroundColor: "rgba(46,150,255, 1)"
                  }}
                  onClick={async () => {
                    try {
                      const folderPath = await window.electron.openDirectoryDialog();
                      if (folderPath.length > 0) {
                        setSelectedFolderPath(folderPath[0])
                        // try {
                        //   const files = await window.electron.getDirectoryContents(folderPath[0]);
                        //   setSelectedFolder(files)
                        // } catch (err) {
                        //   console.log("Error: ", err)
                        // }
                      }
                    } catch (err) {
                      console.log("Failed to open dialog", err)
                    }
                  }}
                >
                  <img src={folderIcon} alt="" />
                </FileDialogLauncherBtn>
              </FileDialogLauncherWrapper>
            </WelcomingScreen>
          )}
        </AnimatePresence>

      </Main>
    </RootContainer>
  )
}

export default App
