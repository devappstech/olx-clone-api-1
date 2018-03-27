#!/bin/bash
export NODE_ENV=production
export PGHOST=postgres
export PGUSER=postgres
export PGPASSWORD=123456
export PGDATABASE=postgres
export PG_TEST_DB=olx-db-4
export PGPORT=5432
export sessionSecert=someVerySecertK3yThatNoBodyKnow$Actually
export BASE_URL=http://localhost
export PORT=3000
export REACT_PORT=3001
export emailUser=akash@improwised.com
export emailPassword=samplepassword
export API_URL=http://app:3000
docker-compose up
