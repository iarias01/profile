#!/bin/bash

# Verificamos si se pasó un mensaje
if [ -z "$1" ]
then
  echo "❌ Debes ingresar un mensaje de commit"
  echo "👉 Ejemplo: npm run gpush \"add loading on my events\""
  exit 1
fi

npm run clearToVercel
git add .
git commit -m "$1"

# Obtener el ID del último commit
LAST_COMMIT=$(git rev-parse HEAD)
echo "Último commit: $LAST_COMMIT"

# Cambiar autor del último commit directamente
git commit --amend --author="Ignacio Arias <iariasdev1@gmail.com>" --no-edit
git push origin main


