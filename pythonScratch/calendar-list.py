#!/usr/bin/python
# -*- coding: UTF-8 -*-
from optparse import OptionParser
from time import strftime, strptime

currentYear = strftime("%Y")
currentMonth = strftime("%m")

parser = OptionParser()
parser.add_option("-m", "--month", help="Month (number, def: %s)" % currentMonth , metavar="int", default=currentMonth)
parser.add_option("-y", "--year", help="Year (def: %s)" % currentYear, metavar="Int", default=currentYear)
parser.add_option("-w", "--workDaysOnly", help="Work days only", action="store_true", dest="workDaysOnly", default=False)
parser.add_option("-s", "--singleSpace", help="Single space output", action="store_true", dest="singleSpace", default=False)

(options, args) = parser.parse_args()

options.month = int(options.month)
options.year = int(options.year)
options.workDaysOnly = bool(options.workDaysOnly)
options.singleSpace = bool(options.singleSpace)

if options.month > 12 or options.month < 1:
  print("Put in a good month, dude!")
  quit(-1)

calculatedWeekDay = strptime("%s %s" % (options.year, options.month), "%Y %m")[6]
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

# Yeah, I know I could just use calendar.isleap() but whatever
leapyear = not(options.year % 4 and (options.year % 100 != 0 or options.year % 400 == 0))
counts = [31, 29 if leapyear else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

for dayNumber in range(1, counts[options.month - 1] + 1):
  dayOfTheWeek = (dayNumber - 1 + calculatedWeekDay) % 7

  # If --workDaysOnly is set, don't print the weekends (days 5 and 6)
  if not options.workDaysOnly or (options.workDaysOnly and dayOfTheWeek < 5):
    print("%s-%s-%s %s%s" % (str(options.year), str(options.month).zfill(2),
    	str(dayNumber).zfill(2), days[dayOfTheWeek], "" if options.singleSpace else "\n"))
