#!/usr/bin/python
# -*- coding: UTF-8 -*-
from optparse import OptionParser

def findDay(day):
  for x in range(len(days)):
    if days[x].lower() == day.lower():
      return x

  print "Don't recognize \"%s\", spell right!" % (day)
  quit(-1)



parser = OptionParser()
parser.add_option("-d", "--firstday", help="Enter the first day of the month", metavar="Day", default="Sunday")
parser.add_option("-m", "--month", help="Month (number)", metavar="int", default=1)
parser.add_option("-c", "--count", help="Days of the month (def: 31)", metavar="Int", default=31)
parser.add_option("-y", "--year", help="Year (def: 2016)", metavar="Int", default=2016)

(options, args) = parser.parse_args()


# For different starting weekdays
# Monday 0, Tuesday 1, Wednesday 2, Thursday 3, Friday 4, Saturday 5, Sunday 6
days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

offset = findDay(options.firstday)

for x in range(1, int(options.count) + 1):
  print "%s-%s-%s %s\n" % (str(options.year), str(options.month).zfill(2), str(x).zfill(2), days[(x-1 + offset) % 7])
