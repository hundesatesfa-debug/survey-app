import { NextRequest, NextResponse } from 'next/server';
import { saveSurvey, getAllSurveys } from '@/lib/db';
import { SurveyData } from '@/types/survey';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const survey: SurveyData = {
      id: generateId(),
      name: body.name,
      submittedAt: new Date().toISOString(),
      technologies: body.technologies,
      technologyFamiliarity: body.technologyFamiliarity,
      programmingTerms: body.programmingTerms,
      basicTerms: body.basicTerms,
      webDevelopment: body.webDevelopment,
      developmentTools: body.developmentTools,
      toolsFamiliarity: body.toolsFamiliarity,
      projectExperience: body.projectExperience,
      projectTypes: body.projectTypes,
      learningGoals: body.learningGoals,
    };

    saveSurvey(survey);

    return NextResponse.json(
      { success: true, id: survey.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving survey:', error);
    return NextResponse.json(
      { error: 'Failed to save survey' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const surveys = getAllSurveys();
    return NextResponse.json(surveys);
  } catch (error) {
    console.error('Error fetching surveys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch surveys' },
      { status: 500 }
    );
  }
}
