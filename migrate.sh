# Migration Shell Script
# Migrate SQl files from ./database/migrations/ to Database.

echo '----------------------------------------------------------'
echo 'Migrate olx Schema into your database, before that please provide access information of you database'
echo '----------------------------------------------------------'
echo 'enter username:'
read username
echo 'enter password:'
read -s password
echo 'enter database name:'
read dbname
echo 'enter host:'
read host

for entry in $PWD/database/migrations/*.sql
do
  PGPASSWORD="$password" psql -U "$username" -d "$dbname" -f "$entry" -h "$host"
done
echo "all SQL files inside "$PWD/database/migrations/" migrated!"
