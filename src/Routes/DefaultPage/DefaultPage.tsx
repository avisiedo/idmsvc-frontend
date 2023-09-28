import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import { RegistryIcon } from '@patternfly/react-icons/dist/esm/icons/registry-icon';

import {
  Bullseye,
  Button,
  Card,
  CardBody,
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  Flex,
  FlexItem,
  Page,
  PageSection,
  Pagination,
  Stack,
  StackItem,
  Title,
  Toolbar,
} from '@patternfly/react-core';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';

import './DefaultPage.scss';
import Section from '@redhat-cloud-services/frontend-components/Section';
import { Domain, ResourcesApiFactory } from '../../Api/api';
import { DomainList } from '../../Components/DomainList/DomainList';
import { AppContext } from '../../AppContext';

// const SampleComponent = lazy(() => import('../../Components/SampleComponent/sample-component'));

const Header = () => {
  const linkLearnMoreAbout = 'https://access.redhat.com/articles/1586893';
  const title = 'Directory and Domain Services';

  return (
    <>
      <PageHeader>
        <PageHeaderTitle title={title} />
        <p>
          Manage registered domains to leverage host access controls from your existing identity and access management.{' '}
          <Button component="a" target="_blank" variant="link" isInline icon={<ExternalLinkAltIcon />} iconPosition="right" href={linkLearnMoreAbout}>
            Learn more about the domain registry.
          </Button>
        </p>
      </PageHeader>
    </>
  );
};

const EmptyContent = () => {
  const navigate = useNavigate();

  const handleOpenWizard = () => {
    navigate('/domains/wizard', { replace: true });
  };

  return (
    <>
      <Section>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.full}>
            <RegistryIcon size="xl" />
            <Title headingLevel="h2" size="lg">
              No domains
            </Title>
            <EmptyStateBody>
              <Stack>
                <StackItem className="empty-state-body-content">
                  To specify which existing access controls can be
                  <br /> leveraged for hosts launched through the console, you
                  <br /> must first register your domain(s). As part of that
                  <br /> process you will be required to SSO into your server(s)
                  <br /> and install packages via CLI.
                </StackItem>
                <StackItem>
                  <Button onClick={handleOpenWizard}>Add domain</Button>
                </StackItem>
              </Stack>
            </EmptyStateBody>
          </EmptyState>
        </Bullseye>
      </Section>
    </>
  );
};

const ListContent = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const base_url = '/api/idmsvc/v1';
  const resources_api = ResourcesApiFactory(undefined, base_url, undefined);

  const [page, setPage] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let local_domains: Domain[] = [];
    resources_api
      .listDomains(undefined, offset, perPage, undefined)
      .then((res) => {
        let count = 0;
        res.data.data.map((item) => {
          resources_api
            .readDomain(item.domain_id)
            .then((res_domain) => {
              local_domains[count++] = res_domain.data;
              if (res.data.data.length == local_domains.length) {
                appContext.setDomains(local_domains);
                const newOffset = Math.floor((offset + perPage - 1) / perPage) * perPage;
                const newPage = newOffset / perPage;
                setItemCount(res.data.meta.count);
                setOffset(newOffset);
                setPage(newPage);
              }
              console.log('INFO:domain list updated');
            })
            .catch((reason) => {
              console.log(reason);
            });
        });
      })
      .catch((reason) => {
        console.log(reason);
      });
    return () => {
      // Finalizer
    };
  }, [page, perPage, offset]);

  const handleOpenWizard = () => {
    navigate('/domains/wizard', { replace: true });
  };

  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setPage(newPage);
  };

  const onPerPageSelect = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPerPage: number, newPage: number) => {
    const newOffset = Math.floor((offset + newPerPage - 1) / newPerPage) * newPerPage;
    setPerPage(newPerPage);
    setPage(newPage);
    setOffset(newOffset);
  };

  return (
    <>
      <Page>
        <PageSection>
          <Card>
            <CardBody>
              <Toolbar>
                <Flex>
                  <FlexItem>
                    <Button onClick={handleOpenWizard}>Register a service</Button>
                  </FlexItem>
                </Flex>
              </Toolbar>
              <DomainList />
              <Pagination
                dropDirection="up"
                offset={offset + 1}
                firstPage={1}
                itemCount={itemCount}
                perPage={perPage}
                page={page}
                onSetPage={onSetPage}
                widgetId="top-example"
                onPerPageSelect={onPerPageSelect}
                ouiaId="PaginationTop"
              />
            </CardBody>
          </Card>
        </PageSection>
      </Page>
    </>
  );
};

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 *
 * https://www.patternfly.org/v4/layouts/bullseye/
 *
 */
const DefaultPage = () => {
  const appContext = useContext(AppContext);
  const base_url = '/api/idmsvc/v1';
  const resources_api = ResourcesApiFactory(undefined, base_url, undefined);

  // States
  // const [domains, setDomains] = useState<Domain[]>(appContext?.domains);

  const [page, setPage] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);
  const [perPage] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    insights?.chrome?.appAction?.('default-page');
  }, []);

  console.log('INFO:DefaultPage render');

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let local_domains: Domain[] = [];
    resources_api
      .listDomains(undefined, offset, perPage, undefined)
      .then((res) => {
        let count = 0;
        res.data.data.map((item) => {
          resources_api
            .readDomain(item.domain_id)
            .then((res_domain) => {
              local_domains[count++] = res_domain.data;
              if (res.data.data.length == local_domains.length) {
                appContext.setDomains(local_domains);
                const newOffset = Math.floor((offset + perPage - 1) / perPage) * perPage;
                const newPage = newOffset / perPage;
                setItemCount(res.data.meta.count);
                setOffset(newOffset);
                setPage(newPage);
              }
              console.log('INFO:domain list updated');
            })
            .catch((reason) => {
              console.log(reason);
            });
        });
      })
      .catch((reason) => {
        console.log(reason);
      });
    return () => {
      // Finalizer
    };
  }, [page, perPage, offset]);

  if (/* appContext.domains.length == 0 */ itemCount == 0) {
    return (
      <>
        <Header />
        <EmptyContent />
      </>
    );
  }

  return (
    <>
      <Header />
      <ListContent />
    </>
  );
};

export default DefaultPage;
