# init.sh (GNU bash script 4.3)
#
# Use:
# $ source init.sh

die() {
    >&2 echo "$1"
    return 1
}

# Check if node is available
which node &> /dev/null
if [ $? -ne 0 ];  then
    die "Missing command 'node' in PATH."
else
    # Add script to  PATH
    WD="$(\dirname "`\realpath "${BASH_SOURCE[0]}"`")"
    \cd "${WD}"
    NODE_PATH="$(\realpath ../node_modules/.bin/)";
    \cd - > /dev/null
    if [ ! -d "${NODE_PATH}" ];  then
        die "Missing ${NODE_PATH} folder."
    else
        \export PATH="${NODE_PATH}:${PATH}"
        \echo "Added ${NODE_PATH} to the front of PATH environment variable."
    fi
fi

