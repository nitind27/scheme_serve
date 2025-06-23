import pool from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM bhautikdb where status = "Active"'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  const body = await request.json();

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO bhautikdb (
        totalpopulation, tribalpopulation, tribalpopulationtkkwari,
        totalfamilynumbers, tribalwholefamilynumbers, forestshareholderno,
        collectiveforestry, cfrmplan, aadhaarcard, voteridcard, breedstandards,
        rationcard, jobcard, pmfarmercard, ayushmancard, adivasis,
        tribalbenefitnumber, stepfacilities, everygharnaalyojana,
        electrificationforfamilies, healthfacilityis, generalhealthcheckup,
        sickleanemia, elementaryschool, middleschool, kindergarten,
        mobilefacilities, mobilemedicalunit, gotulsocietybuilding, riverlake, scheme_name, rationcard_no, allroadvillages, village_distance
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.ekunSankhya,
        body.tribalPopulation,
        body.tribalPopulationTkWari,
        body.totalFamilyNumbers,
        body.tribalsWholeFamilyNumbers,
        body.vaitikAadivasi,
        body.samuhikVanpatta,
        body.cfrmAarakhda,
        body.aadharcard,
        body.matdarOlahkhap,
        body.jaticheGmanap,
        body.rashionCard,
        body.jobCard,
        body.pmKisanCard,
        body.ayushmanCard,
        body.aadivasiHouse,
        body.pmAwasYojana,
        body.panyaPanyachiSuvidha,
        body.harGharNalYojana,
        body.vidyutikaran,
        body.arogyUpcharKendra,
        body.generalHealthCheckup,
        body.sickleCellAnemiaScreening,
        body.primarySchool,
        body.middleSchool,
        body.kindergarten,
        body.mobileNetwork,
        body.mobileMedicalUnit,
        body.gotulSocietyBuilding,
        body.nadiTalav,
        body.scheme_name,
     
        body.rationcard_no,
        body.allroadvillages,
        body.village_distance,
      ]
    );

    return NextResponse.json({ message: 'Document category created', id: result.insertId });
  } catch (error) {
    console.error('Creation error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}


export async function PATCH(request: Request) {
  const { id, status } = await request.json();

  if (!id || !status) {
    return NextResponse.json({ error: 'documents ID and status are required' }, { status: 400 });
  }

  try {
    await pool.query(
      'UPDATE bhautikdb SET status = ? WHERE id = ?',
      [status, id]
    );
    return NextResponse.json({ message: `documents ${status === 'active' ? 'activated' : 'deactivated'}` });
  } catch (error) {
    console.error('Status update error:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}