export interface SurveyData {
  id: string;
  name: string;
  submittedAt: string;
  technologies: string[];
  technologyFamiliarity: {
    [key: string]: string;
  };
  programmingTerms: {
    [key: string]: string;
  };
  basicTerms: {
    [key: string]: string;
  };
  webDevelopment: {
    [key: string]: string;
  };
  developmentTools: string[];
  toolsFamiliarity: {
    [key: string]: string;
  };
  projectExperience: string;
  projectTypes: string[];
  learningGoals: string[];
}

export interface AdminDashboardStats {
  totalParticipants: number;
  technologyAwareness: { [key: string]: number };
  programmingConceptAwareness: { [key: string]: number };
  softwareDevelopmentAwareness: { [key: string]: number };
  projectExperience: { [key: string]: number };
  learningGoals: { [key: string]: number };
}
