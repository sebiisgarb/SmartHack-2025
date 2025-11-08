import { useState } from "react";
import { Home, TrendingUp, Users, Award } from "lucide-react";
import { Button } from "../components/Button";
import { mockStudents } from "../utils/mockData";
import { StudentModal } from "../components/StudentModal";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const totalStudents = mockStudents.length;
  const avgAccuracy = Math.round(
    mockStudents.reduce((sum, s) => sum + s.averageAccuracy, 0) / totalStudents
  );
  const totalExercises = mockStudents.reduce(
    (sum, s) => sum + s.totalExercises,
    0
  );

  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockAnalysis = {
    summary:
      "Elevul a obținut un scor de pronunție de 85.71%, ceea ce indică o bună înțelegere a limbii, dar există erori care trebuie corectate pentru a îmbunătăți pronunția.",
    errors: [
      {
        expected: "Pisica",
        spoken: "Pisca",
        type: "eroare fonetică",
        tip: "Elevul a omis sunetul 'i' și a înlocuit 's' cu 'sc', ceea ce a dus la o confuzie în pronunțarea corectă a cuvântului.",
      },
      {
        expected: "doarme",
        spoken: "dorme",
        type: "eroare fonetică",
        tip: "Elevul a omis sufixul '-a' din forma verbală, ceea ce a dus la o pronunție incompletă a verbului.",
      },
    ],
    suggested_exercises:
      "1. Exerciții de pronunție pentru sunetele 'i' și 's' - repetarea cuvintelor precum 'pisică', 'să' și 'scăunel'.\n2. Exerciții de conjugare a verbelor la prezent, cu accent pe forma corectă a acestora.\n3. Jocuri de cuvinte care implică cuvinte similare fonetic, pentru a ajuta elevul să distingă între sunetele similare.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center pb-4">
          <Button
            onClick={() => onNavigate("home")}
            icon={Home}
            variant="primary"
            size="small"
          >
            Înapoi
          </Button>

          <h1 className="text-5xl font-black">
            <span className="text-red-500">P</span>
            <span className="text-orange-500">a</span>
            <span className="text-yellow-500">n</span>
            <span className="text-green-500">o</span>
            <span className="text-blue-500">u</span>
            <span className="text-indigo-500">l</span>&nbsp;
            <span className="text-purple-500">p</span>
            <span className="text-pink-500">r</span>
            <span className="text-rose-500">o</span>
            <span className="text-red-500">f</span>
            <span className="text-orange-500">e</span>
            <span className="text-yellow-500">s</span>
            <span className="text-green-500">o</span>
            <span className="text-blue-500">r</span>
            <span className="text-indigo-500">u</span>
            <span className="text-purple-500">l</span>
            <span className="text-pink-500">u</span>
            <span className="text-rose-500">i</span>
          </h1>

          <div className="w-32"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pb-3">
          <div className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-blue-400">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Total elevi</p>
                <p className="text-4xl font-black text-gray-800">
                  {totalStudents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-green-400">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Acuratețe medie</p>
                <p className="text-4xl font-black text-gray-800">
                  {avgAccuracy}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-orange-400">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Total exerciții</p>
                <p className="text-4xl font-black text-gray-800">
                  {totalExercises}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-yellow-400 px-6 py-4">
            <h2 className="text-2xl font-black text-white">
              Progresul elevilor
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Nume",
                    "Vârstă",
                    "Total exerciții",
                    "Reușite",
                    "Acuratețe medie",
                    "Ultima activitate",
                    "Progres",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedStudent(student.name);
                      setAnalysisData(mockAnalysis);
                      setIsModalOpen(true);
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <p className="text-md font-semibold text-gray-800">
                          {student.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {student.age} ani
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {student.totalExercises}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {student.successfulExercises}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          student.averageAccuracy >= 85
                            ? "bg-green-100 text-green-500"
                            : student.averageAccuracy >= 70
                            ? "bg-yellow-100 text-yellow-500"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {student.averageAccuracy}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(student.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-200 to-blue-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (student.successfulExercises /
                                student.totalExercises) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-black text-gray-800 mb-6">
            Rezumat performanță
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {mockStudents.map((student) => (
              <div key={student.id} className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 truncate">
                  {student.name}
                </p>
                <div className="h-40 bg-gradient-to-t from-gray-100 to-gray-100 rounded-lg relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-purple-100 to-purple-200 transition-all duration-1000"
                    style={{ height: `${student.averageAccuracy}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-purple-400 font-black text-xl drop-shadow-lg">
                      {student.averageAccuracy}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <StudentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        studentName={selectedStudent ?? ""}
        analysis={analysisData}
      />
    </div>
  );
};
