import { X } from "lucide-react";

interface ErrorInfo {
  expected: string;
  spoken: string;
  type: string;
  tip: string;
}

interface StudentAnalysis {
  summary: string;
  errors: ErrorInfo[];
  suggested_exercises: string;
}

interface StudentModalProps {
  open: boolean;
  onClose: () => void;
  studentName?: string;
  analysis?: StudentAnalysis;
}

export const StudentModal = ({
  open,
  onClose,
  studentName,
  analysis,
}: StudentModalProps) => {
  if (!open || !analysis) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-black text-center text-blue-500 mb-8">
          {studentName}
        </h2>
        <p className="text-gray-600 mb-6 italic">{analysis.summary}</p>

        <h3 className="text-xl font-bold text-red-500 mb-2">
          Erori identificate:
        </h3>
        <ul className="space-y-4 mb-6">
          {analysis.errors.map((err, i) => (
            <li
              key={i}
              className="bg-red-50 border-l-4 border-red-300 p-4 rounded-lg"
            >
              <p className="font-semibold text-gray-800">
                <span className="text-red-500">Așteptat:</span> {err.expected} |{" "}
                <span className="text-red-500">Pronunțat:</span> {err.spoken}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>{err.type}</strong>: {err.tip}
              </p>
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-bold text-green-500 mb-2">
          Recomandări pentru exerciții:
        </h3>
        <p className="text-gray-700 whitespace-pre-line">
          {analysis.suggested_exercises}
        </p>
      </div>
    </div>
  );
};
