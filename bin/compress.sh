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

rm -rfv src_compress/

cp -rv src src_compress/

for file in `find src_compress/js -type f`; do
    echo "uglifyjs ${file}"
    uglifyjs -v --compress -- "${file}" | sponge "${file}"
done

zip -rv src_compress.zip src_compress
