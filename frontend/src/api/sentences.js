export async function fetchSentences_stt() {
  try {
    const response = await fetch("http://127.0.0.1:8001/sentences_stt");
    if (!response.ok) {
      throw new Error(`Eroare server: ${response.status}`);
    }
    const data = await response.json();
    return data; // { usor: {...}, mediu: {...}, avansat: {...} }
  } catch (error) {
    console.error("Eroare la preluarea propozițiilor:", error);
    return null;
  }
}

export async function fetchSentences_tts() {
  try {
    const response = await fetch("http://127.0.0.1:8001/sentences_tts");
    if (!response.ok) {
      throw new Error(`Eroare server: ${response.status}`);
    }
    const data = await response.json();
    return data; // { usor: {...}, mediu: {...}, avansat: {...} }
  } catch (error) {
    console.error("Eroare la preluarea propozițiilor:", error);
    return null;
  }
}
