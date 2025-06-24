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


export async function PUT(request: Request) {
  const body = await request.json();

  // Sabhi fields destructure karo
  const {
    id,
    totaltribalecount,
    totalmembersname,
    familymembercount,
    castcertificate,
    aadharcard,
    voteridcard,
    rationcard,
    jobcard,
    pmfarmercard,
    farmercreditcard,
    aayushmancard,
    headofmember,
    housetype,
    benefiteofpmhouse,
    waterdrink,
    hargharnal,
    electricity,
    hospitalphc,
    sanjaygandhi,
    studybenefite,
    farmeavilebleornot,
    studyvanpatta,
    sikklacelloffamily,
    whichschoolchlid,
    anyhaveaashramschool,
    lpggas,
    bankaccount,
    studtatcoop,
    pmvimayojna,
    praklpkaryalaly,
    itarvibhagudan,
    niymitaarogya,
    rationcard_no,
    rationcardtype,
    contact_no,
    status
  } = body;
console.log("idid",id)
  // Basic validation
  if (
    !id ||
    totaltribalecount === undefined ||
    totalmembersname === undefined ||
    familymembercount === undefined ||
    castcertificate === undefined ||
    aadharcard === undefined ||
    voteridcard === undefined ||
    rationcard === undefined ||
    jobcard === undefined ||
    pmfarmercard === undefined ||
    farmercreditcard === undefined ||
    aayushmancard === undefined ||
    headofmember === undefined ||
    housetype === undefined ||
    benefiteofpmhouse === undefined ||
    waterdrink === undefined ||
    hargharnal === undefined ||
    electricity === undefined ||
    hospitalphc === undefined ||
    sanjaygandhi === undefined ||
    studybenefite === undefined ||
    farmeavilebleornot === undefined ||
    studyvanpatta === undefined ||
    sikklacelloffamily === undefined ||
    whichschoolchlid === undefined ||
    anyhaveaashramschool === undefined ||
    lpggas === undefined ||
    bankaccount === undefined ||
    studtatcoop === undefined ||
    pmvimayojna === undefined ||
    praklpkaryalaly === undefined ||
    itarvibhagudan === undefined ||
    niymitaarogya === undefined ||
    rationcard_no === undefined ||
    rationcardtype === undefined ||
    contact_no === undefined ||
    status === undefined
  ) {
    return NextResponse.json({ error: "All fields and ID are required" }, { status: 400 });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE vaykatigatdb SET
        totaltribalecount = ?, totalmembersname = ?, familymembercount = ?, castcertificate = ?,
        aadharcard = ?, voteridcard = ?, rationcard = ?, jobcard = ?, pmfarmercard = ?, farmercreditcard = ?,
        aayushmancard = ?, headofmember = ?, housetype = ?, benefiteofpmhouse = ?, waterdrink = ?, hargharnal = ?,
        electricity = ?, hospitalphc = ?, sanjaygandhi = ?, studybenefite = ?, farmeavilebleornot = ?, studyvanpatta = ?,
        sikklacelloffamily = ?, whichschoolchlid = ?, anyhaveaashramschool = ?, lpggas = ?, bankaccount = ?,
        studtatcoop = ?, pmvimayojna = ?, praklpkaryalaly = ?, itarvibhagudan = ?, niymitaarogya = ?,
        rationcard_no = ?, rationcardtype = ?, contact_no = ?, status = ?
      WHERE id = ?`,
      [
        totaltribalecount,
        totalmembersname,
        familymembercount,
        castcertificate,
        aadharcard,
        voteridcard,
        rationcard,
        jobcard,
        pmfarmercard,
        farmercreditcard,
        aayushmancard,
        headofmember,
        housetype,
        benefiteofpmhouse,
        waterdrink,
        hargharnal,
        electricity,
        hospitalphc,
        sanjaygandhi,
        studybenefite,
        farmeavilebleornot,
        studyvanpatta,
        sikklacelloffamily,
        whichschoolchlid,
        anyhaveaashramschool,
        lpggas,
        bankaccount,
        studtatcoop,
        pmvimayojna,
        praklpkaryalaly,
        itarvibhagudan,
        niymitaarogya,
        rationcard_no,
        rationcardtype,
        contact_no,
        status,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "No record found to update" }, { status: 404 });
    }

    return NextResponse.json({ message: "Record updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}