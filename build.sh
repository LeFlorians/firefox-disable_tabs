#!/usr/bin/env sh
zip -r -FS disabletabs.zip ./* --exclude '*.xpi' --exclude '.*' --exclude '*.sh'
mv disabletabs.zip disabletabs.xpi
