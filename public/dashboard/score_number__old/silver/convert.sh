#!/bin/bash

input_folder="/path/to/png/folder"
output_folder="/path/to/webp/folder"

for file in ./*.png; do
    filename=$(basename "$file")
    output_file="./${filename%.*}.webp"
    ffmpeg -i "$file" "$output_file"
done