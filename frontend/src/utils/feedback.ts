import { FeedbackMessage } from "../types";

export const getFeedbackMessage = (accuracy: number): FeedbackMessage => {
  if (accuracy >= 90) {
    return {
      title: "Uimitor! 🌟",
      message: "Ai făcut o treabă fantastică! Continuă tot așa!",
      emoji: "",
    };
  } else if (accuracy >= 75) {
    return {
      title: "Foarte bine! 🎈",
      message: "Te descurci grozav! Exercițiul te face perfect!",
      emoji: "",
    };
  } else if (accuracy >= 60) {
    return {
      title: "Bun început! 💪",
      message:
        "Ai depus efort! Hai să mai încercăm o dată și va fi și mai bine!",
      emoji: "",
    };
  } else {
    return {
      title: "Nu te opri! 🌈",
      message: "Nu renunța! Înveți și devii din ce în ce mai bun!",
      emoji: "",
    };
  }
};

export const getRandomSentence = (): string => {
  const sentences = [
    "Pisica se joacă cu o minge.",
    "Îmi place să mănânc mere.",
    "Soarele strălucește puternic.",
    "Păsările pot zbura pe cer.",
    "Câinele meu are o zgardă roșie.",
    "Mergem la școală în fiecare zi.",
    "Florile sunt foarte frumoase.",
    "Pot să număr până la zece.",
    "Luna apare pe cer noaptea.",
    "Eu și prietenul meu iubim să ne jucăm.",
  ];
  return sentences[Math.floor(Math.random() * sentences.length)];
};
