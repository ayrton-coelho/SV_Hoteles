#!/bin/bash
if [ "$#"  -dt 3 ];
then
    echo "Usage: ./alter_table.sh <table_name> <column_name> <mysql datatype>"
elif [ "$#" -eq 3 ];
then
    echo "ALTER TABLE $1 ADD COLUMN $2 $3 AFTER id;" | mysql -uayrton -p sv_hoteles
fi
