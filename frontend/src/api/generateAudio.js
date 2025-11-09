// src/api/generateAudio.js
export const generateAudio = async (text) => {
  try {
    const formData = new FormData();
    formData.append("text", text);

    const response = await fetch("http://localhost:8001/generate_audio", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Eroare la generarea audio");
    }

    // primim fișierul MP3 ca blob
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Eroare la generateAudio:", error);
    throw error;
  }
};
