'''
Created on Feb 23, 2013

@author: Kyle
'''

for x in range(26):
    
    print "\"C:\\Program Files\\Handbrake\\HandBrakeCLI.exe\" -i \"G:\\Ripped Landing\\Rips\\Samurai Champloo\\Samurai Champloo ep "+str(x+1)+".mkv\" -t 1 -c 1-4 -o \"G:\\Ripped Landing\\Handbrake Output\\Samurai Champloo ep "+str(x+1)+"-1.mkv\"  -f mkv --decomb -w 1920 --strict-anamorphic  --modulus 2 -e x264 -q 20 --vfr  -a 2,1 -E copy:ac3,copy:ac3 -B 0,0 -6 auto,auto -R Auto,Auto -D 0,0 --gain=0,0 --audio-copy-mask none --audio-fallback ffac3 --srt-file \"G:\\Ripped Landing\\Rips\\Samurai Champloo\\DL Subs\\Samurai Champloo Eng Sub ep "+str(x+1)+".srt\" --srt-codeset UTF-8 --srt-offset 0 --srt-lang eng --srt-default=1 --markers=\"C:\\Users\\Kyle\\AppData\\Local\\Temp\\Samurai Champloo Ep "+str(x+1)+"-1-1-chapters.csv\" -x b-adapt=2:rc-lookahead=50 --verbose=1"