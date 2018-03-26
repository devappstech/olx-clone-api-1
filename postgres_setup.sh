sudo apt-get install -y postgresql postgresql-client libpq-dev
sudo -u postgres psql -d template1
CREATE USER 'postgres' WITH PASSWORD 'postgres' CREATEDB;
CREATE DATABASE 'postgres' OWNER runner;
\q
