export async function fetchSentences() {
  try {
    const response = await fetch("http://127.0.0.1:8000/sentences");
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
