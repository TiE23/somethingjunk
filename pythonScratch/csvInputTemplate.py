#!/usr/bin/python
# -*- coding: UTF-8 -*-
import csv
from optparse import OptionParser

def doIt(options):
  colA = 'col 1'
  colB = 'col 2'
  fieldNames = [colA, colB]
  newList = []

  with open(options.input, 'rb') as csvFileIn:
    reader = csv.DictReader(csvFileIn, fieldnames=fieldNames)
    for readerRow in reader:
      newEntry = {}
      newEntry[colA] = readerRow[colA]
      newEntry[colB] = readerRow[colB]
      newList.append(newEntry)

  # Now do things with this.
  # print(newList)

parser = OptionParser()
parser.add_option("-i", "--input", help="Location of input", metavar="Path", default="input")
parser.add_option("-o", "--output", help="Location to save output", metavar="Path", default="output")

(options, args) = parser.parse_args()

# Do it!
doIt(options)