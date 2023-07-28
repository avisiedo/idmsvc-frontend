##
# General rules for interacting with container
# manager (podman or docker).
##

QUAY_EXPIRATION ?= 1d

ifneq (,$(shell command podman -v 2>/dev/null))
CONTAINER_ENGINE ?= podman
else
ifneq (,$(shell command docker -v 2>/dev/null))
CONTAINER_ENGINE ?= docker
else
CONTAINER_ENGINE ?= false
endif
endif
export CONTAINER_ENGINE

CONTAINER_HEALTH_PATH ?= .State.Health.Status

ifneq (,$shell(selinuxenabled 2>/dev/null))
CONTAINER_VOL_SUFFIX ?= :Z
else
CONTAINER_VOL_SUFFIX ?=
endif

CONTAINER_REGISTRY_USER ?= $(USER)
CONTAINER_REGISTRY ?= quay.io
CONTAINER_CONTEXT_DIR ?= .
CONTAINERFILE ?= build/package/Dockerfile
CONTAINER_IMAGE_BASE ?= $(CONTAINER_REGISTRY)/$(CONTAINER_REGISTRY_USER)/$(APP)
CONTAINER_IMAGE_TAG ?= $(shell git rev-parse --short HEAD)
CONTAINER_IMAGE ?= $(CONTAINER_IMAGE_BASE):$(CONTAINER_IMAGE_TAG)
# CONTAINER_BUILD_OPTS
# CONTAINER_ENGINE_OPTS
# CONTAINER_RUN_ARGS

.PHONY: registry-login
registry-login:
	$(CONTAINER_ENGINE) login -u "$(CONTAINER_REGISTRY_USER)" -p "$(CONTAINER_REGISTRY_TOKEN)" $(CONTAINER_REGISTRY)

.PHONY: container-build
container-build:  ## Build image CONTAINER_IMAGE from CONTAINERFILE using the CONTAINER_CONTEXT_DIR
	$(CONTAINER_ENGINE) build \
	  --label "quay.expires-after=$(QUAY_EXPIRATION)" \
	  $(CONTAINER_BUILD_OPTS) \
	  -t "$(CONTAINER_IMAGE)" \
	  $(CONTAINER_CONTEXT_DIR) \
	  -f "$(CONTAINERFILE)"

.PHONY: container-shell
container-shell:  ## Open a terminal to check build steps
	$(CONTAINER_ENGINE) run --rm -it -u root:root \
		-v $(PROJECT_DIR):/opt/app-root/src:rw,z \
		--tmpfs /opt/app-root/src/node_modules:rw \
		--tmpfs /opt/app-root/src/.npm:rw \
		registry.redhat.io/rhel9/nodejs-16:1-138.1699550438 \
		/bin/bash

.PHONY: container-push
container-push:  ## Push image to remote registry
	$(CONTAINER_ENGINE) push "$(CONTAINER_IMAGE)"
