#!/bin/bash

input_folder="../public/dashboard/section/actions_new/bright"
output_folder="../public/assessment/result/score"

for file in "$input_folder"/*.png; do
    filename=$(basename "$file")
    filename="${filename%.*}"
    output_file="$output_folder/$filename.webp"
    ffmpeg -i "$file" -c:v libwebp -lossless 0 -compression_level 6 -loop 0 -preset picture -an -vsync 0 "$output_file"
done
# ffmpeg -i input_image.png -c:v libavif -strict experimental -pix_fmt yuva420p output_image.avif

# ffmpeg -i input.jpg -vf "scale={{new_width}}:-1" output.jpg