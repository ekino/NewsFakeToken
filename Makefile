default: help

# Perl Colors, with fallback if tput command not available
GREEN  := $(shell command -v tput >/dev/null 2>&1 && tput -Txterm setaf 2 || echo "")
BLUE   := $(shell command -v tput >/dev/null 2>&1 && tput -Txterm setaf 4 || echo "")
WHITE  := $(shell command -v tput >/dev/null 2>&1 && tput -Txterm setaf 7 || echo "")
YELLOW := $(shell command -v tput >/dev/null 2>&1 && tput -Txterm setaf 3 || echo "")
RESET  := $(shell command -v tput >/dev/null 2>&1 && tput -Txterm sgr0 || echo "")

# Add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_FUN = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-]+)\s*:.*\#\#(?:@([a-zA-Z\-]+))?\s(.*)$$/ }; \
    print "usage: make [target]\n\n"; \
    for (sort keys %help) { \
    print "${WHITE}$$_:${RESET}\n"; \
    for (@{$$help{$$_}}) { \
    $$sep = " " x (32 - length $$_->[0]); \
    print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    }; \
    print "\n"; }

help:
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)

# Our custom parameters
SHELL := /bin/bash

# Use node container in ci
ifeq ($(shell env|grep -c "^CI="),1)
	COMPOSE = docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml
	ENV_FILE = .env.ci
	NODE = docker-compose -f docker-compose.ci.yaml exec -T node
else
	COMPOSE = docker compose
	ENV_FILE = .env.dist
endif

########################################
#              INFRA                   #
########################################
infra-clean: ##@Infra stop and remove containers/networks/images
	$(COMPOSE) down --rmi all

infra-rebuild: ##@Infra clean and up all
	make infra-clean infra-up

infra-show-containers: ##@Infra show all the containers
	$(COMPOSE) ps

infra-show-images: ##@Infra show all the images
	docker images -a

infra-show-logs: ##@Infra show logs from containers, specify "c=service_name" to filter logs by container
	$(COMPOSE) logs -ft ${c}

infra-stop: ##@Infra stop all the containers
	$(COMPOSE) stop

infra-up: ##@Infra create and start all the containers
	$(COMPOSE) up --build -d

########################################
#             WORKSPACE                #
########################################
install: ##@Workspace install workspace
	@if [ ! -f .env -a -f ./contracts/$(ENV_FILE) ]; then cp ./contracts/$(ENV_FILE) ./contracts/.env; fi
	$(NODE) yarn

########################################
#             BACKEND                  #
########################################
backend-start: ##@Backend start backend
	$(NODE) yarn backend:start

########################################
#            CONTRACTS                 #
########################################
contracts-compile: ##@Contracts compile contracts
	./scripts/compile.sh NFTS_contract.mligo

contracts-deploy: ##@Contracts deploy contracts
	$(NODE) yarn contracts:deploy

contracts-test: ##@Contracts test contracts
	$(NODE) yarn contracts:test

########################################
#              MINTER                  #
########################################
minter-lint: ##@Minter lint minter app
	$(NODE) yarn minter:lint

minter-start: ##@Minter start minter app
	$(NODE) yarn minter:start
