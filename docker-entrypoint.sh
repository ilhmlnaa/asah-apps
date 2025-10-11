#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h $PGHOST -p $PGPORT -U $PGUSER; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is ready - running migrations"
npm run migrate up

echo "Starting application"
exec "$@"
