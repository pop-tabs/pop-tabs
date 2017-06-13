SHELL = /usr/bin/env bash

BIN_DIR = bin
SRC_DIR = src/js
DOC_DIR = doc

MANIFEST = src/manifest.json
CONF_DOC = jsdoc.json
CONF_NPM = package.json

EXTENSION_ID = obdkadanihffijoldabdhhdhmdbkdejg
DEPLOY_URL = https://chrome.google.com/webstore/developer/edit/$(EXTENSION_ID)
# see chrome://version/ to complete CHROME_PROFILE file
CHROME_PROFILE = $(shell cat CHROME_PROFILE)
VERSION = $(shell cat VERSION)

.PHONY: usage
usage:
	@echo "targets include: usage version install doc deploy"

.PHONY: install
install:
	@npm install

.PHONY: version
version:
	@echo $(VERSION)

.PHONY: doc
doc:
	@source "$(BIN_DIR)/init.sh"; \
	jsdoc "$(SRC_DIR)" -c "$(CONF_DOC)" -d $(DOC_DIR)/$(VERSION) --verbose
	@google-chrome --profile-directory="$(CHROME_PROFILE)" "$(DOC_DIR)/$(VERSION)/index.html"

.PHONY: deploy
deploy:
	@"$(BIN_DIR)/set_version.sh"
	@source "$(BIN_DIR)/init.sh"; \
	"$(BIN_DIR)/compress.sh"
	@google-chrome --profile-directory="$(CHROME_PROFILE)" "$(DEPLOY_URL)"



