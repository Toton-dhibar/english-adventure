import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Flashcard from '../components/Flashcard';
import LevelSelector from '../components/LevelSelector';

interface CardData {
  id: number;
  sentence: string;
  details?: string;
  imageUrl?: string;
  audioUrl?: string;
  level: string;
}

// This would eventually come from a larger data source or be generated
const allFlashcards: CardData[] = [
  { id: 1, sentence: "A boy points to a car.", details: "This is a car. That is a blue car.", imageUrl: "/images/placeholder_car.png", level: "Beginner" },
  { id: 2, sentence: "A girl sits under a tree.", details: "She is under the tree. The tree is big.", imageUrl: "/images/placeholder_tree.png", level: "Beginner" },
  { id: 3, sentence: "They are having dinner.", details: "They will eat rice and chicken. Dinner is ready.", imageUrl: "/images/placeholder_dinner.png", level: "Beginner" },
  { id: 4, sentence: "The cat is on the mat.", details: "A fluffy cat sat on a soft mat.", imageUrl: "/images/placeholder_cat_mat.png", level: "Beginner" },
  { id: 5, sentence: "He is reading a book.", details: "The book is about adventures. He loves to read.", imageUrl: "/images/placeholder_reading.png", level: "Beginner" },

  { id: 101, sentence: "The scientist conducted an experiment.", details: "The experiment aimed to test a new hypothesis regarding cellular regeneration.", imageUrl: "/images/placeholder_scientist.png", level: "Intermediate" },
  { id: 102, sentence: "She is planning a trip around the world.", details: "Her itinerary includes visiting several continents and experiencing diverse cultures.", imageUrl: "/images/placeholder_trip.png", level: "Intermediate" },
  { id: 103, sentence: "The chef prepared a gourmet meal.", details: "The meal consisted of multiple courses, each paired with a specific wine.", imageUrl: "/images/placeholder_gourmet.png", level: "Intermediate" },

  { id: 201, sentence: "The entrepreneur pitched a revolutionary idea to investors.", details: "The core concept involved leveraging blockchain technology to decentralize financial transactions, promising enhanced security and transparency.", imageUrl: "/images/placeholder_pitch.png", level: "Advanced" },
  { id: 202, sentence: "Philosophers debate the nature of consciousness.", details: "One prominent theory suggests consciousness arises from complex neural computations, while another posits it as a fundamental property of the universe.", imageUrl: "/images/placeholder_philosophy.png", level: "Advanced" },
  // Add many more cards here, categorized by level
];

const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [currentCards, setCurrentCards] = useState<CardData[]>([]);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<string | null>(null);

  useEffect(() => {
    const savedLevel = localStorage.getItem("englishAdventure_level");
    const savedIndex = localStorage.getItem("englishAdventure_currentIndex");

    if (savedLevel) {
      handleLevelSelect(savedLevel, savedIndex ? parseInt(savedIndex, 10) : 0);
    } else {
      setShowLevelSelector(true);
    }
  }, []);

  useEffect(() => {
    if (currentLevel !== null && currentCards.length > 0) { // Only save if a level is active and cards are loaded
      localStorage.setItem("englishAdventure_currentIndex", currentIndex.toString());
    }
  }, [currentIndex, currentLevel, currentCards]);

  const handleLevelSelect = (level: string, startIndex: number = 0) => {
    setCurrentLevel(level);
    localStorage.setItem("englishAdventure_level", level);
    const filteredCards = allFlashcards.filter(card => card.level === level);
    setCurrentCards(filteredCards);
    setCurrentIndex(startIndex < filteredCards.length ? startIndex : 0); // Ensure startIndex is valid
    setShowLevelSelector(false);
    setShowDetails(false);
  };

  const handleSwipe = useSwipeable({
    onSwipedLeft: () => {
      if (!currentCards || currentCards.length === 0) return;
      setShowDetails(prev => !prev);
    },
    onSwipedRight: () => {
      if (!currentCards || currentCards.length === 0) return;
      setShowDetails(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentCards.length);
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  if (showLevelSelector) {
    return <LevelSelector onSelectLevel={handleLevelSelect} />;
  }

  const currentCardData = currentCards[currentIndex];

  return (
    <div {...handleSwipe} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-4 touch-none select-none">
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => {
            localStorage.removeItem("englishAdventure_level");
            localStorage.removeItem("englishAdventure_currentIndex");
            setCurrentLevel(null);
            setCurrentCards([]);
            setCurrentIndex(0);
            setShowLevelSelector(true);
          }}
          className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Change Level
        </button>
      </div>
      <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-md">English Adventure!</h1>
      <p className="text-xl text-white mb-6 drop-shadow-sm">Level: {currentLevel}</p>
      
      <div className="w-full max-w-lg h-[28rem] perspective">
        {currentCards.length > 0 && currentCardData ? (
          <div className={`transition-transform duration-500 ease-in-out transform ${showDetails ? 'rotate-y-180' : ''} w-full h-full`}>
            <div className="absolute w-full h-full backface-hidden">
              <Flashcard
                sentence={currentCardData.sentence}
                imageUrl={currentCardData.imageUrl}
                showDetails={false} // Front of the card never shows details text
              />
            </div>
            <div className="absolute w-full h-full rotate-y-180 backface-hidden">
              <Flashcard
                sentence={currentCardData.sentence} // Or a different title for the back
                details={currentCardData.details}
                imageUrl={currentCardData.imageUrl} // Optionally hide/change image on back
                showDetails={true} // Back of the card shows details
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-white rounded-xl shadow-xl">
            <p className="text-gray-700 text-xl">{currentLevel ? "Loading cards for your level..." : "Select a level to begin!"}</p>
          </div>
        )}
      </div>

      {currentCards.length > 0 && (
        <div className="mt-8 text-white text-center">
          <p className="text-lg">Swipe Right for Next Card</p>
          <p className="text-lg">Swipe Left to Toggle Details</p>
          <p className="mt-2 text-md">Card {currentIndex + 1} of {currentCards.length}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;

