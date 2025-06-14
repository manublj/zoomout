import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  throw new Error('Missing required environment variables for Google Sheets integration');
}

export async function GET() {
  try {
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
      key: (GOOGLE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID as string, serviceAccountAuth);

    await doc.loadInfo();

    const phasesSheet = doc.sheetsByTitle['Phases'];
    const eventsSheet = doc.sheetsByTitle['Events'];
    const filtersSheet = doc.sheetsByTitle['Filters'];

    await Promise.all([
      phasesSheet.loadCells(),
      eventsSheet.loadCells(),
      filtersSheet.loadCells(),
    ]);

    const phases = [];
    const events = [];
    const filters = [];

    // Read phases
    for (let row = 1; row <= phasesSheet.rowCount; row++) {
      if (phasesSheet.getCell(row, 0).value) {
        phases.push({
          id: phasesSheet.getCell(row, 0).value?.toString() || '',
          name: phasesSheet.getCell(row, 1).value?.toString() || '',
          startDate: phasesSheet.getCell(row, 2).value?.toString() || '',
          endDate: phasesSheet.getCell(row, 3).value?.toString() || '',
          color: phasesSheet.getCell(row, 4).value?.toString() || '#000000',
          description: phasesSheet.getCell(row, 5).value?.toString(),
        });
      }
    }

    // Read events
    for (let row = 1; row <= eventsSheet.rowCount; row++) {
      if (eventsSheet.getCell(row, 0).value) {
        events.push({
          id: eventsSheet.getCell(row, 0).value?.toString() || '',
          title: eventsSheet.getCell(row, 1).value?.toString() || '',
          date: eventsSheet.getCell(row, 2).value?.toString() || '',
          description: eventsSheet.getCell(row, 3).value?.toString(),
          phaseId: eventsSheet.getCell(row, 4).value?.toString() || '',
          type: eventsSheet.getCell(row, 5).value?.toString() as 'milestone' | 'task' | 'note',
          status: eventsSheet.getCell(row, 6).value?.toString() as 'completed' | 'in-progress' | 'pending',
        });
      }
    }

    // Read filters
    for (let row = 1; row <= filtersSheet.rowCount; row++) {
      if (filtersSheet.getCell(row, 0).value) {
        filters.push({
          id: filtersSheet.getCell(row, 0).value?.toString() || '',
          name: filtersSheet.getCell(row, 1).value?.toString() || '',
          active: filtersSheet.getCell(row, 2).value?.toString() === 'TRUE',
          type: filtersSheet.getCell(row, 3).value?.toString() as 'phase' | 'event',
        });
      }
    }

    return NextResponse.json({ phases, events, filters });
  } catch (error) {
    console.error('Error fetching timeline data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timeline data' },
      { status: 500 }
    );
  }
} 