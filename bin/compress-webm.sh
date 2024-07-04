#!/bin/bash

input_folder="../../../../Desktop/20240403/revised_mascot"
output_folder="../../../../Desktop/20240403/revised_mascot"

for file in "$input_folder"/*.webm; do
    filename=$(basename "$file")
    filename="${filename%.*}"
    output_file="$output_folder/$filename-compress.webm"
    ffmpeg -c:v libvpx-vp9 -i "$file" -crf 30 -b:v 0 -pix_fmt yuva420p -metadata:s:v:0 alpha_mode="1" -c:a copy "$output_file"
done
# ffmpeg -i input_image.png -c:v libavif -strict experimental -pix_fmt yuva420p output_image.avif

# ffmpeg -i input.jpg -vf "scale={{new_width}}:-1" output.jpg