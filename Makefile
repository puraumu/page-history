
TESTS = test/*.js
REPORTER = dot

test:
	@NODE_ENV=test mocha \
		--require should \
		--reporter $(REPORTER) \
		$(TESTS)

# --timeout 100 \
# --growl \

test-cov: lib-cov
	SUPERAGENT_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

.PHONY: test-cov test docs test-docs clean

