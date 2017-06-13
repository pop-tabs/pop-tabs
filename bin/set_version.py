#!/usr/bin/env python3
# set_version.py (python 3.5)
#
# Change version everywhere from VERSION file
# use: python3 set_version.py

import json
from collections import OrderedDict

VERSION = '../VERSION'
NPM = '../package.json'
MANIFEST = '../src/manifest.json'

def read_version():
    with open(VERSION, 'r') as filename:
        content = filename.read().strip()
        return content.split('-')

def merge_version(version):
    return '{}-{}'.format(*version)

def set_version(version, json_file):
    print('Set {}'.format(json_file))
    with open(json_file, 'r') as filename:
        data = json.load(filename, object_pairs_hook=OrderedDict)
    data['version'] = version[0]
    data['version_name'] = merge_version(version)
    content = json.dumps(data, indent=2)
    with open(json_file, 'w') as filename:
        filename.write(content)

if __name__ == "__main__":
    version = read_version()
    print('VERSION: {}'.format(merge_version(version)))
    set_version(version, NPM)
    set_version(version, MANIFEST)
