


import Loader from '@/common/Loader';
import Breadcrumbs from '@/components/common/BreadcrumbItem'
import Bhautikadata from '@/components/schemeserve/Bhautikadata';
import { BhautikDataall } from '@/components/schemeserve/Bhautikdatatype';
// import Documentsdata from '@/components/Documentsdata/Documentsdata'
import React, { Suspense } from 'react'

const getUsers = async (): Promise<BhautikDataall[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bhautikapi`, { cache: 'no-store' });
  console.log("reess", res)
  return res.json();
};

const page = async () => {

  const [users] = await Promise.all([
    getUsers(),

  ]);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Bhautik', href: '/bhautik' },

  ];
  console.log("users", users)
  return (
    <div className="grid grid-cols-6 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <Suspense fallback={<Loader />}>
          <Breadcrumbs
            title="Bhautik"
            breadcrumbs={breadcrumbItems}
          />
          <Bhautikadata initialdata={users} />
        </Suspense>

      </div>
    </div>
  )
}

export default page
