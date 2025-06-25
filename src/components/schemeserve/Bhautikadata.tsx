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
import { Schemesdatas } from '../schemesdata/schemes';
// import { Schemesubcategorytype } from '../Schemesubcategory/Schemesubcategory';

// Define interfaces
interface BhautikData {
    scheme_name: string;
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
    // contact_no: string;
    // rationcard_no: string;
    allroadvillages: string;
    village_distance: string;

}

interface BhautikDataall {
    scheme_name: string;         // e.g., "50|30|80"
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
    forestshareholderno: string;
    collectiveforestry: string;
    cfrmplan: string;
    breedstandards: string;
    adivasis: string;
    tribalbenefitnumber: string;
    stepfacilities: string;
    everygharnaalyojana: string;
    healthfacilityis: string;
    generalhealthcheckup: string;
    sickleanemia: string;
    kindergarten: string;
    mobilefacilities: string;
    mobilemedicalunit: string;
    gotulsocietybuilding: string;
    allroadvillages: string;
    village_distance: string;
}

interface Props {
    initialdata: BhautikDataall[];
    schemescrud: Schemesdatas[];

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
    schemescrud

}) => {
    // const { isActive, setIsActive, isEditMode, setIsEditmode, setIsmodelopen, setisvalidation } = useToggleContext();
    const { isActive, setIsActive, setIsEditmode, isEditMode, setIsmodelopen, setisvalidation } = useToggleContext();
    const [data, setData] = useState<BhautikDataall[]>(initialdata || []);
    const [schemedata] = useState<Schemesdatas[]>(schemescrud || []);

    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    // Initialize form state
    const [formData, setFormData] = useState<BhautikData>({
        scheme_name: "",
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
        nadiTalav: '',
        // contact_no: '',
        // rationcard_no: '',
        allroadvillages: '',
        village_distance: ''
    });

    // Handle nested state changes
    const handleNestedChange = (
        parentField: keyof BhautikData,
        childField: string,
        value: string
    ) => {
        setFormData(prev => {
            const parent = prev[parentField];
            let updated: Record<string, string>;
            if (parentField === 'ekunSankhya' || parentField === 'tribalPopulation') {
                // Only destructure for population fields
                const { female = '', male = '', total = '', ...rest } = (typeof parent === 'object' && parent !== null) ? parent as { female?: string; male?: string; total?: string } : {};
                updated = {
                    ...rest,
                    female,
                    male,
                    total,
                    [childField]: value
                };
                if (childField === 'female' || childField === 'male') {
                    const newFemale = childField === 'female' ? value : female;
                    const newMale = childField === 'male' ? value : male;
                    updated.total = String(Number(newFemale) + Number(newMale));
                }
            } else {
                // Generic fallback for other fields
                const parentObj = (typeof parent === 'object' && parent !== null) ? parent : {};
                updated = {
                    ...parentObj,
                    [childField]: value
                };
            }
            return {
                ...prev,
                [parentField]: updated
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

        // // Validate required fields
        // if (!formData.ekunSankhya.female) errors.ekunSankhya = "Female population is required";
        // if (!formData.tribalPopulationTkWari) errors.tribalPopulationTkWari = "Tribal population TK Wari is required";
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

    // Add this useEffect after formData is defined
    useEffect(() => {
        const total = Number(formData.ekunSankhya.female) + Number(formData.ekunSankhya.male);
        const tribal = Number(formData.tribalPopulation.female) + Number(formData.tribalPopulation.male);
        let percent = '';
        if (total > 0) {
            percent = ((tribal / total) * 100).toFixed(2);
        }
        setFormData(prev => ({
            ...prev,
            tribalPopulationTkWari: percent
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.ekunSankhya.female, formData.ekunSankhya.male, formData.tribalPopulation.female, formData.tribalPopulation.male]);

    const transformFormData = (data: BhautikData) => {
        const transformTriple = (obj: Triple) =>
            obj && typeof obj === 'object'
                ? [obj.female ?? '', obj.male ?? '', obj.total ?? ''].join('|')
                : '';

        const transformDouble = (obj: Double) =>
            obj && typeof obj === 'object'
                ? [obj.asleli ?? '', obj.nasleli ?? ''].join('|')
                : '';

        return {
            scheme_name: data.scheme_name,
            totalpopulation: transformTriple(data.ekunSankhya),
            tribalpopulation: transformTriple(data.tribalPopulation),
            tribalpopulationtkkwari: data.tribalPopulationTkWari,
            totalfamilynumbers: data.totalFamilyNumbers,
            tribalwholefamilynumbers: data.tribalsWholeFamilyNumbers,
            forestshareholderno: data.vaitikAadivasi,
            collectiveforestry: data.samuhikVanpatta,
            cfrmplan: data.cfrmAarakhda,
            aadhaarcard: transformDouble(data.aadharcard),
            voteridcard: transformDouble(data.matdarOlahkhap),
            breedstandards: transformDouble(data.jaticheGmanap),
            rationcard: transformDouble(data.rashionCard),
            jobcard: transformDouble(data.jobCard),
            pmfarmercard: transformDouble(data.pmKisanCard),
            ayushmancard: transformDouble(data.ayushmanCard),
            adivasis: `${data.aadivasiHouse.pakkeGhar}|${data.aadivasiHouse.kudaMatiGhar}`,
            tribalbenefitnumber: data.pmAwasYojana,
            stepfacilities: transformDouble(data.panyaPanyachiSuvidha),
            everygharnaalyojana: transformDouble(data.harGharNalYojana),
            electrificationforfamilies: transformDouble(data.vidyutikaran),
            healthfacilityis: data.arogyUpcharKendra,
            generalhealthcheckup: data.generalHealthCheckup,
            sickleanemia: data.sickleCellAnemiaScreening,
            elementaryschool: data.primarySchool,
            middleschool: data.middleSchool,
            kindergarten: data.kindergarten,
            mobilefacilities: data.mobileNetwork,
            mobilemedicalunit: data.mobileMedicalUnit,
            gotulsocietybuilding: data.gotulSocietyBuilding,
            riverlake: data.nadiTalav,
            allroadvillages: data.allroadvillages,
            village_distance: data.village_distance
        };
    };


    // Handle form submission
    const handleSave = async () => {
        if (!validateInputs()) return;
        setLoading(true);

        const apiUrl = '/api/bhautikapi';
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const transformedData = {
                ...(isEditMode && { id: editId }), // include id only on PUT
                ...transformFormData(formData)
            };

            console.log("transformedData", transformedData);

            const response = await fetch(apiUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transformedData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

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
            scheme_name: "",
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
            nadiTalav: '',
            // contact_no: '',
            // rationcard_no: '',
            allroadvillages: '',
            village_distance: '',
        });
        setEditId(null);
    };

    const handleEdit = (item: BhautikDataall) => {
        setIsmodelopen(true);
        setIsEditmode(true);
        setIsActive(!isActive);
        setEditId(item.id);

        // Helper functions to parse pipe-separated values
        const parseTriple = (value: string): { female: string; male: string; total: string } => {
            const [female = '', male = '', total = ''] = value?.split('|') || [];
            return { female, male, total };
        };

        const parseDouble = (value: string): { asleli: string; nasleli: string } => {
            const [asleli = '', nasleli = ''] = value?.split('|') || [];
            return { asleli, nasleli };
        };

        const parseAadivasiHouse = (value: string): { pakkeGhar: string; kudaMatiGhar: string } => {
            const [pakkeGhar = '', kudaMatiGhar = ''] = value?.split('|') || [];
            return { pakkeGhar, kudaMatiGhar };
        };

        // Set the form data with all transformed values
        setFormData({
            scheme_name: item.scheme_name || '',
            ekunSankhya: parseTriple(item.totalpopulation),
            tribalPopulation: parseTriple(item.tribalpopulation),
            tribalPopulationTkWari: item.tribalpopulationtkkwari || '',
            totalFamilyNumbers: item.totalfamilynumbers || '',
            tribalsWholeFamilyNumbers: item.tribalwholefamilynumbers || '',
            vaitikAadivasi: item.forestshareholderno || '', // Added mapping
            samuhikVanpatta: item.collectiveforestry || '', // Added mapping
            cfrmAarakhda: item.cfrmplan || '', // Added mapping
            aadharcard: parseDouble(item.aadhaarcard),
            matdarOlahkhap: parseDouble(item.voteridcard),
            jaticheGmanap: parseDouble(item.breedstandards), // Added mapping
            rashionCard: parseDouble(item.rationcard),
            jobCard: parseDouble(item.jobcard),
            pmKisanCard: parseDouble(item.pmfarmercard),
            ayushmanCard: parseDouble(item.ayushmancard),
            aadivasiHouse: parseAadivasiHouse(item.adivasis || ''), // Added mapping
            pmAwasYojana: item.tribalbenefitnumber || '', // Added mapping
            panyaPanyachiSuvidha: parseDouble(item.stepfacilities || ''), // Added mapping
            harGharNalYojana: parseDouble(item.everygharnaalyojana || ''), // Added mapping
            vidyutikaran: parseDouble(item.electrificationforfamilies),
            arogyUpcharKendra: item.healthfacilityis || '', // Added mapping
            generalHealthCheckup: item.generalhealthcheckup || '', // Added mapping
            sickleCellAnemiaScreening: item.sickleanemia || '', // Added mapping
            primarySchool: item.elementaryschool || '',
            middleSchool: item.middleschool || '',
            kindergarten: item.kindergarten || '', // Added mapping
            mobileNetwork: item.mobilefacilities || '', // Added mapping
            gramPanchayatBuilding: '', // Not available in BhautikDataall
            mobileMedicalUnit: item.mobilemedicalunit || '', // Added mapping
            gotulSocietyBuilding: item.gotulsocietybuilding || '', // Added mapping
            nadiTalav: item.riverlake || '',
            allroadvillages: item.allroadvillages || '',
            village_distance: item.village_distance || ''
        });
    };;

    const columns: Column<BhautikDataall>[] = [
        {
            key: "totalpopulation_male",
            label: "स्री",
            render: (data) => <span>{data.totalpopulation?.split("|")[0] || "-"}</span>,
        },
        {
            key: "totalpopulation_female",
            label: "पुरुष",
            render: (data) => <span>{data.totalpopulation?.split("|")[1] || "-"}</span>,
        },
        {
            key: "totalpopulation_total",
            label: "एकूण कुटुंब संख्या",
            render: (data) => <span>{data.totalpopulation?.split("|")[2] || "-"}</span>,
        },
        {
            key: "tribalpopulation_male",
            label: "स्री",
            render: (data) => <span>{data.tribalpopulation?.split("|")[0] || "-"}</span>,
        },
        {
            key: "tribalpopulation_female",
            label: "पुरुष",
            render: (data) => <span>{data.tribalpopulation?.split("|")[1] || "-"}</span>,
        },
        {
            key: "tribalpopulation_total",
            label: "आदिवासी लोकसंख्या",
            render: (data) => <span>{data.tribalpopulation?.split("|")[2] || "-"}</span>,
        },
        {
            key: "tribalpopulationtkkwari",
            label: "आदिवासी लोकसंख्या टक्केवारी",
            render: (data) => <span>{data.tribalpopulationtkkwari || "-"}</span>,
        },
        {
            key: "totalfamilynumbers",
            label: "कुटुंब संख्या",
            render: (data) => <span>{data.totalfamilynumbers || "-"}</span>,
        },
        {
            key: "tribalwholefamilynumbers",
            label: "एकूण आदिवासी कुटुंब संख्या",
            render: (data) => <span>{data.tribalwholefamilynumbers || "-"}</span>,
        },
        {
            key: "aadhaarcard",
            label: "आधारकार्ड",
            render: (data) => <span>{data.aadhaarcard || "-"}</span>,
        },
        {
            key: "voteridcard",
            label: "मतदार ओळखपत्र",
            render: (data) => <span>{data.voteridcard || "-"}</span>,
        },
        {
            key: "rationcard",
            label: "राशन कार्ड",
            render: (data) => <span>{data.rationcard || "-"}</span>,
        },
        {
            key: "jobcard",
            label: "जॉब कार्ड",
            render: (data) => <span>{data.jobcard || "-"}</span>,
        },
        {
            key: "pmfarmercard",
            label: "PM किसान कार्ड",
            render: (data) => <span>{data.pmfarmercard || "-"}</span>,
        },
        {
            key: "ayushmancard",
            label: "आयुष्मान कार्ड",
            render: (data) => <span>{data.ayushmancard || "-"}</span>,
        },
        {
            key: "electrificationforfamilies",
            label: "विद्युतीकरण",
            render: (data) => <span>{data.electrificationforfamilies || "-"}</span>,
        },
        {
            key: "elementaryschool",
            label: "प्राथमिक शाळा",
            render: (data) => <span>{data.elementaryschool || "-"}</span>,
        },
        {
            key: "middleschool",
            label: "माध्यमिक शाळा",
            render: (data) => <span>{data.middleschool || "-"}</span>,
        },
        {
            key: "riverlake",
            label: "नदी तलाव",
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
                title='धरती आबा ( भौतिक तक्ता)'
                classname={"h-[650px] overflow-y-auto scrollbar-hide"}
                inputfiled={
                    <div className="max-w-7xl mx-auto p-4">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5 ">
                            {/* CFRMC आराखडा */}


                            <div className="md:col-span-4 rounded-lg shadow p-4 mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1 h-5">तालुका </label>
                                <select
                                    name=""
                                    id=""
                                    className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 "
                                        }`}
                                    value={formData.scheme_name}
                                    onChange={(e) => handleChange('scheme_name', e.target.value)}
                                >
                                    <option value="">तालुका निवडा</option>
                                    {schemedata.map((category) => (
                                        <option key={category.scheme_id} value={category.scheme_id}>
                                            {category.scheme_name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className="md:col-span-4  rounded-lg shadow p-4 mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1 h-5">
                                    गाव
                                </label>
                                <select
                                    name=""
                                    id=""
                                    className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 "
                                        }`}
                                    value={formData.scheme_name}
                                    onChange={(e) => handleChange('scheme_name', e.target.value)}
                                >
                                    <option value="">गाव  निवडा</option>
                                    {schemedata.map((category) => (
                                        <option key={category.scheme_id} value={category.scheme_id}>
                                            {category.scheme_name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            {/* आधारकार्ड */}
                            <div className="md:col-span-4 rounded-lg shadow p-4 mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1 h-5">ग्रामपंचायत  </label>
                                <select
                                    name=""
                                    id=""
                                    className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 "
                                        }`}
                                    value={formData.scheme_name}
                                    onChange={(e) => handleChange('scheme_name', e.target.value)}
                                >
                                    <option value="">ग्रामपंचायत  निवडा</option>
                                    {schemedata.map((category) => (
                                        <option key={category.scheme_id} value={category.scheme_id}>
                                            {category.scheme_name}
                                        </option>
                                    ))}
                                </select>

                            </div>


                        </div>
                        <div>
                            योजना 
                            <select
                                name=""
                                id=""
                                className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 "
                                        }`}
                                value={formData.scheme_name}
                                onChange={(e) => handleChange('scheme_name', e.target.value)}
                            >
                                <option value="">योजना निवडा</option>
                                {schemedata.map((category) => (
                                    <option key={category.scheme_id} value={category.scheme_id}>
                                        {category.scheme_name}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className='md:flex gap-4 mt-5'>


                            <div className="bg-gray-100  rounded-lg shadow p-4  col-span-1 md:col-span-3">
                                <h3 className="text-lg font-semibold mb-2">एकूण लोकसंख्या</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-5 mb-1">स्री</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white bg-white"
                                            value={formData.ekunSankhya.female}
                                            onChange={(e) => handleNestedChange('ekunSankhya', 'female', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-5 mb-1">पुरुष</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white bg-white"
                                            value={formData.ekunSankhya.male}
                                            onChange={(e) => handleNestedChange('ekunSankhya', 'male', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-5 mb-1">एकूण</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white bg-white"
                                            value={formData.ekunSankhya.total}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tribal population */}
                            <div className="bg-gray-100 rounded-lg shadow p-4  col-span-1 md:col-span-3 mt-5 md:mt-0">
                                <h3 className="text-lg font-semibold mb-2">आदिवासी लोकसंख्या</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-5 mb-1">स्री</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                            value={formData.tribalPopulation.female}
                                            onChange={(e) => handleNestedChange('tribalPopulation', 'female', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-5 mb-1">पुरुष</label>
                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                            value={formData.tribalPopulation.male}
                                            onChange={(e) => handleNestedChange('tribalPopulation', 'male', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-5 mb-1">एकूण</label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                            value={formData.tribalPopulation.total}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            {/* Total Population */}


                            {/* Other fields in 3-column layout */}
                            <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mt-5'>
                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-6 h-5">आदिवासी लोकसंख्या टक्केवारी</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                        value={formData.tribalPopulationTkWari}
                                        readOnly
                                    />
                                </div>


                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700  mb-6">एकूण कुटुंब संख्या</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                        value={formData.totalFamilyNumbers}
                                        onChange={(e) => handleChange('totalFamilyNumbers', e.target.value)}
                                    />
                                </div>

                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-6 h-5">एकूण कुटुंब संख्या पैकी आदिवासी कुटुंब संख्या</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                        value={formData.tribalsWholeFamilyNumbers}
                                        onChange={(e) => handleChange('tribalsWholeFamilyNumbers', e.target.value)}
                                    />
                                </div>
                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-6 h-5">एकूण आदिवासी कुटुंब संख्या</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                        value={formData.tribalsWholeFamilyNumbers}
                                        onChange={(e) => handleChange('tribalsWholeFamilyNumbers', e.target.value)}
                                    />
                                </div>

                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-6 h-5">वैयक्तिक आदिवासी वनपट्टेधारक संख्या</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                        value={formData.vaitikAadivasi}
                                        onChange={(e) => handleChange('vaitikAadivasi', e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
                                {/* CFRMC आराखडा */}


                                <div className="md:col-span-3 bg-gray-100 rounded-lg shadow p-4 mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-6 h-5">सामूहिक वनपट्टा वाटप आहे/नाही</label>
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
                                <div className="md:col-span-3 bg-gray-100 rounded-lg shadow p-4 mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-6 h-5">
                                        CFRMC आराखडा सादर आहे/नाही
                                    </label>
                                    <div className="flex space-x-6 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="cfrmAarakhda"
                                                value="yes"
                                                checked={formData.cfrmAarakhda === "yes"}
                                                onChange={() => handleChange("cfrmAarakhda", "yes")}
                                                className="h-4 w-4 text-indigo-600"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="cfrmAarakhda"
                                                value="no"
                                                checked={formData.cfrmAarakhda === "no"}
                                                onChange={() => handleChange("cfrmAarakhda", "no")}
                                                className="h-4 w-4 text-indigo-600"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>

                                {/* आधारकार्ड */}
                                <div className="md:col-span-3 bg-gray-100 rounded-lg shadow p-4 mt-4">
                                    <h3 className="text-sm font-semibold h-5">आधारकार्ड</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                असलेली आदिवासी संख्या
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.aadharcard.asleli}
                                                onChange={(e) => handleNestedChange('aadharcard', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                नसलेली आदिवासी संख्या
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.aadharcard.nasleli}
                                                onChange={(e) => handleNestedChange('aadharcard', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* मतदार ओळखपत्र */}
                                <div className="md:col-span-3 bg-gray-100 rounded-lg shadow p-4 mt-4">
                                    <h3 className="text-sm font-semibold  आधारकार्ड">मतदार ओळखपत्र (18 वर्षावरील )</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                असलेली आदिवासी संख्या
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.matdarOlahkhap.asleli}
                                                onChange={(e) => handleNestedChange('matdarOlahkhap', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                नसलेली आदिवासी संख्या
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.matdarOlahkhap.nasleli}
                                                onChange={(e) => handleNestedChange('matdarOlahkhap', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='md:flex gap-4 mt-5'>




                                {/* Matdar Olakhap */}


                                {/* <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-5">राशन कार्ड क्रमांक</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                        value={formData.rationcard_no}
                                        onChange={(e) => handleChange('rationcard_no', e.target.value)}
                                    />
                                </div> */}

                            </div>

                            <div className='md:flex gap-4 '>

                                <div className=" p-2 col-span-1 md:col-span-3  bg-gray-100  rounded-lg shadow mt-5 md:mt-0">
                                    <h3 className="text-sm font-semibold mb">जातीचे प्रमाणपत्र</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.jaticheGmanap.asleli}
                                                onChange={(e) => handleNestedChange('jaticheGmanap', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">नसलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.jaticheGmanap.nasleli}
                                                onChange={(e) => handleNestedChange('jaticheGmanap', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className=" p-2 col-span-1 md:col-span-3 mb-2 bg-gray-100 p-2 rounded-lg shadow mt-5 md:mt-0">


                                    <h3 className="text-sm font-semibold mb-2">राशन कार्ड</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.rashionCard.asleli}
                                                onChange={(e) => handleNestedChange('rashionCard', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">नसलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.rashionCard.nasleli}
                                                onChange={(e) => handleNestedChange('rashionCard', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className=" p-2 col-span-1 md:col-span-3 bg-gray-100 p-2 rounded-lg shadow mt-5 md:mt-0">
                                    <h3 className="text-sm font-semibold mb-2">जॉब कार्ड</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.jobCard.asleli}
                                                onChange={(e) => handleNestedChange('jobCard', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">नसलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.jobCard.nasleli}
                                                onChange={(e) => handleNestedChange('jobCard', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* PM Kisan Card */}
                                <div className=" p-2 col-span-1 md:col-span-3 bg-gray-100 p-2 rounded-lg shadow mt-5 md:mt-0">
                                    <h3 className="text-sm font-semibold mb-2">PM किसान कार्ड</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.pmKisanCard.asleli}
                                                onChange={(e) => handleNestedChange('pmKisanCard', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">नसलेली आदिवासी संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.pmKisanCard.nasleli}
                                                onChange={(e) => handleNestedChange('pmKisanCard', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className='md:flex mt-5 gap-4'>


                                {/* Aadivasi House */}

                                <div className=" p-2 col-span-1 md:col-span-3  bg-gray-100  rounded-lg shadow">
                                    <h3 className="text-sm font-semibold mb-2">एकूण आदिवासी कुटुंबाचे </h3>
                                    <div className="grid grid-cols-2 gap-3">

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1 h-8">पक्के घर </label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.aadivasiHouse.pakkeGhar}
                                                onChange={(e) => handleNestedChange('aadivasiHouse', 'pakkeGhar', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1 h-8">कुडा/मातीचे घर</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.aadivasiHouse.kudaMatiGhar}
                                                onChange={(e) => handleNestedChange('aadivasiHouse', 'kudaMatiGhar', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Ayushman Card */}
                                <div className=" p-2 col-span-1 md:col-span-3  bg-gray-100  rounded-lg shadow mt-5 md:mt-0">
                                    <h3 className="text-sm font-semibold mb-2">आयुष्मान कार्ड</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1 h-8">असलेली आदिवासी कुटुंब संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.ayushmanCard.asleli}
                                                onChange={(e) => handleNestedChange('ayushmanCard', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1 h-8"> नसलेली आदिवासी कुटुंबसंख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.ayushmanCard.nasleli}
                                                onChange={(e) => handleNestedChange('ayushmanCard', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className=" p-2 col-span-1 md:col-span-3  bg-gray-100  rounded-lg shadow mt-5 md:mt-0">
                                    <h3 className="text-sm font-semibold mb-2">पिण्याच्या पाण्याची सुविधा </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1 h-8">असलेली आदिवासी कुटुंब संख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.panyaPanyachiSuvidha.asleli}
                                                onChange={(e) => handleNestedChange('panyaPanyachiSuvidha', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1 h-8"> नसलेली आदिवासी कुटुंबसंख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.panyaPanyachiSuvidha.nasleli}
                                                onChange={(e) => handleNestedChange('panyaPanyachiSuvidha', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className=" p-2 col-span-1 md:col-span-3  bg-gray-100  rounded-lg shadow mt-5 md:mt-0">
                                    <h3 className="text-sm font-semibold mb-2">हर घर नळ योजना</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1 h-8">असलेली आदिवासी कुटुंबसंख्या </label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.harGharNalYojana.asleli}
                                                onChange={(e) => handleNestedChange('harGharNalYojana', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1 h-8"> नसलेली आदिवासी कुटुंबसंख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.harGharNalYojana.nasleli}
                                                onChange={(e) => handleNestedChange('harGharNalYojana', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='md:flex mt-5 gap-4'>

                                <div className=" p-2 col-span-1 md:col-span-3  bg-gray-100  rounded-lg shadow mt-5 md:mt-0 mb-5 md:mb-0">
                                    <h3 className="text-sm font-semibold mb-2 h-8">विद्युतीकरण</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">असलेली आदिवासी कुटुंबसंख्या </label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.vidyutikaran.asleli}
                                                onChange={(e) => handleNestedChange('vidyutikaran', 'asleli', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1"> नसलेली आदिवासी कुटुंबसंख्या</label>
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                                value={formData.vidyutikaran.nasleli}
                                                onChange={(e) => handleNestedChange('vidyutikaran', 'nasleli', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 rounded-lg shadow p-4 mb-5 md:mb-0">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 h-8">सर्व रस्ते जोडलेल्या गावांची संख्या</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                        value={formData.allroadvillages}
                                        onChange={(e) => handleChange('allroadvillages', e.target.value)}
                                    />
                                </div>
                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-7 h-8">५ किमी अंतरापर्यंत बाजारपेठ नसलेल्या गावांची संख्या</label>
                                    <input
                                        type="text"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                        value={formData.village_distance}
                                        onChange={(e) => handleChange('village_distance', e.target.value)}
                                    />
                                </div>
                                <div className=" p-2  bg-gray-100  rounded-lg shadow mt-5 md:mt-0">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1 font-unwrap whitespace-nowrap h-8">पीएम आवास घरकुल लाभ संख्या</label>
                                    <div className="flex space-x-3 mt-1">

                                        <input
                                            type="text"
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-white"
                                            name="pmAwasYojana"
                                            value={formData.pmAwasYojana}

                                            onChange={() => handleChange("pmAwasYojana", "yes")}

                                        />

                                    </div>
                                </div>
                            </div>
                            {/* Jatiche Gmanap */}
                            <div className='grid grid-cols-1 md:grid-cols-6 gap-4 mb-5 mt-5'>
                                {/* Continue with other sections in similar compact format */}
                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 h-6">आरोग्य उपकेंद्र/PHC</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center mb-4">
                                            <input
                                                type="radio"
                                                name="arogyUpcharKendra"
                                                value="yes"
                                                checked={formData.arogyUpcharKendra === "yes"}
                                                onChange={() => handleChange("arogyUpcharKendra", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center  mb-4">
                                            <input
                                                type="radio"
                                                name="arogyUpcharKendra"
                                                value="no"
                                                checked={formData.arogyUpcharKendra === "no"}
                                                onChange={() => handleChange("arogyUpcharKendra", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>






                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1 h-6">सामान्य आरोग्य तपासणी
                                        होय /नाही</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="generalHealthCheckup"
                                                value="yes"
                                                checked={formData.generalHealthCheckup === "yes"}
                                                onChange={() => handleChange("generalHealthCheckup", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="generalHealthCheckup"
                                                value="no"
                                                checked={formData.generalHealthCheckup === "no"}
                                                onChange={() => handleChange("generalHealthCheckup", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>


                                {/* Continue with all remaining fields in similar compact format */}
                                {/* Primary School */}
                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1 h-6">प्राथमिक शाळा</label>
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
                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1 h-6">माध्यमिक शाळा</label>
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
                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1 h-6">अंगणवाडी आहे/ नाही</label>
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
                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1 h-6">मोबाईल नेटवर्क सुविधा</label>
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
                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1 h-6">ग्रामपंचायत इमारत</label>
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
                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1 h-6">गोटूल/ समाज भवन
                                        आहे/ नाही</label>
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



                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1 h-6">मोबाईल वैद्यकीय युनिट</label>



                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="mobileMedicalUnit"
                                                value="yes"
                                                checked={formData.mobileMedicalUnit === "yes"}
                                                onChange={() => handleChange("mobileMedicalUnit", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>


                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="mobileMedicalUnit"
                                                value="no"
                                                checked={formData.mobileMedicalUnit === "no"}
                                                onChange={() => handleChange("mobileMedicalUnit", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>

                                    </div>
                                </div>




                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1 h-10">सिकलसेल आणि ॲनिमियासाठी तपासणी
                                        होय /नाही</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="sickleCellAnemiaScreening"
                                                value="yes"
                                                checked={formData.sickleCellAnemiaScreening === "yes"}
                                                onChange={() => handleChange("sickleCellAnemiaScreening", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="sickleCellAnemiaScreening"
                                                value="no"
                                                checked={formData.sickleCellAnemiaScreening === "no"}
                                                onChange={() => handleChange("sickleCellAnemiaScreening", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="bg-gray-100 rounded-lg shadow p-2 ">
                                    <label className="block text-sm font-medium text-gray-700 mb-5 mb-1">नदी तलाव</label>
                                    <div className="flex space-x-3 mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="nadiTalav"
                                                value="yes"
                                                checked={formData.nadiTalav === "yes"}
                                                onChange={() => handleChange("nadiTalav", "yes")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">होय</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="nadiTalav"
                                                value="no"
                                                checked={formData.nadiTalav === "no"}
                                                onChange={() => handleChange("nadiTalav", "no")}
                                                className="h-3 w-3 text-indigo-600"
                                            />
                                            <span className="ml-1 text-xs text-gray-700">नाही</span>
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