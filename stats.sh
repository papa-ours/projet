#!/bin/bash
rm week.txt
echo "nombre de lignes par semaine"
for ((i = 0 ; i < 16 ; i++)); do
    echo -en "\r$(($i*100/15))%\c"
    weekAdd=$(expr 7 '*' "$i")
    dateDebut="$(date '+%m %d' -d "Mon Jan 07 + ${weekAdd} days")" 
    dateFin="$(date '+%m %d' -d "Mon Jan 14 + ${weekAdd} days")" 
    week="$(python3 extractStats.py --tasks $1 --begin 2019 ${dateDebut} --end 2019 ${dateFin} | sort | grep Author >> week.txt)"
done
echo ""

total=0;
while IFS='' read -r line || [[ -n "$line" ]]; do
    if [[ $line =~ .*Commit.* ]]; then
        echo $total
        total=0
    else
        firstSubStr=$(echo $line| cut -d'-' -f 2)
        secondSubStr=$(echo $firstSubStr| cut -d' ' -f 2)
        total=$(($total + ${secondSubStr}))
    fi

done < "week.txt"



rm day.txt
echo "nombre de lignes par jour"
for ((i = 0 ; i < 105 ; i++)); do
    echo -en "\r$(($i*100/105))%\c"
    dateDebut="$(date '+%m %d' -d "Mon Jan 07 + ${i} days")" 
    dateFin="$(date '+%m %d' -d "Mon Jan 08 + ${i} days")" 
    week="$(python3 extractStats.py --tasks $1 --begin 2019 ${dateDebut} --end 2019 ${dateFin} | sort | grep Author >> day.txt)"
done
echo ""

total=0;
while IFS='' read -r line || [[ -n "$line" ]]; do
    if [[ $line =~ .*Commit.* ]]; then
        echo $total
        total=0
    else
        firstSubStr=$(echo $line| cut -d'-' -f 2)
        secondSubStr=$(echo $firstSubStr| cut -d' ' -f 2)
        total=$(($total + ${secondSubStr}))
    fi

done < "day.txt"


