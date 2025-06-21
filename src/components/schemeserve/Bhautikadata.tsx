"use client";

import { useEffect, useState } from 'react';
// import Label from "../form/Label";
// import { ReusableTable } from "../tables/BasicTableOne";
import { Column } from "../tables/tabletype";
// import Select from 'react-select';
import { toast } from 'react-toastify';
import React from 'react';
// import { MultiValue } from 'react-select';
import { useToggleContext } from '@/context/ToggleContext';
import Loader from '@/common/Loader';
import DefaultModal from '../example/ModalExample/DefaultModal';
// import { FaEdit } from 'react-icons/fa';
// import { Schemesdatas } from '../schemesdata/schemes';
import { BhautikTable } from '../tables/BhautikTable';
// import { Schemesubcategorytype } from '../Schemesubcategory/Schemesubcategory';

// Define interfaces
interface BhautikData {

    // Population Data
    ekunSankhya: {
        female: string;
        male: string;
        total: string;
    };
    tribalPopulation: {
        female: string;
        male: string;
        total: string;
    };
    tribalPopulationTkWari: string;

    // Family Data
    totalFamilyNumbers: string;
    tribalsWholeFamilyNumbers: string;
    vaitikAadivasi: string;
    samuhikVanpatta: string;
    cfrmAarakhda: string;

    // Document Data
    aadharcard: {
        asleli: string;
        nasleli: string;
    };
    matdarOlahkhap: {
        asleli: string;
        nasleli: string;
    };
    jaticheGmanap: {
        asleli: string;
        nasleli: string;
    };
    rashionCard: {
        asleli: string;
        nasleli: string;
    };
    jobCard: {
        asleli: string;
        nasleli: string;
    };
    pmKisanCard: {
        asleli: string;
        nasleli: string;
    };
    ayushmanCard: {
        asleli: string;
        nasleli: string;
    };

    // Housing Data
    aadivasiHouse: {
        pakkeGhar: string;
        kudaMatiGhar: string;
    };
    pmAwasYojana: string;

    // Facilities Data
    panyaPanyachiSuvidha: {
        asleli: string;
        nasleli: string;
    };
    harGharNalYojana: {
        asleli: string;
        nasleli: string;
    };
    vidyutikaran: {
        asleli: string;
        nasleli: string;
    };

    // Infrastructure Data
    arogyUpcharKendra: string;
    generalHealthCheckup: string;
    sickleCellAnemiaScreening: string;
    primarySchool: string;
    middleSchool: string;
    kindergarten: string;
    mobileNetwork: string;
    gramPanchayatBuilding: string;
    mobileMedicalUnit: string;
    gotulSocietyBuilding: string;
    nadiTalav: string;
}

interface BhautikDataall {
  totalpopulation: string;         // e.g., "50|30|80"
  tribalpopulation: string;        // e.g., "40|20|60"
  tribalpopulationtkkwari: string;
  totalfamilynumbers: string;
  tribalwholefamilynumbers: string;
  aadhaarcard: string;
  voteridcard: string;
  rationcard: string;
  jobcard: string;
  pmfarmercard: string;
  ayushmancard: string;
  electrificationforfamilies: string;
  elementaryschool: string;
  middleschool: string;
  riverlake: string;
  id: number;
  status: string;
}

interface Props {
    initialdata: BhautikDataall[];

    // filtersubcategory: any[];
    // filteryear: any[];
}type Triple = {
    female?: string;
    male?: string;
    total?: string;
};

type Double = {
    asleli?: string;
    nasleli?: string;
};

