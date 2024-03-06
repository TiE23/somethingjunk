#!/bin/zsh

# This is a batch script tuned to cut out the 1-minute silence following.
# videos on the ProSoundEffects YouTube Channel
# https://www.youtube.com/@prosoundeffects3467/playlists
# It is tuned specifically to require total silence for 0.1 second or more.
# If the trimmed file is too small, it attempts a less aggressive trim before
# deciding to keep the original.

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

    # First attempt with original settings
    sox "$file" "$temp_file" silence 1 0.1 0% -1 0.1 0%
    filesize=$(wc -c <"$temp_file" | tr -d ' ')

    # If file is too small, try a less aggressive trimming
    if [ "$filesize" -lt 1024 ]; then
        echo "First attempt resulted in a small file, trying a less aggressive trim..."
        rm "$temp_file" # Remove the too small temp file

        # Create a new temp file for the second attempt
        temp_file=$(mktemp).mp3
        sox "$file" "$temp_file" silence 1 0.01 0% -1 0.01 0%
        filesize=$(wc -c <"$temp_file" | tr -d ' ')

        if [ "$filesize" -lt 1024 ]; then
            echo "Second attempt also resulted in a small file, keeping the original."
            rm "$temp_file" # Clean up, keep original
            too_small_files+=("$file")
            continue # Skip to next file
        fi
    fi

    # If we reach here, we have a good file
    mv "$temp_file" "$file"
    echo "$file successfully processed."

done

# Check if there are any files that were too small and list them
if [ ${#too_small_files[@]} -ne 0 ]; then
    echo "The following files were too small after processing and have been left unchanged:"
    printf '%s\n' "${too_small_files[@]}"
fi

echo "All files processed."
