'use client';

interface Props {
  data: any;
  setData: (data: any) => void;
}

export default function Step5WebDevelopment({
  data,
  setData,
}: Props) {
  const terms = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Website',
    'Web page',
    'Frontend',
    'Backend',
    'Database',
    'Server',
    'API',
    'Domain',
    'Hosting',
    'Deployment',
  ];

  const handleAnswer = (term: string, answer: string) => {
    setData({
      ...data,
      webDevelopment: {
        ...data.webDevelopment,
        [term]: answer,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Web Development Terms
      </h2>
      <p className="text-gray-600 mb-6">
        Have you ever heard of these terms?
      </p>

      <div className="space-y-3">
        {terms.map((term) => (
          <div
            key={term}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300"
          >
            <span className="font-medium text-gray-900">
              {term}
            </span>
            <div className="flex gap-2">
              {['Yes', 'No', "I'm not sure"].map(
                (answer) => (
                  <button
                    key={answer}
                    onClick={() =>
                      handleAnswer(term, answer)
                    }
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      data.webDevelopment[term] ===
                      answer
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {answer}
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
