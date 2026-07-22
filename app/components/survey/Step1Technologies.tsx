'use client';

interface Props {
  data: any;
  setData: (data: any) => void;
}

export default function Step1Technologies({ data, setData }: Props) {
  const technologies = [
    'HTML',
    'CSS',
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'C',
    'C#',
    'PHP',
    'SQL',
    'Git',
    'GitHub',
    'React',
    'Node.js',
    'Other',
    'I have never heard of any of these',
  ];

  const handleToggle = (tech: string) => {
    if (tech === 'I have never heard of any of these') {
      if (
        data.technologies.includes(
          'I have never heard of any of these'
        )
      ) {
        setData({
          ...data,
          technologies: [],
        });
      } else {
        setData({
          ...data,
          technologies: [
            'I have never heard of any of these',
          ],
        });
      }
    } else {
      let newTechs = [...data.technologies];
      if (
        newTechs.includes(
          'I have never heard of any of these'
        )
      ) {
        newTechs = newTechs.filter(
          (t) =>
            t !== 'I have never heard of any of these'
        );
      }

      if (newTechs.includes(tech)) {
        newTechs = newTechs.filter((t) => t !== tech);
      } else {
        newTechs.push(tech);
      }

      setData({
        ...data,
        technologies: newTechs,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Which of these have you heard of before?
      </h2>
      <p className="text-gray-600 mb-6">
        Select all that apply. We're only checking if you've heard of
        them, not if you know how to use them.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {technologies.map((tech) => (
          <label
            key={tech}
            className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition"
          >
            <input
              type="checkbox"
              checked={data.technologies.includes(tech)}
              onChange={() => handleToggle(tech)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <span className="ml-3 text-gray-700">{tech}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
