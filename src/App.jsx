import styles from './App.module.sass'
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import React from "react";
function App() {

  return (
    <div className={styles.app}>
      <Header/>
      <MainContent/>
    </div>
  )
}
export default App
