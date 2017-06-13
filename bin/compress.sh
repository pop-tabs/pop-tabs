#!/usr/bin/env bash
# compress.sh (GNU bash script 4.3)
#
# Required: sudo apt install moreutils
#           source init.sh
# Use : bash compress.sh

cd "`dirname "$0"`"

cd ..

version="$(cat VERSION)"
name="pop-tabs_${version}"

rm -rfv "${name}.zip" "${name}"

cp -rv src/ "${name}"/

for file in `find "${name}/js/" -type f`; do
    echo "uglifyjs ${file}"
    uglifyjs -v --compress -- "${file}" | sponge "${file}"
done

zip -rmv "${name}.zip" "${name}"
