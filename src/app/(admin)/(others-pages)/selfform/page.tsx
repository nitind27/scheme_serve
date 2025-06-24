


import Loader from '@/common/Loader';
import Breadcrumbs from '@/components/common/BreadcrumbItem'
import { Schemesdatas } from '@/components/schemesdata/schemes';

import {  vyaktikDataall } from '@/components/schemeserve/Bhautikdatatype';
import Vyaktigatdata from '@/components/schemeserve/Vyaktigatdata';
// import Documentsdata from '@/components/Documentsdata/Documentsdata'
import React, { Suspense } from 'react'

const getUsers = async (): Promise<vyaktikDataall[]> => {
  const res = await fetch(`http://localhost:3000/api/vyaktikapi`, { cache: 'no-store' });
 
  return res.json();

};
const getschemescrud = async (): Promise<Schemesdatas[]> => {

  const schemescrud = await fetch(`https://schemeserve.weclocks.online/api/schemescrud`, { cache: 'no-store' });
  // console.log("reess", res)
  return schemescrud.json();

};

const page = async () => {

  const [users] = await Promise.all([
    getUsers(),

  ]);
  const [schemescrud] = await Promise.all([
    getschemescrud(),

  ]);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'वैयक्तिक', href: '/bhautik' },

  ];
  // console.log("users", users)
  return (
    <div className="grid grid-cols-6 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <Suspense fallback={<Loader />}>
          <Breadcrumbs
            title="वैयक्तिक"
            breadcrumbs={breadcrumbItems}
          />
          <Vyaktigatdata initialdata={users} schemescrud={schemescrud} />
        </Suspense>

      </div>
    </div>
  )
}

export default page
