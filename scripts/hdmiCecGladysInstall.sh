#!/bin/bash
echo '// INSTALLATION //'
actualPath=$(dirname $0)
echo $actualPath
cd $actualPath
echo "Ajout du droit d'execution sur le script de de function"

chmod +x functionTv.sh
for i in $( ls ./command/* -R )
  do
  chmod +x $i
done
