#!/usr/bin/env bash
#
# Required: sudo apt install moreutils
#
# compress.sh (GNU bash script 4.3)
#
# Use : bash compress.sh

cd "`dirname "$0"`"

source init.sh

cd ..

rm -rfv compressed_src/ compressed_src.zip

cp -rv src/ compressed_src/

for file in `find compressed_src/js/ -type f`; do
    echo "uglifyjs ${file}"
    uglifyjs -v --compress -- "${file}" | sponge "${file}"
done

zip -rmv compressed_src.zip compressed_src/
