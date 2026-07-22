'use client';

interface Props {
  data: any;
  setData: (data: any) => void;
}

export default function Step3ProgrammingTerms({
  data,
  setData,
}: Props) {
  const terms = [
    'Programming',
    'Programming Language',
    'Code',
    'Software',
    'Application/App',
    'Website',
    'Web Development',
    'Software Development',
    'Frontend',
    'Backend',
    'Database',
    'API',
    'Server',
    'Git',
    'GitHub',
    'Framework',
    'Library',
    'Algorithm',
    'Bug',
    'Debugging',
    'Deployment',
  ];

  const handleAnswer = (term: string, answer: string) => {
    setData({
      ...data,
      programmingTerms: {
        ...data.programmingTerms,
        [term]: answer,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Programming and Software Terms
      </h2>
      <p className="text-gray-600 mb-6">
        Have you ever heard this word in relation to
        programming?
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
                      data.programmingTerms[term] ===
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
