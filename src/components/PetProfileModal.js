import styles from './PetProfileModal.module.css';

function PetProfileModal({ pet, onClose, isDarkMode }) {
  return (
    <div className={`${styles.modalOverlay} ${isDarkMode ? styles.darkMode : ''}`}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>×</button>
        <img src={pet.image} alt={pet.type} className={styles.modalImage} />
        <h2>{pet.type}</h2>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Personality:</strong> {pet.personality}</p>
        <p><strong>Recommended Food:</strong> {pet.recommendedFood}</p>
      </div>
    </div>
  );
}

export default PetProfileModal;