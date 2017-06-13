#!/usr/bin/env bash
# compress.sh (GNU bash script 4.3)
#
# Required: sudo apt install moreutils
#           source init.sh
# Use : bash compress.sh

cd "`dirname "$0"`"

cd ..

rm -rfv compressed_src/ compressed_src.zip

cp -rv src/ compressed_src/

for file in `find compressed_src/js/ -type f`; do
    echo "uglifyjs ${file}"
    uglifyjs -v --compress -- "${file}" | sponge "${file}"
done

zip -rmv compressed_src.zip compressed_src/
