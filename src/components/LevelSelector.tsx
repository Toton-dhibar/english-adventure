import React from 'react';

interface LevelSelectorProps {
  onSelectLevel: (level: string) => void;
}

const levels = ['Beginner', 'Intermediate', 'Advanced']; // Example levels

const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelectLevel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to English Adventure!</h2>
        <p className="text-lg text-gray-600 mb-8">Please select your starting level:</p>
        <div className="space-y-4">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => onSelectLevel(level)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-xl transition duration-150 ease-in-out transform hover:scale-105"
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;

