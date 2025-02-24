import { useState, useEffect } from 'react'
import { motion } from 'motion/react';
import styled from 'styled-components'
import Sidebar from './sidebar-components/Sidebar'
import { easeIn } from 'motion';

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(215);
  const [selectedFolderPath, setSelectedFolderPath] = useState("")
  
  useEffect(() => {
    window.electron.onFetchSelectedDirectory((event, path) => {
      setSelectedFolderPath(path)
    });
    window.electron.selectedDirectory(selectedFolderPath)
  })

  const RootContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  `

  const Main = styled(motion.div)`
  //width: calc(100vw - ${(props) => props.sidebarWidth || '215px'});
  background-color: rgba(44,44,43,1);
  border-radius: 10px;
  margin: 7.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `

  const WelcomePhraseWrapper = styled(motion.p)`
    background: linear-gradient(45deg, #ff6347, #4CAF50, #1E90FF, #ff6347);
    background-size: 400% 400%;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    font-size: 50px;
    font-weight: 700;
    text-transform: uppercase;
    
  `

  const WelcomePhraseAnimation = {
    hidden: {opacity: 1},
    visible: {
      opacity: 1,
      backgroundPosition: '100% 0%',
      transition: {
        delay: 0.5,
        ease: 'linear',
        duration: 5,
        staggerChildren: 0.08,
        repeat: Infinity,  // Repeat the animation infinitely
        repeatType: 'loop',
      }
    }
  }

  const WelcomePhraseTextAnimation = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
    }
  }

  const welcomeText = "Welcome to MicroPycon"
  

  return (
    <RootContainer>
      <Sidebar sidebarWidth={`${sidebarWidth}px`} selectedDirectory={selectedFolderPath}/>
      <Main 
        initial = {{
          width: '100vw',
          margin: '50px 7.5px 7.5px 7.5px',
          opacity: 0
        }}
        animate = {{
          opacity: 1,
          transition: {
            ease: easeIn,
            duration: 0.5,
            delay: 0.08
          }
        }}
      >
        <WelcomePhraseWrapper
          variants={WelcomePhraseAnimation}
          initial="hidden"
          animate="visible"
        >
          {welcomeText.split("").map((char, index) => {
            return(
              <motion.span key={char + "-" + index} variants={WelcomePhraseTextAnimation}>
                {char}
              </motion.span>
            )
          })}
        </WelcomePhraseWrapper>
        
      </Main>
    </RootContainer>
  )
}

export default App
