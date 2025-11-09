export async function analyzeAudio(audioFile, targetText) {
  const formData = new FormData();
  formData.append("file", audioFile);
  formData.append("target_text", targetText);

  try {
    const response = await fetch("http://127.0.0.1:8001/analyze_audio", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Eroare server: ${response.status}`);
    }

    const result = await response.json();
    console.log("Rezultat analiză:", result);

    return {
      targetText: result.target_text,
      rawText: result.raw_text,
      score: parseFloat(result.score),
    };
  } catch (error) {
    console.error("Eroare la trimiterea fișierului audio:", error);
    return null;
  }
}
