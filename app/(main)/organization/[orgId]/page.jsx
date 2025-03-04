import { getOrganization } from '@/action/organization';
import React from 'react'
import OrgSwitcher from '@/components/org-switcher';
import ProjectList from './_components/projectList';

const Organization = async({params}) => {
  const { orgId } = params;
  const organization = await getOrganization(orgId);
  if(!organization){
    return <div>Orgabization not found</div>
  }
  return (
    <div className='container mx-auto'>
      <div className='mb-4 flex flex-col sm:flex-row justify-between items-start'>
        <h1 className='text-5xl font-bold gradient-title pb-2'>
          {organization.name}&rsquo;s Projects
        </h1>
        <OrgSwitcher/>
      </div>
      <div className='mb-4'>
        <ProjectList orgId={organization.id} />
      </div>
      <div className='mt-8'>
        Show user assigned and reported issues here
      </div>
    </div>
  )
}

export default Organization
