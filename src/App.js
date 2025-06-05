import { useState } from 'react';
import styles from './App.module.css';
import PetList from './components/PetList';
import VeterinaryServices from './components/VeterinaryServices';
import ContactForm from './components/ContactForm';
import PetAdoptionForm from './components/PetAdoptionForm';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`${styles.app} ${isDarkMode ? styles.darkMode : ''}`}>
      <header className={styles.header}>
        <h1>Pet Care Hub</h1>
        <p>Your one-stop place for pet care and veterinary services</p>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className={styles.toggleButton}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main>
        <PetList isDarkMode={isDarkMode} />
        <VeterinaryServices isDarkMode={isDarkMode} />
        <PetAdoptionForm isDarkMode={isDarkMode} />
        <ContactForm isDarkMode={isDarkMode} />
      </main>
      <footer className={styles.footer}>
        <p>© 2025 Pet Care Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;