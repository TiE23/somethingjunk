#!/usr/bin/python
# -*- coding: UTF-8 -*-
from optparse import OptionParser
from time import strftime, strptime

currentYear = strftime("%Y")
currentMonth = strftime("%m")

parser = OptionParser()
parser.add_option("-m", "--month", help="Month (number, def: %s)" % currentMonth , metavar="int", default=currentMonth)
parser.add_option("-y", "--year", help="Year (def: %s)" % currentYear, metavar="Int", default=currentYear)

(options, args) = parser.parse_args()

options.month = int(options.month)
options.year = int(options.year)

if options.month > 12 or options.month < 1:
  print("Put in a good month, dude!")
  quit(-1)

calculatedWeekDay = strptime("%s %s" % (options.year, options.month), "%Y %m")[6]
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

# Yeah, I know I could just use calendar.isleap() but whatever
leapyear = options.year % 4 and (options.year % 100 != 0 or options.year % 400 == 0)
counts = [31, 29 if leapyear else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

for x in range(1, counts[options.month - 1] + 1):
  print("%s-%s-%s %s\n" % (str(options.year), \
    str(options.month).zfill(2), str(x).zfill(2), \
    days[(x-1 + calculatedWeekDay) % 7]))
