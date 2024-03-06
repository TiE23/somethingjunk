#!/bin/zsh

# This is a batch script tuned to cut out the 1-minute silence following.
# videos on the ProSoundEffects YouTube Channel
# https://www.youtube.com/@prosoundeffects3467/playlists
# It is tuned specifically to require total silence for 0.1 second or more.

# Usage message
usage() {
  echo "Usage: $0 <directory>"
  exit 1
}

# Ensure an argument is given
[ "$#" -ne 1 ] && usage

directory=$1

# Check if the directory exists
[ ! -d "$directory" ] && echo "Directory does not exist: $directory" && exit 1

# Array to hold names of files that are too small after processing
declare -a too_small_files

# Process MP3 files
for file in "$directory"/*.mp3; do
    echo "Processing $file..."

    # Create a temporary file name
    temp_file=$(mktemp).mp3

    # Apply sox command to remove silence
    sox "$file" "$temp_file" silence 1 0.1 0% -1 0.1 0%
    if [ $? -eq 0 ]; then
        # Check the size of the processed file
        filesize=$(wc -c <"$temp_file" | tr -d ' ')
        if [ "$filesize" -ge 1024 ]; then
            # Move the temporary file back to the original file if it's larger than 1kB
            mv "$temp_file" "$file"
            echo "$file processed."
        else
            echo "Processed file is too small, keeping the original."
            rm "$temp_file"
            too_small_files+=("$file")
        fi
    else
        echo "Failed to process $file."
        rm "$temp_file"
    fi
done

# Check if there are any files that were too small and list them
if [ ${#too_small_files[@]} -ne 0 ]; then
    echo "The following files were too small after processing and have been left unchanged:"
    printf '%s\n' "${too_small_files[@]}"
fi

echo "All files processed."
