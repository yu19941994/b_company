#!/bin/bash

input_folder="../public/dashboard/section/actions_new/bright"
output_folder="../public/dashboard/section/actions_new/bright"

for file in "$input_folder"/*.png; do
    filename=$(basename "$file")
    filename="${filename%.*}"
    output_file="$output_folder/$filename.webp"
ffmpeg -i "$file"   -compression_level 6 -q:v 100 -c:v libwebp -lossless 1 -loop 0 -an -vsync 0  "$output_file"
done

#  ffmpeg -i "$file" -qscale 0 -r 120 -loop 0 -c:v libwebp_anim -vf "scale=1000:-1" -lossless 1   "$output_file"
# -vf "scale=500:-1" 
# ffmpeg -i input_image.png -c:v libavif -strict experimental -pix_fmt yuva420p output_image.avif

# ffmpeg -i input.jpg -vf "scale={{new_width}}:-1" output.jpg