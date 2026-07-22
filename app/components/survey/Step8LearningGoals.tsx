'use client';

interface Props {
  data: any;
  setData: (data: any) => void;
}

export default function Step8LearningGoals({
  data,
  setData,
}: Props) {
  const goals = [
    'Programming',
    'Website development',
    'Mobile app development',
    'Computer software development',
    'Software engineering',
    'Web development',
    'Full-stack development',
    "I'm not sure yet",
  ];

  const handleToggle = (goal: string) => {
    const newGoals = data.learningGoals.includes(goal)
      ? data.learningGoals.filter(
          (g: string) => g !== goal
        )
      : [...data.learningGoals, goal];

    setData({
      ...data,
      learningGoals: newGoals,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Learning Goals
      </h2>
      <p className="text-gray-600 mb-6">
        What would you like to learn? Select all that
        apply.
      </p>

      <div className="space-y-3">
        {goals.map((goal) => (
          <label
            key={goal}
            className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition"
          >
            <input
              type="checkbox"
              checked={data.learningGoals.includes(goal)}
              onChange={() => handleToggle(goal)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <span className="ml-3 text-gray-700">
              {goal}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
