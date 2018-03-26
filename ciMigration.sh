# Migration Shell Script
# Migrate SQl files from ./database/migrations/ to Database.

echo '----------------------------------------------------------'
echo 'Migrate olx Schema into your database, [GITLAB - CI MODE]'
echo '----------------------------------------------------------'

for entry in $PWD/database/migrations/*.sql
do
  PGPASSWORD="postgres" psql -U "postgres" -d "postgres" -f "$entry" -h "postgres"
done
echo "all SQL files inside "$PWD/database/migrations/" migrated!"
