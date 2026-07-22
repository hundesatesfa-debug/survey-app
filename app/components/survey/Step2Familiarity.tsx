'use client';

interface Props {
  data: any;
  setData: (data: any) => void;
}

export default function Step2Familiarity({ data, setData }: Props) {
  const options = [
    'I have only heard the name',
    'I have seen it in videos or social media',
    'I have read a little about it',
    'I have tried it before',
    'I have followed a tutorial using it',
    'I have used it to build something',
  ];

  const handleSelect = (tech: string, level: string) => {
    setData({
      ...data,
      technologyFamiliarity: {
        ...data.technologyFamiliarity,
        [tech]: level,
      },
    });
  };

  const relevantTechs = data.technologies.filter(
    (t: string) => t !== 'Other' && t !== 'I have never heard of any of these'
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        How familiar are you with these technologies?
      </h2>

      <div className="space-y-6">
        {relevantTechs.map((tech: string) => (
          <div key={tech} className="border-l-4 border-indigo-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              {tech}
            </h3>
            <div className="space-y-2">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={tech}
                    checked={
                      data.technologyFamiliarity[tech] ===
                      option
                    }
                    onChange={() =>
                      handleSelect(tech, option)
                    }
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="ml-3 text-gray-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
