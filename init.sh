#!/usr/bin/env bash
set -euo pipefail

packageName=
description=

read -p "Package name: " packageName
read -p "Description: " description

# Set working directory to the script's location so we can safely use relative paths in this script.
cd "${0%/*}";

sed -i "" "s/npm-package-template/${packageName}/" README.md
sed -i "" "s/npm-package-template/${packageName}/" CHANGELOG.md
sed -i "" "s/npm-package-template/${packageName}/" package.json
sed -i "" "s/npm-package-template/${packageName}/" yarn.lock
sed -i "" "s/npm-package-template/${packageName}/" .github/workflows/format.yml

sed -i "" "s/{{description}}/${description}/" README.md
sed -i "" "s/{{description}}/${description}/" package.json

rm init.sh
