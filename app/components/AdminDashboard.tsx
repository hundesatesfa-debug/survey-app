'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SurveyData } from '@/types/survey';

interface Stats {
  totalParticipants: number;
  technologyAwareness: { [key: string]: number };
  programmingConceptAwareness: { [key: string]: number };
  softwareDevelopmentAwareness: { [key: string]: number };
  projectExperience: { [key: string]: number };
  learningGoals: { [key: string]: number };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [selectedSurvey, setSelectedSurvey] =
    useState<SurveyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [surveysRes, statsRes] = await Promise.all([
        fetch('/api/surveys'),
        fetch('/api/admin/stats'),
      ]);

      if (surveysRes.ok && statsRes.ok) {
        const surveysData = await surveysRes.json();
        const statsData = await statsRes.json();
        setSurveys(surveysData);
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">
            Error loading data
          </p>
        </div>
      </div>
    );
  }

  const COLORS = [
    '#4f46e5',
    '#7c3aed',
    '#db2777',
    '#ea580c',
    '#ca8a04',
    '#16a34a',
    '#0891b2',
    '#2563eb',
  ];

  const techData = Object.entries(
    stats.technologyAwareness
  )
    .map(([name, value]) => ({
      name,
      value,
    }))
    .filter((item) => item.value > 0);

  const programmingData = Object.entries(
    stats.programmingConceptAwareness
  )
    .map(([name, value]) => ({
      name,
      value,
    }))
    .filter((item) => item.value > 0);

  const softwareDevData = Object.entries(
    stats.softwareDevelopmentAwareness
  )
    .map(([name, value]) => ({
      name,
      value,
    }))
    .filter((item) => item.value > 0);

  const projectExpData = Object.entries(
    stats.projectExperience
  )
    .map(([name, value]) => ({
      name,
      value,
    }))
    .filter((item) => item.value > 0);

  const learningGoalsData = Object.entries(
    stats.learningGoals
  )
    .map(([name, value]) => ({
      name,
      value,
    }))
    .filter((item) => item.value > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Survey Dashboard
            </h1>
            <p className="text-gray-600">
              Total Participants:{' '}
              <span className="font-semibold">
                {stats.totalParticipants}
              </span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Responses
            </h3>
            <p className="text-3xl font-bold text-indigo-600">
              {stats.totalParticipants}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Unique Participants
            </h3>
            <p className="text-3xl font-bold text-indigo-600">
              {surveys.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Last Submission
            </h3>
            <p className="text-sm font-medium text-gray-900">
              {surveys.length > 0
                ? new Date(
                    surveys[surveys.length - 1]
                      .submittedAt
                  ).toLocaleDateString()
                : 'No submissions'}
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Technology Awareness */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Technology Awareness (%)
            </h2>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={techData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#4f46e5"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Project Experience */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Project Experience (%)
            </h2>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={projectExpData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({
                    name,
                    value,
                  }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectExpData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Programming Concepts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Programming Concept Awareness (%)
            </h2>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={programmingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#7c3aed"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Learning Goals */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Learning Goals (%)
            </h2>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart
                data={learningGoalsData}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#db2777"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Software Development Terms */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Software Development Awareness (%)
            </h2>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={softwareDevData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#16a34a"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Participants List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Survey Participants
            </h2>
          </div>

          {selectedSurvey ? (
            <div className="p-6">
              <button
                onClick={() =>
                  setSelectedSurvey(null)
                }
                className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Back to List
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedSurvey.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Submitted: {new Date(selectedSurvey.submittedAt).toLocaleString()}
                  </h4>

                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Technologies Heard Of
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSurvey.technologies.map(
                        (tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Project Experience
                    </h4>
                    <p className="text-gray-700">
                      {selectedSurvey.projectExperience}
                    </p>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Learning Goals
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSurvey.learningGoals.map(
                        (goal) => (
                          <span
                            key={goal}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                          >
                            {goal}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Development Tools
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSurvey.developmentTools.length > 0 ? (
                      selectedSurvey.developmentTools.map(
                        (tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                          >
                            {tool}
                          </span>
                        )
                      )
                    ) : (
                      <p className="text-gray-600">
                        No tools selected
                      </p>
                    )}
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2 mt-4">
                    Technology Familiarity
                  </h4>
                  <div className="space-y-1 text-sm">
                    {Object.entries(
                      selectedSurvey.technologyFamiliarity
                    ).map(([tech, level]) => (
                      <p
                        key={tech}
                        className="text-gray-700"
                      >
                        <strong>{tech}:</strong>{' '}
                        {level}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Technologies
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey) => (
                    <tr
                      key={survey.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-gray-900">
                        {survey.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(
                          survey.submittedAt
                        ).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {survey.technologies.length}{' '}
                          selected
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            setSelectedSurvey(
                              survey
                            )
                          }
                          className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
