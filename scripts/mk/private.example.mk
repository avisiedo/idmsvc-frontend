##
# This file contains custom variables definition to override
# other values used in the different makefiles
##

# Your quay user as it is used for setting CONTAINER_IMAGE_BASE
# The link below is to regenerate the token:
# NOTE Don't forget to grant write permission to the robot account
#      only for the repository/ies you need
#   https://quay.io/repository/YOURUSER/YOURIMAGE?tab=settings
# TODO Update with your robot account
export QUAY_USER := user+robot_account
export QUAY_TOKEN := MYROBOTACCOUNT
export QUAY_LOGIN := $(firstword $(subst +, ,$(QUAY_USER)))
# TODO Update with the image name created in your repository
export QUAY_REPOSITORY := YOURIMAGE

# Point out to your local repository
CONTAINER_IMAGE_BASE ?= quay.io/$(QUAY_LOGIN)/$(QUAY_REPOSITORY)

# https://access.redhat.com/RegistryAuthentication
# https://access.redhat.com/RegistryAuthentication#creating-registry-service-accounts-6
# To retrieve your token or regenerate it
# https://access.redhat.com/terms-based-registry/#/token/YOUR_USERNAME
# TODO Update your account details
export RH_REGISTRY_USER := 
export RH_REGISTRY_TOKEN := 

# Ephemeral pool
POOL ?= default
# POOL ?= real-managed-kafka

# NOTE This could be necessary when too many deployments are made.
# export GITLAB_TOKEN :=

