// /src/components/CertificatePreview.tsx
import React from 'react';

const CertificatePreview: React.FC = ({ name, workshop, college, date }: any) => {
  return (
    <div>
      <h3>Certificate Preview</h3>
      <p>Certificate of Participation</p>
      <p>This is to certify that {name} participated in the workshop: {workshop}</p>
      <p>College: {college}</p>
      <p>Date: {date}</p>
    </div>
  );
};

export default CertificatePreview;
