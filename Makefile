PROJECT := $(notdir $(CURDIR))
PORT ?= 8080

JSON := ./test/kitchen-sink.json
THEME := .

# Targets that don't result in output of the same name.
.PHONY: clean \
        distclean \
        validate \
				serve \
        test

# When no target is specified, the default target to run.
.DEFAULT_GOAL := test

# Target that cleans build output
clean:
	@rm -rf public

# Target that cleans build output and local dependencies.
distclean: clean
	@rm -rf node_modules

# Target to create the output directories.
public:
	@echo "Creating $@..."
	@mkdir -p $(CURDIR)/$@

# Target to create the validate the JSON against the schema.
validate: ${JSON}
	@echo "Validating $<..."
	@npx resume validate --resume $<

# Target to generate and preview the theme using the 'kitchen-sink'
serve: ${JSON}
	@echo "Starting '$(PROJECT)' on 'http://localhost:$(PORT)'..."
	@npx resume serve --resume $< --port $(PORT) --theme ${THEME}

# Validates and Serves the CV
test: validate serve
