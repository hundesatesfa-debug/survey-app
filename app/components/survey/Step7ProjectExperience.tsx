'use client';

interface Props {
  data: any;
  setData: (data: any) => void;
}

export default function Step7ProjectExperience({
  data,
  setData,
}: Props) {
  const projectTypes = [
    'Website',
    'Mobile application',
    'Computer application',
    'Game',
    'Calculator',
    'To-do list',
    'Personal portfolio',
    'Blog',
    'Other',
    'Nothing yet',
  ];

  const handleProjectExperience = (value: string) => {
    setData({
      ...data,
      projectExperience: value,
    });
  };

  const handleProjectType = (type: string) => {
    const newTypes = data.projectTypes.includes(type)
      ? data.projectTypes.filter((t: string) => t !== type)
      : [...data.projectTypes, type];

    setData({
      ...data,
      projectTypes: newTypes,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Project Experience
      </h2>

      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">
          Have you ever tried to create something using
          a computer?
        </h3>
        <div className="space-y-3">
          {[
            'No',
            'Yes, but not programming',
            'Yes, I tried programming',
            'Yes, I followed a tutorial',
            'Yes, I built something by myself',
          ].map((option) => (
            <label
              key={option}
              className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition"
            >
              <input
                type="radio"
                name="project-experience"
                checked={
                  data.projectExperience === option
                }
                onChange={() =>
                  handleProjectExperience(option)
                }
                className="w-5 h-5 text-indigo-600"
              />
              <span className="ml-3 text-gray-700">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {data.projectExperience &&
        data.projectExperience !== 'No' && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              What have you tried to create?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {projectTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition"
                >
                  <input
                    type="checkbox"
                    checked={data.projectTypes.includes(
                      type
                    )}
                    onChange={() =>
                      handleProjectType(type)
                    }
                    className="w-5 h-5 text-indigo-600 rounded"
                  />
                  <span className="ml-3 text-gray-700">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
