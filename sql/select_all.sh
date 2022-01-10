#!/bin/bash
if [ "$#" != 1 ];
then
    echo "Usage: ./select_all.sh <table_name>"
elif [ "$#" == 1 ];
then
    if [ "$1" == "sv_hotel_in" ];
    then
        cat select_all_in.sql | mysql -uayrton -ppassword sv_hoteles
    elif [ "$1" == "sv_hotel_out" ];
    then
        cat select_all_out.sql | mysql -uayrton -ppassword sv_hoteles
    fi
fi
