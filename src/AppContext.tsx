import { createContext } from 'react';
import { Domain } from './Api';
import { VerifyState } from './Routes/WizardPage/Components/VerifyRegistry/VerifyRegistry';

/**
 * It represents the application context so common events and properties
 * are shared for many components, making their values accessible.
 * @public
 */
export interface IAppContext {
  /** Represent the current list of domains to be displayed in the listDomains view. */
  getDomains: () => Domain[];
  /** Callback to set the value of `domains`. */
  setDomains: (domains: Domain[]) => void;
  /** Encapsulates the context related with the wizard. */
  wizard: {
    /** Retrieve the current token, required to register a domain. */
    getToken: () => string;
    /** Set the value of the token. */
    setToken: (value: string) => void;
    /** Retrieve the value of the registered status which is updated once
     * the user has registered the domain by using ipa-hcc tool. */
    getRegisteredStatus: () => VerifyState;
    /** Setter for the registered status. */
    setRegisteredStatus: (value: VerifyState) => void;
    /** Get the ephemeral domain state that manage the wizard. */
    getDomain: () => Domain;
    /** Set the ephemeral domain information. */
    setDomain: (value: Domain) => void;
  };
}

/**
 * Represent the application context.
 * @public
 */
export const AppContext = createContext<IAppContext>({
  getDomains: (): Domain[] => {
    return [];
  },
  setDomains: (domains: Domain[]) => {
    throw new Error('Function "setDomains" not implemented: domains=' + domains);
  },
  wizard: {
    getToken: (): string => {
      return '';
    },
    setToken: (value: string) => {
      throw new Error('Function "setToken" not implemented: value=' + value);
    },
    getRegisteredStatus: (): VerifyState => {
      return 'initial';
    },
    setRegisteredStatus: (value: VerifyState) => {
      throw new Error('Function "setRegisteredStatus" not implemented: value=' + value);
    },
    getDomain: (): Domain => {
      return {} as Domain;
    },
    setDomain: (value: Domain) => {
      throw new Error('Function "setDomain" not implemented: value=' + value);
    },
  },
});
