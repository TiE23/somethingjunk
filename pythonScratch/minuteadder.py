#!/usr/bin/python
# -*- coding: UTF-8 -*-
# Written with Python3.6 in mind

# Supports stdin (use `echo "blah" | python minuteadder.py` or `python minuteadder.py < list.txt`)
# Keep it a single line

# Format is like this: 4:25*10+2:15*50+0:50*5
# You need to prefix with 0 if under 1 minute.
# Yeah, no need for parens, just keeping it simple as heck.

import sys, re
stdin = sys.stdin.read().strip("\n").replace(" ", "")
print("Input: %s " % stdin)

def sumList(inList):
  outSum = 0
  for x in inList:
    outSum += x
  return outSum

def makeTime(secondsTotal):
  seconds = secondsTotal % 60
  minutes = (secondsTotal // 60) % 60
  hours = (secondsTotal // 3600) % 24
  days = secondsTotal // 86400

  return {"days" : days, "hours": hours, "minutes": minutes, "seconds": seconds}


split = []
minuteChunks = re.split(r"\+", stdin)
for chunk in minuteChunks:
  multiChunk = re.split(r"\*", chunk)
  timeChunk = re.split(r":", multiChunk[0])
  secondsTotal = ((int(timeChunk[0]) * 60) + int(timeChunk[1])) * int(multiChunk[1])
  split.append(secondsTotal)


totalSeconds = sumList(split)
totalTime = makeTime(totalSeconds)
print("Total Seconds: {}".format(totalSeconds))
print("Total Time: {}{}:{}:{}".format( \
  (str(totalTime["days"]) + " day" + \
    ("s" if totalTime["days"] > 1 else "") + \
    ", ") if totalTime["days"] > 0 else "", \
    str(totalTime["hours"]).zfill(2), \
    str(totalTime["minutes"]).zfill(2), \
    str(totalTime["seconds"]).zfill(2)))
