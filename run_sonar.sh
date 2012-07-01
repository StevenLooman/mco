#!/usr/bin/env bash

if [ ! -d coverage ]; then
	mkdir coverage
fi

rm -f coverage/*
rm -rf lib-cov

echo Running mocha
node-jscoverage lib lib-cov
mv lib lib-orig
mv lib-cov lib
mocha -R lcov     > coverage/coverage.lcov
mocha -R xunit    > coverage/TEST-all.xml
rm -rf lib
mv lib-orig lib

echo Running sonar-runner
sonar-runner
