'use client';

interface Props {
  data: any;
  setData: (data: any) => void;
}

export default function Step6DevelopmentTools({
  data,
  setData,
}: Props) {
  const tools = [
    'VS Code',
    'Visual Studio',
    'IntelliJ IDEA',
    'Android Studio',
    'PyCharm',
    'Git',
    'GitHub',
    'GitLab',
    'Command Prompt',
    'Terminal',
  ];

  const handleToggle = (tool: string) => {
    const newTools = data.developmentTools.includes(tool)
      ? data.developmentTools.filter(
          (t: string) => t !== tool
        )
      : [...data.developmentTools, tool];

    setData({
      ...data,
      developmentTools: newTools,
    });
  };

  const handleToolsFamiliarity = (
    tool: string,
    answer: string
  ) => {
    setData({
      ...data,
      toolsFamiliarity: {
        ...data.toolsFamiliarity,
        [tool]: answer,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Development Tools
      </h2>

      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">
          Have you ever heard of these development
          tools?
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => (
            <label
              key={tool}
              className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition"
            >
              <input
                type="checkbox"
                checked={data.developmentTools.includes(
                  tool
                )}
                onChange={() => handleToggle(tool)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <span className="ml-3 text-gray-700">
                {tool}
              </span>
            </label>
          ))}
        </div>
      </div>

      {data.developmentTools.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            Have you ever used a code editor or
            development tool?
          </h3>
          <div className="space-y-2">
            {['Yes', 'No', "I'm not sure"].map(
              (answer) => (
                <label
                  key={answer}
                  className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500"
                >
                  <input
                    type="radio"
                    name="tools-familiarity"
                    checked={
                      data.toolsFamiliarity['used'] ===
                      answer
                    }
                    onChange={() =>
                      handleToolsFamiliarity(
                        'used',
                        answer
                      )
                    }
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="ml-3 text-gray-700">
                    {answer}
                  </span>
                </label>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
