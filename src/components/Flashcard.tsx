import React from 'react';

interface FlashcardProps {
  sentence: string;
  details?: string;
  imageUrl?: string;
  audioUrl?: string;
  showDetails: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ sentence, details, imageUrl, showDetails }) => {
  return (
    <div className="w-full max-w-md h-96 bg-white rounded-xl shadow-xl p-6 flex flex-col justify-between items-center text-center">
      {imageUrl && <img src={imageUrl} alt="Flashcard image" className="max-h-40 mb-4 rounded" />}
      <h2 className="text-2xl font-bold mb-2">{sentence}</h2>
      {showDetails && details && (
        <p className="text-gray-700 text-lg">
          {details}
        </p>
      )}
      {/* Audio player can be added here later */}
    </div>
  );
};

export default Flashcard;
