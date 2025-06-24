import pool from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM vaykatigatdb where status = "Active"'
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
      `INSERT INTO vaykatigatdb (
        totaltribalecount, totalmembersname, familymembercount, castcertificate,
        aadharcard, voteridcard, rationcard, jobcard, pmfarmercard, farmercreditcard,
        aayushmancard, headofmember, housetype,
        benefiteofpmhouse, waterdrink, hargharnal, electricity, hospitalphc,
        sanjaygandhi, studybenefite, farmeavilebleornot, studyvanpatta,
        sikklacelloffamily, whichschoolchlid, anyhaveaashramschool, lpggas,
        bankaccount, studtatcoop, pmvimayojna, praklpkaryalaly, itarvibhagudan,
        niymitaarogya, rationcard_no, rationcardtype, contact_no
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.totaltribalecount,
        body.totalmembersname,
        body.familymembercount,
        body.castcertificate,
        body.aadharcard,
        body.voteridcard,
        body.rationcard,
        body.jobcard,
        body.pmfarmercard,
        body.farmercreditcard,
        body.aayushmancard,
        body.headofmember,

        body.housetype,
        body.benefiteofpmhouse,
        body.waterdrink,
        body.hargharnal,
        body.electricity,
        body.hospitalphc,
        body.sanjaygandhi,
        body.studybenefite,
        body.farmeavilebleornot,
        body.studyvanpatta,
        body.sikklacelloffamily,
        body.whichschoolchlid,
        body.anyhaveaashramschool,
        body.lpggas,
        body.bankaccount,
        body.studtatcoop,
        body.pmvimayojna,
        body.praklpkaryalaly,
        body.itarvibhagudan,
        body.niymitaarogya,
        body.rationcard_no,
        body.rationcardtype,
        body.contact_no,
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
    return NextResponse.json({ error: 'vaykati ID and status are required' }, { status: 400 });
  }

  try {
    await pool.query(
      'UPDATE vaykatigatdb SET status = ? WHERE id = ?',
      [status, id]
    );
    return NextResponse.json({ message: `vaykati ${status === 'active' ? 'activated' : 'deactivated'}` });
  } catch (error) {
    console.error('Status update error:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
