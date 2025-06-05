import { useState } from 'react';
import styles from './PetList.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import dogImage from '../assets/images/dog.jpg';
import catImage from '../assets/images/cat.jpg';
import fishImage from '../assets/images/fish.jpg';
import rabbitImage from '../assets/images/rabbit.jpg';
import birdImage from '../assets/images/bird.jpg';
import hamsterImage from '../assets/images/hamster.jpg';
import PetProfileModal from './PetProfileModal';

const pets = [
  { id: 1, type: 'Dog', recommendedFood: 'High-protein kibble (e.g., Royal Canin)', image: dogImage, age: '2 years', breed: 'Golden Retriever', personality: 'Friendly and energetic' },
  { id: 2, type: 'Cat', recommendedFood: 'Wet food with fish (e.g., Whiskas)', image: catImage, age: '1 year', breed: 'Siamese', personality: 'Curious and vocal' },
  { id: 3, type: 'Fish', recommendedFood: 'Flake food (e.g., TetraMin)', image: fishImage, age: '6 months', breed: 'Betta', personality: 'Calm and colorful' },
  { id: 4, type: 'Rabbit', recommendedFood: 'Hay and pellets (e.g., Oxbow)', image: rabbitImage, age: '1.5 years', breed: 'Holland Lop', personality: 'Gentle and shy' },
  { id: 5, type: 'Bird', recommendedFood: 'Seed mix (e.g., Kaytee Forti-Diet)', image: birdImage, age: '1 year', breed: 'Parakeet', personality: 'Social and chirpy' },
  { id: 6, type: 'Hamster', recommendedFood: 'Hamster mix (e.g., Kaytee Fiesta)', image: hamsterImage, age: '8 months', breed: 'Syrian', personality: 'Playful and nocturnal' },
];

function PetList({ isDarkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);

  const filteredPets = pets.filter(pet =>
    pet.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleCloseModal = () => {
    setSelectedPet(null);
  };

  return (
    <section className={`${styles.petList} ${isDarkMode ? styles.darkMode : ''}`}>
      <h2>Our Pets and Recommended Food</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search pets by type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={3000}
        className={styles.petCarousel}
      >
        {filteredPets.map(pet => (
          <div key={pet.id} className={styles.carouselItem} onClick={() => handleCardClick(pet)}>
            <img src={pet.image} alt={pet.type} className={styles.petImage} loading="lazy" />
            <div className={styles.carouselCaption}>
              <h3>{pet.type}</h3>
              <p>Recommended Food: {pet.recommendedFood}</p>
            </div>
          </div>
        ))}
      </Carousel>
      <div className={styles.petGrid}>
        {filteredPets.map(pet => (
          <div
            key={pet.id}
            className={styles.petCard}
            onClick={() => handleCardClick(pet)}
          >
            <img src={pet.image} alt={pet.type} className={styles.petImage} loading="lazy" />
            <h3>{pet.type}</h3>
            <p>Recommended Food: {pet.recommendedFood}</p>
          </div>
        ))}
      </div>
      {selectedPet && (
        <PetProfileModal pet={selectedPet} onClose={handleCloseModal} isDarkMode={isDarkMode} />
      )}
    </section>
  );
}

export default PetList;