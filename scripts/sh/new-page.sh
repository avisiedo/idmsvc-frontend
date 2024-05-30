#!/bin/bash

# This script generate a skeleton for a new page

DEFAULT_PAGE_COMPONENT="MyNewRoute"

PAGE_COMPONENT="${PAGE_COMPONENT:-${DEFAULT_PAGE_COMPONENT}}"

function prompt_page_component {
    printf "Component Name for your new page? [${DEFAULT_PAGE_COMPONENT}] "
    read PAGE_COMPONENT
    [ "${PAGE_COMPONENT}" == "" ] || PAGE_COMPONENT="${DEFAULT_PAGE_COMPONENT}"
    validate_page_component "${PAGE_COMPONENT}" || error "invalid PAGE_COMPONENT value"
}

function generate_page_component {
  [ -e "src/Routes/${PAGE_COMPONENT}" ] || mkdir -p "src/Routes/${PAGE_COMPONENT}" || error "creating directory 'src/Routes/${PAGE_COMPONENT}'"

  ## Add the main component skeleton
  cat > "src/Routes/${PAGE_COMPONENT}/${PAGE_COMPONENT}.tsx" << EOF
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';

const ${PAGE_COMPONENT} = () => {
  // TODO Add here your states
  const [myState, setMyState] = useState<string || undefined>();
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  // Check page permissions
  if (appContext.isLoading) {
    return (<><Spinner /></>);
  }
  if (!appContext.has...) {
    navigate('/no-permissions', { replace: true });
    return (<></>);
  }

  // TODO Add here your side effects if any
  // 

  // TODO Add here your callbacks
  // 

  // TODO Update your page render
  // https://www.patternfly.org/components/all-components
  return (
    <>
    </>
  );
};

export default ${PAGE_COMPONENT};
EOF

  ## Add an empty style file
  cat > "src/Routes/${PAGE_COMPONENT}/${PAGE_COMPONENT}.scss" <<EOF
@import '~@redhat-cloud-services/frontend-components-utilities/styles/variables';
EOF

  ## Add the unit test file
  cat > "src/Routes/${PAGE_COMPONENT}/${PAGE_COMPONENT}.test.tsx" <<EOF
@import '~@redhat-cloud-services/frontend-components-utilities/styles/variables';

const test${PAGE_COMPONENT}() => {
    render(<${PAGE_COMPONENT}></${PAGE_COMPONENT}>)
};
EOF

    return 0
}

prompt_page_component

generate_page_component "${PAGE_COMPONENT}"
