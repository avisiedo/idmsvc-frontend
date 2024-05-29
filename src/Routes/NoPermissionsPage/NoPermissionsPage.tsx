import React, { useEffect } from 'react';

import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import { Button } from '@patternfly/react-core';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const NoPermissionsPage = () => {
  useEffect(() => {
    insights?.chrome?.appAction?.('no-permissions');
  }, []);

  const { isBeta } = useChrome();
  const prefix = isBeta() ? '/beta' : '/preview';
  const linkMyUserAccess = prefix + '/iam/my-user-access';

  return (
    <Main>
      <NotAuthorized
        serviceName="Directory and Domain"
        showReturnButton
        title="Access permissions needed"
        description={
          <>
            To access identity domains, contact your organization <br />
            administrator. Aternatively, visit
            <br />
            <Button component="a" variant="link" isInline iconPosition="right" href={linkMyUserAccess} ouiaId="LinkNoPermissionsMyUserAccess">
              My User Access
            </Button>{' '}
            to learn more about your permissions.
          </>
        }
      />
    </Main>
  );
};

export default NoPermissionsPage;
