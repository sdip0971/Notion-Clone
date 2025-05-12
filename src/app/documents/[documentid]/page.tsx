import React from 'react';
import { Input } from "@/components/ui/input";
import { updateDocumenttitle } from '@/utils/updatedocument';
import { last } from 'lodash';
import DocumentPage from '@/components/ui/documentPage';

function Page({ params }: { params: { documentid: string } }) {
    const { documentid } = params; 
    return (
        <DocumentPage documentid={params.documentid} />
    );
}

export default Page;