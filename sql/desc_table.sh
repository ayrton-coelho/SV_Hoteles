#!/bin/bash
if [ "$#"  -dt 2 ];
then
    echo "Usage: ./desc_table.sh <table_name>"
elif [ "$#" -eq 2 ];
then
    echo "DESCRIBE $1;" | mysql -uayrton -p sv_hoteles
fi