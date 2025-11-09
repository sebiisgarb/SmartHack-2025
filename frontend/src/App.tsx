import { useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { ReadAloud } from "./pages/ReadAloud";
import { ListenWrite } from "./pages/ListenWrite";
import { Reward } from "./pages/Reward";
import { Dashboard } from "./pages/Dashboard";
import { ExerciseResult } from "./types";
import { Toaster } from "react-hot-toast";

type Page = "home" | "read-aloud" | "listen-write" | "reward" | "dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [successfulExercises, setSuccessfulExercises] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [unlockedSection, setUnlockedSection] = useState<"read" | "listen">(
    "read"
  );
  const [reports, setReports] = useState<any[]>([]);

  const totalExercises = 6;

  const handleExerciseComplete = () => {
    setSuccessfulExercises((prev) => prev + 1);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleExerciseResult = (result: ExerciseResult) => {
    setResults((prev) => [...prev, result]);
  };

  // 🔹 După ce termină cele 3 ReadAloud -> deblochează ListenWrite
  useEffect(() => {
    if (successfulExercises === 3 && unlockedSection === "read") {
      setUnlockedSection("listen");
      alert(
        "👏 Ai terminat partea de citire! Acum poți trece la Ascultă și Scrie 🧠"
      );
    }
  }, [successfulExercises, unlockedSection]);

  // 🔹 După toate 6 exercițiile -> trimite rezultatele
  useEffect(() => {
    if (results.length === totalExercises) {
      sendResultsToBackend();
    }
  }, [results]);

  const sendResultsToBackend = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8001/submit_results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: "1",
          results,
        }),
      });

      if (!response.ok) throw new Error("Eroare la trimiterea rezultatelor");

      const data = await response.json();

      const newReport = {
        student_id: "1",
        student_name: "Maria Popescu",
        summary: data.summary,
        global_score: data.global_score,
        errors_summary: data.errors_summary,
        recommendations: data.recommendations,
      };

      setReports((prev) => [...prev, newReport]);

      // ✅ corect: actualizează starea, nu modifica direct array-ul
      setReports((prev) => [...prev, data]);

      console.log("✅ Rezultatele au fost trimise!");
      setCurrentPage("reward");
      setResults([]);
      setSuccessfulExercises(0);
      setUnlockedSection("read");
    } catch (err) {
      console.error("❌ Eroare:", err);
    }
  };

  return (
    <>
      {currentPage === "home" && (
        <Home onNavigate={handleNavigate} unlockedSection={unlockedSection} />
      )}

      {currentPage === "read-aloud" && successfulExercises < 3 && (
        <ReadAloud
          onNavigate={handleNavigate}
          onExerciseComplete={handleExerciseComplete}
          onExerciseResult={handleExerciseResult}
          currentExercise={successfulExercises}
          totalExercises={3}
        />
      )}

      {currentPage === "listen-write" && successfulExercises >= 3 && (
        <ListenWrite
          onNavigate={handleNavigate}
          onExerciseComplete={handleExerciseComplete}
          onExerciseResult={handleExerciseResult}
          currentExercise={successfulExercises - 3}
          totalExercises={3}
        />
      )}

      {currentPage === "reward" && <Reward onNavigate={handleNavigate} />}
      {currentPage === "dashboard" && (
        <Dashboard onNavigate={handleNavigate} reports={reports} />
      )}

      <Toaster
        position="top-left"
        toastOptions={{
          style: {
            background: "#4ade80",
            color: "#fff",
            fontWeight: "bold",
            padding: "12px 18px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          },
        }}
      />
    </>
  );
}

export default App;
