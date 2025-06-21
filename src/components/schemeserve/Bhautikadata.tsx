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
import { FaEdit } from 'react-icons/fa';
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
    const {isActive, setIsActive,setIsEditmode, isEditMode, setIsmodelopen, setisvalidation } = useToggleContext();
    const [data, setData] = useState<BhautikDataall[]>(initialdata || []);
console.log("data",data)
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

   const handleEdit = (item: BhautikDataall) => {
      setIsmodelopen(true);
        setIsEditmode(true);
        setIsActive(!isActive)
        setEditId(item.id)
  // Helper to split pipe string
  const parsePopulation = (value: string): { female: string; male: string; total: string } => {
    const [female = '', male = '', total = ''] = value?.split('|') || [];
    return { female, male, total };
  };

  // Now set form data
  setFormData({
    ekunSankhya: parsePopulation(item.totalpopulation),
    tribalPopulation: parsePopulation(item.tribalpopulation),
    tribalPopulationTkWari: item.tribalpopulationtkkwari || '',
    totalFamilyNumbers: item.totalfamilynumbers || '',
    tribalsWholeFamilyNumbers: item.tribalwholefamilynumbers || '',
    vaitikAadivasi: '', // not available in BhautikDataall
    samuhikVanpatta: '', // not available in BhautikDataall
    cfrmAarakhda: '', // not available in BhautikDataall
    aadharcard: { asleli: item.aadhaarcard || '', nasleli: '' },
    matdarOlahkhap: { asleli: item.voteridcard || '', nasleli: '' },
    jaticheGmanap: { asleli: '', nasleli: '' }, // not available
    rashionCard: { asleli: item.rationcard || '', nasleli: '' },
    jobCard: { asleli: item.jobcard || '', nasleli: '' },
    pmKisanCard: { asleli: item.pmfarmercard || '', nasleli: '' },
    ayushmanCard: { asleli: item.ayushmancard || '', nasleli: '' },
    aadivasiHouse: { pakkeGhar: '', kudaMatiGhar: '' }, // not available
    pmAwasYojana: '', // not available
    panyaPanyachiSuvidha: { asleli: '', nasleli: '' }, // not available
    harGharNalYojana: { asleli: '', nasleli: '' }, // not available
    vidyutikaran: { asleli: item.electrificationforfamilies || '', nasleli: '' },
    arogyUpcharKendra: '', // not available
    generalHealthCheckup: '', // not available
    sickleCellAnemiaScreening: '', // not available
    primarySchool: item.elementaryschool || '',
    middleSchool: item.middleschool || '',
    kindergarten: '', // not available
    mobileNetwork: '', // not available
    gramPanchayatBuilding: '', // not available
    mobileMedicalUnit: '', // not available
    gotulSocietyBuilding: '', // not available
    nadiTalav: item.riverlake || ''
  });
};

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
                    <span
                        onClick={() => handleEdit(data)}
                        className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                        <FaEdit className="inline-block align-middle text-lg" />
                    </span>
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
                        <div className='flex mb-5 gap-4'>


                            <div className="p-2 col-span-1 md:col-span-3">
                                <h3 className="text-lg font-semibold mb-2">Total Population</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Female</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                            value={formData.ekunSankhya.female}
                                            onChange={(e) => handleNestedChange('ekunSankhya', 'female', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Male</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                            value={formData.ekunSankhya.male}
                                            onChange={(e) => handleNestedChange('ekunSankhya', 'male', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                            value={formData.ekunSankhya.total}
                                            onChange={(e) => handleNestedChange('ekunSankhya', 'total', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tribal population */}
                            <div className=" p-2  col-span-1 md:col-span-3">
                                <h3 className="text-lg font-semibold mb-2">Tribal population</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Female</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                            value={formData.tribalPopulation.female}
                                            onChange={(e) => handleNestedChange('tribalPopulation', 'female', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Male</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                            value={formData.tribalPopulation.male}
                                            onChange={(e) => handleNestedChange('tribalPopulation', 'male', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                            value={formData.tribalPopulation.total}
                                            onChange={(e) => handleNestedChange('tribalPopulation', 'total', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            {/* Total Population */}


                            {/* Other fields in 3-column layout */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-5'>
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">आदिवासी टीके वारी</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                        value={formData.tribalPopulationTkWari}
                                        onChange={(e) => handleChange('tribalPopulationTkWari', e.target.value)}
                                    />
                                </div>

                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">कुटुंब संख्या</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                        value={formData.totalFamilyNumbers}
                                        onChange={(e) => handleChange('totalFamilyNumbers', e.target.value)}
                                    />
                                </div>

                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">संपूर्ण आदिवासी कुटुंब संख्या</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                        value={formData.tribalsWholeFamilyNumbers}
                                        onChange={(e) => handleChange('tribalsWholeFamilyNumbers', e.target.value)}
                                    />
                                </div>

                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">वैतिक आदिवासी</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                        value={formData.vaitikAadivasi}
                                        onChange={(e) => handleChange('vaitikAadivasi', e.target.value)}
                                    />
                                </div>

                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">सामूहिक वनपट्ट</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="samuhikVanpatta"
                                                value="yes"
                                                checked={formData.samuhikVanpatta === "yes"}
                                                onChange={() => handleChange("samuhikVanpatta", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="samuhikVanpatta"
                                                value="no"
                                                checked={formData.samuhikVanpatta === "no"}
                                                onChange={() => handleChange("samuhikVanpatta", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>

                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CFRM आराखडा</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="cfrmAarakhda"
                                                value="yes"
                                                checked={formData.cfrmAarakhda === "yes"}
                                                onChange={() => handleChange("cfrmAarakhda", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="cfrmAarakhda"
                                                value="no"
                                                checked={formData.cfrmAarakhda === "no"}
                                                onChange={() => handleChange("cfrmAarakhda", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-4 mb-5'>


                                {/* Aadhar Card */}
                                <div className=" p-2 col-span-1 md:col-span-3">
                                    <h3 className="text-sm font-semibold mb-2">आधारकार्ड</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.aadharcard.asleli}
                                                onChange={(e) => handleNestedChange('aadharcard', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">नसलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.aadharcard.nasleli}
                                                onChange={(e) => handleNestedChange('aadharcard', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Matdar Olakhap */}
                                <div className=" p-2 col-span-1 md:col-span-3">
                                    <h3 className="text-sm font-semibold mb-2">मतदार ओळखप</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.matdarOlahkhap.asleli}
                                                onChange={(e) => handleNestedChange('matdarOlahkhap', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">नसलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.matdarOlahkhap.nasleli}
                                                onChange={(e) => handleNestedChange('matdarOlahkhap', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className=" p-2 col-span-1 md:col-span-3">
                                    <h3 className="text-sm font-semibold mb-2">जातीचे गणणप</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.jaticheGmanap.asleli}
                                                onChange={(e) => handleNestedChange('jaticheGmanap', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">नसलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.jaticheGmanap.nasleli}
                                                onChange={(e) => handleNestedChange('jaticheGmanap', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Job Card */}
                            {/* Job Card */}
                            <div className='flex gap-4 mb-5'>

                                <div className=" p-2 col-span-1 md:col-span-3">
                                    <h3 className="text-sm font-semibold mb-2">जॉब कार्ड</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.jobCard.asleli}
                                                onChange={(e) => handleNestedChange('jobCard', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">नसलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.jobCard.nasleli}
                                                onChange={(e) => handleNestedChange('jobCard', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* PM Kisan Card */}
                                <div className=" p-2 col-span-1 md:col-span-3">
                                    <h3 className="text-sm font-semibold mb-2">पीएम किसान कार्ड</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.pmKisanCard.asleli}
                                                onChange={(e) => handleNestedChange('pmKisanCard', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">नसलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.pmKisanCard.nasleli}
                                                onChange={(e) => handleNestedChange('pmKisanCard', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Ayushman Card */}
                                <div className=" p-2 col-span-1 md:col-span-3">
                                    <h3 className="text-sm font-semibold mb-2">आयुष्मान कार्ड</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी कुटुंब संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.ayushmanCard.asleli}
                                                onChange={(e) => handleNestedChange('ayushmanCard', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">नसलेली आदिवासी कुटुंब संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                                value={formData.ayushmanCard.nasleli}
                                                onChange={(e) => handleNestedChange('ayushmanCard', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Aadivasi House */}
                            <div className=" p-2 col-span-1 md:col-span-3 mb-5">
                                <h3 className="text-sm font-semibold mb-2">आदिवासी घर</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">पक्के घर</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                            value={formData.aadivasiHouse.pakkeGhar}
                                            onChange={(e) => handleNestedChange('aadivasiHouse', 'pakkeGhar', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">कुडा/माती घर</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                            value={formData.aadivasiHouse.kudaMatiGhar}
                                            onChange={(e) => handleNestedChange('aadivasiHouse', 'kudaMatiGhar', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Jatiche Gmanap */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-5'>
                                {/* Continue with other sections in similar compact format */}
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">पीएम आवास योजना</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                        value={formData.pmAwasYojana}
                                        onChange={(e) => handleChange('pmAwasYojana', e.target.value)}
                                    />
                                </div>

                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        आरोग्य उपचार केंद्र/PHC
                                    </label>
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center gap-1 text-sm">
                                            <input
                                                type="radio"
                                                name="arogyUpcharKendra"
                                                value="yes"
                                                checked={formData.arogyUpcharKendra === "yes"}
                                                onChange={() => handleChange("arogyUpcharKendra", "yes")}
                                            />
                                            होय
                                        </label>
                                        <label className="flex items-center gap-1 text-sm">
                                            <input
                                                type="radio"
                                                name="arogyUpcharKendra"
                                                value="no"
                                                checked={formData.arogyUpcharKendra === "no"}
                                                onChange={() => handleChange("arogyUpcharKendra", "no")}
                                            />
                                            नाही
                                        </label>
                                    </div>
                                </div>


                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">सामान्य आरोग्य तपासणी</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                        value={formData.generalHealthCheckup}
                                        onChange={(e) => handleChange('generalHealthCheckup', e.target.value)}
                                    />
                                </div>

                                {/* Continue with all remaining fields in similar compact format */}
                                {/* Primary School */}
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">प्राथमिक शाळा</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="primarySchool"
                                                value="yes"
                                                checked={formData.primarySchool === "yes"}
                                                onChange={() => handleChange("primarySchool", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="primarySchool"
                                                value="no"
                                                checked={formData.primarySchool === "no"}
                                                onChange={() => handleChange("primarySchool", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Middle School */}
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">माध्यमिक शाळा</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="middleSchool"
                                                value="yes"
                                                checked={formData.middleSchool === "yes"}
                                                onChange={() => handleChange("middleSchool", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="middleSchool"
                                                value="no"
                                                checked={formData.middleSchool === "no"}
                                                onChange={() => handleChange("middleSchool", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Kindergarten */}
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">किंडरगार्टन</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="kindergarten"
                                                value="yes"
                                                checked={formData.kindergarten === "yes"}
                                                onChange={() => handleChange("kindergarten", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="kindergarten"
                                                value="no"
                                                checked={formData.kindergarten === "no"}
                                                onChange={() => handleChange("kindergarten", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Mobile Network */}
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">मोबाईल नेटवर्क सुविधा</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="mobileNetwork"
                                                value="yes"
                                                checked={formData.mobileNetwork === "yes"}
                                                onChange={() => handleChange("mobileNetwork", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="mobileNetwork"
                                                value="no"
                                                checked={formData.mobileNetwork === "no"}
                                                onChange={() => handleChange("mobileNetwork", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Gram Panchayat Building */}
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ग्रामपंचायत इमारत</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gramPanchayatBuilding"
                                                value="yes"
                                                checked={formData.gramPanchayatBuilding === "yes"}
                                                onChange={() => handleChange("gramPanchayatBuilding", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gramPanchayatBuilding"
                                                value="no"
                                                checked={formData.gramPanchayatBuilding === "no"}
                                                onChange={() => handleChange("gramPanchayatBuilding", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Gotul Society Building */}
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">गोटुल सोसायटी इमारत</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gotulSocietyBuilding"
                                                value="yes"
                                                checked={formData.gotulSocietyBuilding === "yes"}
                                                onChange={() => handleChange("gotulSocietyBuilding", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gotulSocietyBuilding"
                                                value="no"
                                                checked={formData.gotulSocietyBuilding === "no"}
                                                onChange={() => handleChange("gotulSocietyBuilding", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Nadi Talav */}
                              

                                {/* मोबाईल वैद्यकीय युनिट */}
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">मोबाईल वैद्यकीय युनिट</label>
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center gap-1 text-sm">
                                            <input
                                                type="radio"
                                                name="mobileMedicalUnit"
                                                value="yes"
                                                checked={formData.mobileMedicalUnit === "yes"}
                                                onChange={() => handleChange("mobileMedicalUnit", "yes")}
                                            />
                                            होय
                                        </label>
                                        <label className="flex items-center gap-1 text-sm">
                                            <input
                                                type="radio"
                                                name="mobileMedicalUnit"
                                                value="no"
                                                checked={formData.mobileMedicalUnit === "no"}
                                                onChange={() => handleChange("mobileMedicalUnit", "no")}
                                            />
                                            नाही
                                        </label>
                                    </div>
                                </div>


                                {/* Sickle Cell Screening */}
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">सिकल सेल आणि अशक्तपणा तपासणी</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                                        value={formData.sickleCellAnemiaScreening}
                                        onChange={(e) => handleChange('sickleCellAnemiaScreening', e.target.value)}
                                    />
                                </div>

                                  {/* नदी तलाव */}
                                <div className=" p-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">नदी तलाव</label>
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center gap-1 text-sm">
                                            <input
                                                type="radio"
                                                name="nadiTalav"
                                                value="yes"
                                                checked={formData.nadiTalav === "yes"}
                                                onChange={() => handleChange("nadiTalav", "yes")}
                                            />
                                            होय
                                        </label>
                                        <label className="flex items-center gap-1 text-sm">
                                            <input
                                                type="radio"
                                                name="nadiTalav"
                                                value="no"
                                                checked={formData.nadiTalav === "no"}
                                                onChange={() => handleChange("nadiTalav", "no")}
                                            />
                                            नाही
                                        </label>
                                    </div>
                                </div>
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