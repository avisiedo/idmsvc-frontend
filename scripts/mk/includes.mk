##
# 
##
include scripts/mk/projectdir.mk

-include secrets/private.mk
include scripts/mk/venv.mk
include scripts/mk/variables.mk

include scripts/mk/help.mk
include scripts/mk/printvars.mk
include scripts/mk/crc-frontend.mk

include scripts/mk/meta-container.mk
include scripts/mk/container.mk

include scripts/mk/meta-ephemeral.mk
include scripts/mk/ephemeral.mk