const Bhautikadata: React.FC<Props> = ({
    initialdata,

}) => {
    // const { isActive, setIsActive, isEditMode, setIsEditmode, setIsmodelopen, setisvalidation } = useToggleContext();
    const { isEditMode, setIsmodelopen, setisvalidation } = useToggleContext();
    const [data, setData] = useState<BhautikDataall[]>(initialdata || []);

    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    // Initialize form state
    const [formData, setFormData] = useState<BhautikData>({
        ekunSankhya: { female: '', male: '', total: '' },
        tribalPopulation: { female: '', male: '', total: '' },
        tribalPopulationTkWari: '',
        totalFamilyNumbers: '',
        tribalsWholeFamilyNumbers: '',
        vaitikAadivasi: '',
        samuhikVanpatta: '',
        cfrmAarakhda: '',
        aadharcard: { asleli: '', nasleli: '' },
        matdarOlahkhap: { asleli: '', nasleli: '' },
        jaticheGmanap: { asleli: '', nasleli: '' },
        rashionCard: { asleli: '', nasleli: '' },
        jobCard: { asleli: '', nasleli: '' },
        pmKisanCard: { asleli: '', nasleli: '' },
        ayushmanCard: { asleli: '', nasleli: '' },
        aadivasiHouse: { pakkeGhar: '', kudaMatiGhar: '' },
        pmAwasYojana: '',
        panyaPanyachiSuvidha: { asleli: '', nasleli: '' },
        harGharNalYojana: { asleli: '', nasleli: '' },
        vidyutikaran: { asleli: '', nasleli: '' },
        arogyUpcharKendra: '',
        generalHealthCheckup: '',
        sickleCellAnemiaScreening: '',
        primarySchool: '',
        middleSchool: '',
        kindergarten: '',
        mobileNetwork: '',
        gramPanchayatBuilding: '',
        mobileMedicalUnit: '',
        gotulSocietyBuilding: '',
        nadiTalav: ''
    });

    // Handle nested state changes
    const handleNestedChange = (
        parentField: keyof BhautikData,
        childField: string,
        value: string
    ) => {
        setFormData(prev => {
            const parent = prev[parentField];
            // Only spread if parent is an object
            const parentObj = (typeof parent === 'object' && parent !== null) ? parent : {};
            return {
                ...prev,
                [parentField]: {
                    ...parentObj,
                    [childField]: value
                }
            };
        });
    };


    // Handle simple field changes
    const handleChange = (field: keyof BhautikData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Validation function
    const validateInputs = () => {
        const errors: Partial<Record<keyof BhautikData, string>> = {};
        setisvalidation(true);

        // Validate required fields
        if (!formData.ekunSankhya.female) errors.ekunSankhya = "Female population is required";
        if (!formData.tribalPopulationTkWari) errors.tribalPopulationTkWari = "Tribal population TK Wari is required";
        // Add more validations as needed

        return Object.keys(errors).length === 0;
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/bhautikapi');
            const result = await response.json();
            setData(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchData();
    }, [])
    const transformFormData = (data: BhautikData) => {
        const transformTriple = (obj: Triple) => {
            if (obj && typeof obj === 'object') {
                return [obj.female ?? '', obj.male ?? '', obj.total ?? ''].join('|');
            }
            return '';
        };

        const transformDouble = (obj: Double) => {
            if (obj && typeof obj === 'object') {
                return [obj.asleli ?? '', obj.nasleli ?? ''].join('|');
            }
            return '';
        };

        return {
            ...data,
            ekunSankhya: transformTriple(data.ekunSankhya),
            tribalPopulation: transformTriple(data.tribalPopulation),
            aadharcard: transformDouble(data.aadharcard),
            matdarOlahkhap: transformDouble(data.matdarOlahkhap),
            jaticheGmanap: transformDouble(data.jaticheGmanap),
            rashionCard: transformDouble(data.rashionCard),
            jobCard: transformDouble(data.jobCard),
            pmKisanCard: transformDouble(data.pmKisanCard),
            ayushmanCard: transformDouble(data.ayushmanCard),
            aadivasiHouse: `${data.aadivasiHouse.pakkeGhar}|${data.aadivasiHouse.kudaMatiGhar}`,
            panyaPanyachiSuvidha: transformDouble(data.panyaPanyachiSuvidha),
            harGharNalYojana: transformDouble(data.harGharNalYojana),
            vidyutikaran: transformDouble(data.vidyutikaran)
        };
    };


    // Handle form submission
    const handleSave = async () => {
        if (!validateInputs()) return;
        setLoading(true);

        const apiUrl = isEditMode ? `/api/bhautikapi/${editId}` : '/api/bhautikapi';
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const transformedData = transformFormData(formData);
            console.log("transformedData", transformedData)
            const response = await fetch(apiUrl, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transformedData)
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            toast.success(isEditMode ? 'Data updated successfully!' : 'Data saved successfully!');
            fetchData();
            resetForm();
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error(isEditMode ? 'Failed to update data' : 'Failed to save data');
        } finally {
            setLoading(false);
            setIsmodelopen(false);
        }
    };

    // Reset form to initial state
    const resetForm = () => {
        setFormData({
            ekunSankhya: { female: '', male: '', total: '' },
            tribalPopulation: { female: '', male: '', total: '' },
            tribalPopulationTkWari: '',
            totalFamilyNumbers: '',
            tribalsWholeFamilyNumbers: '',
            vaitikAadivasi: '',
            samuhikVanpatta: '',
            cfrmAarakhda: '',
            aadharcard: { asleli: '', nasleli: '' },
            matdarOlahkhap: { asleli: '', nasleli: '' },
            jaticheGmanap: { asleli: '', nasleli: '' },
            rashionCard: { asleli: '', nasleli: '' },
            jobCard: { asleli: '', nasleli: '' },
            pmKisanCard: { asleli: '', nasleli: '' },
            ayushmanCard: { asleli: '', nasleli: '' },
            aadivasiHouse: { pakkeGhar: '', kudaMatiGhar: '' },
            pmAwasYojana: '',
            panyaPanyachiSuvidha: { asleli: '', nasleli: '' },
            harGharNalYojana: { asleli: '', nasleli: '' },
            vidyutikaran: { asleli: '', nasleli: '' },
            arogyUpcharKendra: '',
            generalHealthCheckup: '',
            sickleCellAnemiaScreening: '',
            primarySchool: '',
            middleSchool: '',
            kindergarten: '',
            mobileNetwork: '',
            gramPanchayatBuilding: '',
            mobileMedicalUnit: '',
            gotulSocietyBuilding: '',
            nadiTalav: ''
        });
        setEditId(null);
    };

    // Handle edit functionality
    // const handleEdit = (item:BhautikData) => {
    //     setIsmodelopen(true);
    //     setIsEditmode(true);
    //     setIsActive(!isActive);
    //     // setEditId(item.id.);

    //     // Populate form with existing data
    //     setFormData({
    //         ekunSankhya: item.ekunSankhya || { female: '', male: '', total: '' },
    //         tribalPopulation: item.tribalPopulation || { female: '', male: '', total: '' },
    //         tribalPopulationTkWari: item.tribalPopulationTkWari || '',
    //         totalFamilyNumbers: item.totalFamilyNumbers || '',
    //         tribalsWholeFamilyNumbers: item.tribalsWholeFamilyNumbers || '',
    //         vaitikAadivasi: item.vaitikAadivasi || '',
    //         samuhikVanpatta: item.samuhikVanpatta || '',
    //         cfrmAarakhda: item.cfrmAarakhda || '',
    //         aadharcard: item.aadharcard || { asleli: '', nasleli: '' },
    //         matdarOlahkhap: item.matdarOlahkhap || { asleli: '', nasleli: '' },
    //         jaticheGmanap: item.jaticheGmanap || { asleli: '', nasleli: '' },
    //         rashionCard: item.rashionCard || { asleli: '', nasleli: '' },
    //         jobCard: item.jobCard || { asleli: '', nasleli: '' },
    //         pmKisanCard: item.pmKisanCard || { asleli: '', nasleli: '' },
    //         ayushmanCard: item.ayushmanCard || { asleli: '', nasleli: '' },
    //         aadivasiHouse: item.aadivasiHouse || { pakkeGhar: '', kudaMatiGhar: '' },
    //         pmAwasYojana: item.pmAwasYojana || '',
    //         panyaPanyachiSuvidha: item.panyaPanyachiSuvidha || { asleli: '', nasleli: '' },
    //         harGharNalYojana: item.harGharNalYojana || { asleli: '', nasleli: '' },
    //         vidyutikaran: item.vidyutikaran || { asleli: '', nasleli: '' },
    //         arogyUpcharKendra: item.arogyUpcharKendra || '',
    //         generalHealthCheckup: item.generalHealthCheckup || '',
    //         sickleCellAnemiaScreening: item.sickleCellAnemiaScreening || '',
    //         primarySchool: item.primarySchool || '',
    //         middleSchool: item.middleSchool || '',
    //         kindergarten: item.kindergarten || '',
    //         mobileNetwork: item.mobileNetwork || '',
    //         gramPanchayatBuilding: item.gramPanchayatBuilding || '',
    //         mobileMedicalUnit: item.mobileMedicalUnit || '',
    //         gotulSocietyBuilding: item.gotulSocietyBuilding || '',
    //         nadiTalav: item.nadiTalav || ''
    //     });
    // };

    // Table columns

    const columns: Column<BhautikDataall>[] = [
        {
            key: "totalpopulation_male",
            label: "Total Male",
            render: (data) => <span>{data.totalpopulation?.split("|")[0] || "-"}</span>,
        },
        {
            key: "totalpopulation_female",
            label: "Total Female",
            render: (data) => <span>{data.totalpopulation?.split("|")[1] || "-"}</span>,
        },
        {
            key: "totalpopulation_total",
            label: "Total Population",
            render: (data) => <span>{data.totalpopulation?.split("|")[2] || "-"}</span>,
        },
        {
            key: "tribalpopulation_male",
            label: "Tribal Male",
            render: (data) => <span>{data.tribalpopulation?.split("|")[0] || "-"}</span>,
        },
        {
            key: "tribalpopulation_female",
            label: "Tribal Female",
            render: (data) => <span>{data.tribalpopulation?.split("|")[1] || "-"}</span>,
        },
        {
            key: "tribalpopulation_total",
            label: "Tribal Total",
            render: (data) => <span>{data.tribalpopulation?.split("|")[2] || "-"}</span>,
        },
        {
            key: "tribalpopulationtkkwari",
            label: "TK Wari",
            render: (data) => <span>{data.tribalpopulationtkkwari || "-"}</span>,
        },
        {
            key: "totalfamilynumbers",
            label: "Total Families",
            render: (data) => <span>{data.totalfamilynumbers || "-"}</span>,
        },
        {
            key: "tribalwholefamilynumbers",
            label: "Tribal Families",
            render: (data) => <span>{data.tribalwholefamilynumbers || "-"}</span>,
        },
        {
            key: "aadhaarcard",
            label: "Aadhaar Card",
            render: (data) => <span>{data.aadhaarcard || "-"}</span>,
        },
        {
            key: "voteridcard",
            label: "Voter ID",
            render: (data) => <span>{data.voteridcard || "-"}</span>,
        },
        {
            key: "rationcard",
            label: "Ration Card",
            render: (data) => <span>{data.rationcard || "-"}</span>,
        },
        {
            key: "jobcard",
            label: "Job Card",
            render: (data) => <span>{data.jobcard || "-"}</span>,
        },
        {
            key: "pmfarmercard",
            label: "PM Farmer Card",
            render: (data) => <span>{data.pmfarmercard || "-"}</span>,
        },
        {
            key: "ayushmancard",
            label: "Ayushman Card",
            render: (data) => <span>{data.ayushmancard || "-"}</span>,
        },
        {
            key: "electrificationforfamilies",
            label: "Electricity",
            render: (data) => <span>{data.electrificationforfamilies || "-"}</span>,
        },
        {
            key: "elementaryschool",
            label: "Elementary School",
            render: (data) => <span>{data.elementaryschool || "-"}</span>,
        },
        {
            key: "middleschool",
            label: "Middle School",
            render: (data) => <span>{data.middleschool || "-"}</span>,
        },
        {
            key: "riverlake",
            label: "River/Lake",
            render: (data) => <span>{data.riverlake || "-"}</span>,
        },
        {
            key: "actions",
            label: "Actions",
            render: (data) => (
                <div className="flex gap-2 whitespace-nowrap w-full">
                    {/* <span
                        // onClick={() => handleEdit(data)}
                        className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        <FaEdit className="inline-block align-middle text-lg" />
                    </span> */}
                    <span>
                        <DefaultModal
                            id={data.id}
                            fetchData={fetchData}
                            endpoint={"bhautikapi"}
                            bodyname={"id"}
                            newstatus={data.status}
                        />
                    </span>
                </div>
            ),
        },
    ];



    return (
        <div className="">
            {loading && <Loader />}
            <BhautikTable
                data={data}
                title='Bhautik Data'
                classname={"h-[650px] overflow-y-auto scrollbar-hide"}
                inputfiled={
                    <div className="max-w-7xl mx-auto p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Ekun Sankhya */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-4">Ekun Sankhya</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Female</label>
                                        <input
                                            type="text"
                                            placeholder="Female"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.ekunSankhya.female}
                                            onChange={(e) => handleNestedChange('ekunSankhya', 'female', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Male</label>
                                        <input
                                            type="text"
                                            placeholder="Male"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.ekunSankhya.male}
                                            onChange={(e) => handleNestedChange('ekunSankhya', 'male', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                                        <input
                                            type="text"
                                            placeholder="Total"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.ekunSankhya.total}
                                            onChange={(e) => handleNestedChange('ekunSankhya', 'total', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tribal Population */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-4">Tribal population</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Female</label>
                                        <input
                                            type="text"
                                            placeholder="Female"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.tribalPopulation.female}
                                            onChange={(e) => handleNestedChange('tribalPopulation', 'female', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Male</label>
                                        <input
                                            type="text"
                                            placeholder="Male"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.tribalPopulation.male}
                                            onChange={(e) => handleNestedChange('tribalPopulation', 'male', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                                        <input
                                            type="text"
                                            placeholder="Total"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.tribalPopulation.total}
                                            onChange={(e) => handleNestedChange('tribalPopulation', 'total', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tribal Population TK Wari */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tribal Population Tk Wari</label>
                                <input
                                    type="text"
                                    placeholder="Tribal Population Tk Wari"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.tribalPopulationTkWari}
                                    onChange={(e) => handleChange('tribalPopulationTkWari', e.target.value)}
                                />
                            </div>

                            {/* Total family numbers */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total family numbers</label>
                                <input
                                    type="text"
                                    placeholder="Total family numbers"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.totalFamilyNumbers}
                                    onChange={(e) => handleChange('totalFamilyNumbers', e.target.value)}
                                />
                            </div>

                            {/* Tribals as a whole Family numbers */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tribals as a whole Family numbers</label>
                                <input
                                    type="text"
                                    placeholder="Tribals family numbers"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.tribalsWholeFamilyNumbers}
                                    onChange={(e) => handleChange('tribalsWholeFamilyNumbers', e.target.value)}
                                />
                            </div>

                            {/* Vaitik Aadivasi */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vaitik Aadivasi</label>
                                <input
                                    type="text"
                                    placeholder="Vaitik Aadivasi"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.vaitikAadivasi}
                                    onChange={(e) => handleChange('vaitikAadivasi', e.target.value)}
                                />
                            </div>

                            {/* Samuhik Vanpatta */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Samuhik Vanpatta</label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="samuhikVanpatta"
                                            value="yes"
                                            checked={formData.samuhikVanpatta === "yes"}
                                            onChange={() => handleChange("samuhikVanpatta", "yes")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="samuhikVanpatta"
                                            value="no"
                                            checked={formData.samuhikVanpatta === "no"}
                                            onChange={() => handleChange("samuhikVanpatta", "no")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* CFRM Aarakhda */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-2">CFRM Aarakhda</label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="cfrmAarakhda"
                                            value="yes"
                                            checked={formData.cfrmAarakhda === "yes"}
                                            onChange={() => handleChange("cfrmAarakhda", "yes")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="cfrmAarakhda"
                                            value="no"
                                            checked={formData.cfrmAarakhda === "no"}
                                            onChange={() => handleChange("cfrmAarakhda", "no")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* Aadhar Card */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">Aadharcard</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Asleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.aadharcard.asleli}
                                            onChange={(e) => handleNestedChange('aadharcard', 'asleli', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nasleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Nasleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.aadharcard.nasleli}
                                            onChange={(e) => handleNestedChange('aadharcard', 'nasleli', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Matdar Olakhap */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">Matdar Olakhap</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Asleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.matdarOlahkhap.asleli}
                                            onChange={(e) => handleNestedChange('matdarOlahkhap', 'asleli', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nasleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Nasleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.matdarOlahkhap.nasleli}
                                            onChange={(e) => handleNestedChange('matdarOlahkhap', 'nasleli', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Jatiche Gmanap */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">Jatiche Gmanap</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Asleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.jaticheGmanap.asleli}
                                            onChange={(e) => handleNestedChange('jaticheGmanap', 'asleli', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nasleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Nasleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.jaticheGmanap.nasleli}
                                            onChange={(e) => handleNestedChange('jaticheGmanap', 'nasleli', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Rashion Card */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">Rashion Card</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Asleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.rashionCard.asleli}
                                            onChange={(e) => handleNestedChange('rashionCard', 'asleli', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nasleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Nasleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.rashionCard.nasleli}
                                            onChange={(e) => handleNestedChange('rashionCard', 'nasleli', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Job Card */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">Job Card</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Asleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.jobCard.asleli}
                                            onChange={(e) => handleNestedChange('jobCard', 'asleli', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nasleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Nasleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.jobCard.nasleli}
                                            onChange={(e) => handleNestedChange('jobCard', 'nasleli', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PM Kisan Card */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">PM Kisan Card</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Asleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.pmKisanCard.asleli}
                                            onChange={(e) => handleNestedChange('pmKisanCard', 'asleli', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nasleli Aadivasi Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Nasleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.pmKisanCard.nasleli}
                                            onChange={(e) => handleNestedChange('pmKisanCard', 'nasleli', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Ayushman Card */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">Ayushman Card</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asleli Aadivasi Kutumb Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Asleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.ayushmanCard.asleli}
                                            onChange={(e) => handleNestedChange('ayushmanCard', 'asleli', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nasleli Aadivasi Kutumb Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Nasleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.ayushmanCard.nasleli}
                                            onChange={(e) => handleNestedChange('ayushmanCard', 'nasleli', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Aadivasi House */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">Aadivasi House</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pakke Ghar</label>
                                        <input
                                            type="text"
                                            placeholder="Pakke Ghar"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.aadivasiHouse.pakkeGhar}
                                            onChange={(e) => handleNestedChange('aadivasiHouse', 'pakkeGhar', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Kuda/Mati Ghar</label>
                                        <input
                                            type="text"
                                            placeholder="Kuda/Mati Ghar"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.aadivasiHouse.kudaMatiGhar}
                                            onChange={(e) => handleNestedChange('aadivasiHouse', 'kudaMatiGhar', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PM Awas Yojana */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-1">PM Awas Yojana</label>
                                <input
                                    type="text"
                                    placeholder="PM Awas Yojana"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.pmAwasYojana}
                                    onChange={(e) => handleChange('pmAwasYojana', e.target.value)}
                                />
                            </div>

                            {/* Panya Panyachi Suvidha */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">Panya Panyachi Suvidha</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asleli Aadivasi Kutumb Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Asleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.panyaPanyachiSuvidha.asleli}
                                            onChange={(e) => handleNestedChange('panyaPanyachiSuvidha', 'asleli', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nasleli Aadivasi Kutumb Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Nasleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.panyaPanyachiSuvidha.nasleli}
                                            onChange={(e) => handleNestedChange('panyaPanyachiSuvidha', 'nasleli', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Har Ghar Nal Yojana */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">Har Ghar Nal Yojana</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asleli Aadivasi Kutumb Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Asleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.harGharNalYojana.asleli}
                                            onChange={(e) => handleNestedChange('harGharNalYojana', 'asleli', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nasleli Aadivasi Kutumb Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Nasleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.harGharNalYojana.nasleli}
                                            onChange={(e) => handleNestedChange('harGharNalYojana', 'nasleli', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Vidyutikaran */}
                            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                                <h3 className="text-lg font-semibold mb-4">Vidyutikaran</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Asleli Aadivasi Kutumb Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Asleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.vidyutikaran.asleli}
                                            onChange={(e) => handleNestedChange('vidyutikaran', 'asleli', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nasleli Aadivasi Kutumb Sankhya</label>
                                        <input
                                            type="text"
                                            placeholder="Nasleli"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            value={formData.vidyutikaran.nasleli}
                                            onChange={(e) => handleNestedChange('vidyutikaran', 'nasleli', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Health and Education Facilities */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Arogy Upchar Kendra/PHC</label>
                                <input
                                    type="text"
                                    placeholder="Arogy Upchar Kendra"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.arogyUpcharKendra}
                                    onChange={(e) => handleChange('arogyUpcharKendra', e.target.value)}
                                />
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-1">General Health Checkup</label>
                                <input
                                    type="text"
                                    placeholder="General Health Checkup"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.generalHealthCheckup}
                                    onChange={(e) => handleChange('generalHealthCheckup', e.target.value)}
                                />
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Screening for sickle cell and anemia</label>
                                <input
                                    type="text"
                                    placeholder="Sickle cell screening"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.sickleCellAnemiaScreening}
                                    onChange={(e) => handleChange('sickleCellAnemiaScreening', e.target.value)}
                                />
                            </div>

                            {/* Primary School */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Primary School</label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="primarySchool"
                                            value="yes"
                                            checked={formData.primarySchool === "yes"}
                                            onChange={() => handleChange("primarySchool", "yes")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="primarySchool"
                                            value="no"
                                            checked={formData.primarySchool === "no"}
                                            onChange={() => handleChange("primarySchool", "no")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* Middle School */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Middle School</label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="middleSchool"
                                            value="yes"
                                            checked={formData.middleSchool === "yes"}
                                            onChange={() => handleChange("middleSchool", "yes")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="middleSchool"
                                            value="no"
                                            checked={formData.middleSchool === "no"}
                                            onChange={() => handleChange("middleSchool", "no")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* Kindergarten */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kindergarten</label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="kindergarten"
                                            value="yes"
                                            checked={formData.kindergarten === "yes"}
                                            onChange={() => handleChange("kindergarten", "yes")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="kindergarten"
                                            value="no"
                                            checked={formData.kindergarten === "no"}
                                            onChange={() => handleChange("kindergarten", "no")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* Mobile Network Facilities */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Network Facilities</label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="mobileNetwork"
                                            value="yes"
                                            checked={formData.mobileNetwork === "yes"}
                                            onChange={() => handleChange("mobileNetwork", "yes")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="mobileNetwork"
                                            value="no"
                                            checked={formData.mobileNetwork === "no"}
                                            onChange={() => handleChange("mobileNetwork", "no")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* Gram Panchayat Building */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gram Panchayat Building</label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gramPanchayatBuilding"
                                            value="yes"
                                            checked={formData.gramPanchayatBuilding === "yes"}
                                            onChange={() => handleChange("gramPanchayatBuilding", "yes")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gramPanchayatBuilding"
                                            value="no"
                                            checked={formData.gramPanchayatBuilding === "no"}
                                            onChange={() => handleChange("gramPanchayatBuilding", "no")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* Mobile Medical Unit */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Medical Unit</label>
                                <input
                                    type="text"
                                    placeholder="Mobile Medical Unit"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.mobileMedicalUnit}
                                    onChange={(e) => handleChange('mobileMedicalUnit', e.target.value)}
                                />
                            </div>

                            {/* Gotul Society Building */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gotul Society Building</label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gotulSocietyBuilding"
                                            value="yes"
                                            checked={formData.gotulSocietyBuilding === "yes"}
                                            onChange={() => handleChange("gotulSocietyBuilding", "yes")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gotulSocietyBuilding"
                                            value="no"
                                            checked={formData.gotulSocietyBuilding === "no"}
                                            onChange={() => handleChange("gotulSocietyBuilding", "no")}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* Nadi Talav */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nadi Talav</label>
                                <input
                                    type="text"
                                    placeholder="Nadi Talav"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.nadiTalav}
                                    onChange={(e) => handleChange('nadiTalav', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>}
                submitbutton={
                    <button
                        type='button'
                        onClick={handleSave}
                        className='bg-blue-700 text-white py-2 p-2 rounded'
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : (isEditMode ? 'Update' : 'Save Changes')}
                    </button>
                }
                searchKey="beneficiery_name"
                columns={columns}
            />
        </div>
    );
};

export default Bhautikadata;