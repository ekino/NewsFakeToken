help: ## show help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


build: ## build the pdf
	asciidoctor-web-pdf presentation.adoc --template-require ./template.js -o $${PWD##*/}.pdf

live: ## live preview in browser
	asciidoctor-web-pdf presentation.adoc --template-require ./template.js --preview -w
