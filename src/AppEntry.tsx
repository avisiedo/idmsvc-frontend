import React, { useContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from './store';
import App from './App';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import logger from 'redux-logger';
import { AppContext } from './AppContext';
import { Domain } from './Api';
import { VerifyState } from './Routes/WizardPage/Components/VerifyRegistry/VerifyRegistry';

const AppEntry = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [wizardToken, setWizardToken] = useState<string>('');
  const [wizardDomain, setWizardDomain] = useState<Domain>({} as Domain);
  const [wizardRegisterStatus, setWizardRegisterStatus] = useState<VerifyState>('initial');

  const cbGetDomains = (): Domain[] => {
    return domains;
  };
  const cbSetDomains = (value: Domain[]) => {
    setDomains(value);
  };
  const cbGetWizardToken = (): string => {
    return wizardToken;
  };
  const cbSetWizardToken = (value: string) => {
    setWizardToken(value);
  };
  const cbGetWizardDomain = (): Domain => {
    return wizardDomain;
  };
  const cbSetWizardDomain = (value: Domain) => {
    setWizardDomain(value);
  };
  const cbGetRegisterStatus = (): VerifyState => {
    return wizardRegisterStatus;
  };
  const cbSetRegisterStatus = (value: VerifyState) => {
    setWizardRegisterStatus(value);
  };
  return (
    <Provider store={init(...(process.env.NODE_ENV !== 'production' ? [logger] : [])).getStore()}>
      <Router basename={getBaseName(window.location.pathname)}>
        <AppContext.Provider
          value={{
            getDomains: cbGetDomains,
            setDomains: cbSetDomains,
            wizard: {
              getToken: cbGetWizardToken,
              setToken: cbSetWizardToken,
              getRegisteredStatus: cbGetRegisterStatus,
              setRegisteredStatus: cbSetRegisterStatus,
              getDomain: cbGetWizardDomain,
              setDomain: cbSetWizardDomain,
            },
          }}
        >
          <App />
        </AppContext.Provider>
      </Router>
    </Provider>
  );
};

export default AppEntry;
