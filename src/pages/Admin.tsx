import { PageContainer } from '@ant-design/pro-components';
import React, { PropsWithChildren } from 'react';

const Admin: React.FC<PropsWithChildren> = (props) => {
  const {children} = props

  return (
    <PageContainer>
      {children}
    </PageContainer>
  );
};

export default Admin;
