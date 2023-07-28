#!/bin/bash

# APP_NAME=idmsvc
# GIT_HASH="$( git rev-parse --verify HEAD )"

# root files

cat > "app.info.json" << EOF
{
  "app_name": "${APP_NAME}",
  "src_hash": "${GIT_HASH}",
  "patternfly_dependencies": [],
  "rh_cloud_services_dependencies": []
}
EOF

cat > "app.info.deps.json" << EOF
undefined
EOF

# stable

cat > "app.info.stable.json" << EOF
{
  "app_name": "${APP_NAME}",
  "node_version": ">=16.0.0",
  "src_hash": "${GIT_HASH}",
  "src_tag": "unknown",
  "src_branch": "unknown",
  "patternfly_dependencies": "[\"@patternfly/react-core@4.276.8\",\"@patternfly/react-table@4.113.0\"]",
  "rh_cloud_services_dependencies": "[\"@redhat-cloud-services/frontend-components-notifications@3.2.14\",\"@redhat-cloud-services/frontend-components-utilities@3.5.0\",\"@redhat-cloud-services/frontend-components@3.11.1\"]"
}
EOF

# preview

cat > "app.info.preview.json" << EOF
{
  "app_name": "${APP_NAME}",
  "node_version": ">=16.0.0",
  "src_hash": "${GIT_HASH}",
  "src_tag": "unknown",
  "src_branch": "unknown",
  "patternfly_dependencies": "[\"@patternfly/react-core@4.276.8\",\"@patternfly/react-table@4.113.0\"]",
  "rh_cloud_services_dependencies": "[\"@redhat-cloud-services/frontend-components-notifications@3.2.14\",\"@redhat-cloud-services/frontend-components-utilities@3.5.0\",\"@redhat-cloud-services/frontend-components@3.11.1\"]"
}
EOF
