#!/bin/zsh

# This is a batch script tuned to cut out the 1-minute silence following.
# videos on the ProSoundEffects YouTube Channel
# https://www.youtube.com/@prosoundeffects3467/playlists
# It is tuned specifically to require total silence for 0.1 second or more.

# Check if an argument is given
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

directory=$1

# Check if the directory exists
if [ ! -d "$directory" ]; then
    echo "Directory does not exist: $directory"
    exit 1
fi

# Iterate over each MP3 file in the directory
for file in "$directory"/*.mp3; do
    echo "Processing $file..."

    # Temporary file name
    temp_file=$(mktemp).mp3

    # Apply sox command to remove silence
    sox "$file" "$temp_file" silence 1 0.1 0% -1 0.1 0%
    if [ $? -eq 0 ]; then
        # Move the temporary file back to the original file if sox was successful
        mv "$temp_file" "$file"
        echo "$file processed."
    else
        echo "Failed to process $file."
        # Clean up the temporary file if sox failed
        rm "$temp_file"
    fi
done

echo "All files processed."
