import { FeedbackMessage } from "../types";

export const getFeedbackMessage = (accuracy: number): FeedbackMessage => {
  if (accuracy >= 90) {
    return {
      title: "Amazing! 🌟",
      message: "You did a fantastic job! Keep it up!",
      emoji: "",
    };
  } else if (accuracy >= 75) {
    return {
      title: "Very good! 🎈",
      message: "You're doing great! Practice makes perfect!",
      emoji: "",
    };
  } else if (accuracy >= 60) {
    return {
      title: "Good start! 💪",
      message: "Nice effort! Try again and you’ll do even better!",
      emoji: "",
    };
  } else {
    return {
      title: "Don’t give up! 🌈",
      message: "Keep going! You’re learning and getting better every time!",
      emoji: "",
    };
  }
};

export const getRandomSentence = (): string => {
  const sentences = [
    "The cat is playing with a ball.",
    "I like to eat apples.",
    "The sun is shining brightly.",
    "Birds can fly in the sky.",
    "My dog has a red collar.",
    "We go to school every day.",
    "The flowers are very beautiful.",
    "I can count to ten.",
    "The moon appears in the sky at night.",
    "My friend and I love to play.",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
};
