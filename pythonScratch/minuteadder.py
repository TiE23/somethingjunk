#!/usr/bin/python3
# -*- coding: UTF-8 -*-
# Written for Python >=3.6

# Supports stdin (use `echo "blah" | python minuteadder.py` or `python minuteadder.py < list.txt`)
# Keep it a single line

# Format is like this: 4:25*10+2:15*50+0:50*5
# You need to prefix with 0 if under 1 minute.
# Yeah, no need for parens, just keeping it simple as heck.

import sys, re
stdin = sys.stdin.read().strip("\n").replace(" ", "")
print(f"Input: {stdin}")

def sumList(inputList):
  listSum = 0
  for value in inputList:
    listSum += value
  return listSum

def makeTime(secondsTotal):
  seconds = secondsTotal % 60
  minutes = (secondsTotal // 60) % 60
  rawHours = secondsTotal //3600
  hours = (rawHours) % 24
  days = secondsTotal // 86400

  return {
    "days" : days,
    "rawHours": rawHours,
    "hours": hours,
    "minutes": minutes,
    "seconds": seconds
  }


split = []
minuteChunks = re.split(r"\+", stdin)
for chunk in minuteChunks:
  multiChunk = re.split(r"\*", chunk)
  timeChunk = re.split(r":", multiChunk[0])
  secondsTotal = ((int(timeChunk[0]) * 60) + int(timeChunk[1])) * int(multiChunk[1])
  split.append(secondsTotal)


totalSeconds = sumList(split)
totalTime = makeTime(totalSeconds)

daysClause = "" if totalTime["days"] == 0 else \
  (str(totalTime["days"]) + " day" + ("s" if totalTime["days"] > 1 else "") + ", ")
rawHoursClause = str(totalTime["rawHours"]).zfill(2)
hoursClause = str(totalTime["hours"]).zfill(2)
minutesClause = str(totalTime["minutes"]).zfill(2)
secondsClause = str(totalTime["seconds"]).zfill(2)

print(f"Total Seconds: {'{:,}'.format(totalSeconds)}")
print(f"Total Time: {rawHoursClause}:{minutesClause}:{secondsClause}")
if daysClause:
  print(f"Total Days: {daysClause}{hoursClause}:{minutesClause}:{secondsClause}")
