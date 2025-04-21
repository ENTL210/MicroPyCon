import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react';
import styled from 'styled-components'
import Sidebar from './sidebar-components/Sidebar'
import { easeIn, easeOut } from 'motion';
import WelcomingScreen from './main-component/WelcomingScreen';

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [selectedFolderPath, setSelectedFolderPath] = useState("")
  const [selectedFilePath, setSelectedFilePath] = useState("")
  const [selectedFolder, setSelectedFolder] = useState([])
  const openedFilesArr = useRef([
    {
      name: 'README.md',
      path: "/Users/edwardl210/Documents/Coding/CHS-Daily-Schedule-App/README.md",
      fileExtension: '.md',
      subDirectory: [],
    }
  ])

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
    async function output() {
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
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(42, 42, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.125);
  border-radius: 9px;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  `

  const Main = styled(motion.div)`
  background-color: rgb(35,35,35);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `

  return (
    <RootContainer>
      <Sidebar sidebarWidth={`${sidebarWidth}px`} selectedDirectory={selectedFolder} openedFilesArr={openedFilesArr}/>
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


        {(selectedFilePath.length == 0 && selectedFolderPath.length == 0) && (
          <WelcomingScreen setSelectedFilePath={setSelectedFilePath} setSelectedFolderPath={setSelectedFolderPath}/>
        )}

      </Main>
    </RootContainer>
  )
}

export default App
