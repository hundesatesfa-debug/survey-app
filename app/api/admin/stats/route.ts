import { NextRequest, NextResponse } from 'next/server';
import { getAllSurveys, calculateStatistics } from '@/lib/db';

export async function GET() {
  try {
    const surveys = getAllSurveys();
    const stats = calculateStatistics(surveys);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
