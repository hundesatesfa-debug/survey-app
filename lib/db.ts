import { SurveyData } from '@/types/survey';

// In-memory storage (works on Vercel)
let surveysData: SurveyData[] = [];

// Get all surveys
export function getAllSurveys(): SurveyData[] {
  return surveysData;
}

// Save a survey
export function saveSurvey(survey: SurveyData): void {
  try {
    surveysData.push(survey);
  } catch (error) {
    console.error('Error saving survey:', error);
    throw error;
  }
}

// Get a single survey by ID
export function getSurveyById(id: string): SurveyData | null {
  return surveysData.find((s) => s.id === id) || null;
}

// Calculate statistics
export function calculateStatistics(surveys: SurveyData[]) {
  if (surveys.length === 0) {
    return {
      totalParticipants: 0,
      technologyAwareness: {},
      programmingConceptAwareness: {},
      softwareDevelopmentAwareness: {},
      projectExperience: {},
      learningGoals: {},
    };
  }

  const technologyAwareness: { [key: string]: number } = {};
  const programmingConceptAwareness: { [key: string]: number } = {};
  const softwareDevelopmentAwareness: { [key: string]: number } = {};
  const projectExperience: { [key: string]: number } = {
    'No project experience': 0,
    'Tried programming': 0,
    'Followed tutorials': 0,
    'Built projects independently': 0,
  };
  const learningGoals: { [key: string]: number } = {};

  // Technologies
  const allTechnologies = [
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
  ];

  allTechnologies.forEach((tech) => {
    technologyAwareness[tech] = 0;
  });

  // Programming concepts
  const programmingConcepts = [
    'Variables',
    'Number',
    'Text/String',
    'True/False',
    'Condition',
    'If/Else',
    'Loop',
    'Function',
    'Array/List',
    'Object',
    'Class',
  ];

  programmingConcepts.forEach((concept) => {
    programmingConceptAwareness[concept] = 0;
  });

  // Software development terms
  const softwareDevelopmentTerms = [
    'Programming',
    'Frontend',
    'Backend',
    'Database',
    'API',
    'Server',
    'Git',
    'GitHub',
    'Deployment',
  ];

  softwareDevelopmentTerms.forEach((term) => {
    softwareDevelopmentAwareness[term] = 0;
  });

  // Process each survey
  surveys.forEach((survey) => {
    // Count technologies
    survey.technologies.forEach((tech) => {
      if (tech in technologyAwareness) {
        technologyAwareness[tech]++;
      }
    });

    // Count programming concepts
    Object.entries(survey.basicTerms).forEach(([term, answer]) => {
      if (answer === 'Yes' && term in programmingConceptAwareness) {
        programmingConceptAwareness[term]++;
      }
    });

    // Count software development terms
    Object.entries(survey.programmingTerms).forEach(([term, answer]) => {
      if (answer === 'Yes' && term in softwareDevelopmentAwareness) {
        softwareDevelopmentAwareness[term]++;
      }
    });

    // Count project experience
    if (survey.projectExperience === 'No') {
      projectExperience['No project experience']++;
    } else if (survey.projectExperience === 'Yes, but not programming') {
      projectExperience['No project experience']++;
    } else if (survey.projectExperience === 'Yes, I tried programming') {
      projectExperience['Tried programming']++;
    } else if (survey.projectExperience === 'Yes, I followed a tutorial') {
      projectExperience['Followed tutorials']++;
    } else if (survey.projectExperience === 'Yes, I built something by myself') {
      projectExperience['Built projects independently']++;
    }

    // Count learning goals
    survey.learningGoals.forEach((goal) => {
      if (!learningGoals[goal]) {
        learningGoals[goal] = 0;
      }
      learningGoals[goal]++;
    });
  });

  // Convert counts to percentages
  const total = surveys.length;

  Object.keys(technologyAwareness).forEach((key) => {
    technologyAwareness[key] = Math.round(
      (technologyAwareness[key] / total) * 100
    );
  });

  Object.keys(programmingConceptAwareness).forEach((key) => {
    programmingConceptAwareness[key] = Math.round(
      (programmingConceptAwareness[key] / total) * 100
    );
  });

  Object.keys(softwareDevelopmentAwareness).forEach((key) => {
    softwareDevelopmentAwareness[key] = Math.round(
      (softwareDevelopmentAwareness[key] / total) * 100
    );
  });

  Object.keys(projectExperience).forEach((key) => {
    projectExperience[key] = Math.round(
      (projectExperience[key] / total) * 100
    );
  });

  Object.keys(learningGoals).forEach((key) => {
    learningGoals[key] = Math.round((learningGoals[key] / total) * 100);
  });

  return {
    totalParticipants: total,
    technologyAwareness,
    programmingConceptAwareness,
    softwareDevelopmentAwareness,
    projectExperience,
    learningGoals,
  };
}
