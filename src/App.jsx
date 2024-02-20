import styles from './App.module.sass'
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
function App() {

  return (
    <div className={styles.app}>
      <Header/>
      <MainContent/>
    </div>
  )
}

export default App
