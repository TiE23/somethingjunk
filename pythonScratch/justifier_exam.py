import re
from optparse import OptionParser

class justifier:
   options = {}
   args = []
   spaceChar = " "
   bonusChar = " "

   def __init__(self):
       self.optionConstructor()
       self.optionCheck()

       if self.options.debug:
           self.spaceChar = "-"
           self.bonusChar = "+"

       self.justify(self.options.i, int(self.options.l))

   def optionConstructor(self):
       # Disclosure: I've used this same function in a half-dozen of my tools
       optionsList = [
         [["-i"], {"help":"input line", "metavar":"string",
           "default":"The quick brown fox jumps over the lazy dog."}],
         [["-l"], {"help":"length", "metavar":"int", "default":52}],
         [["--debug"], {"help":"show debug info and space characters",
           "action":"store_true", "default":False}]
       ]
       parser = OptionParser()

       for option in optionsList:
         parser.add_option(*option[0], **option[1])

       (self.options, self.args) = parser.parse_args()

   def optionCheck(self):
       checkPassed = True

       if self.options.i == "":
           print("input required")
           checkPassed = False

       if self.options.l == "":
           print("length required")
           checkPassed = False

       try:
           if int(self.options.l) < 1:
               print("length greater than 1 required")
               checkPassed = False
       except ValueError:
           print("length needs to be an integer, buddy")
           checkPassed = False

       if not checkPassed:
           quit(1)

   # The function you want
   def justify(self, line, length):
       # Strip away starting and ending whitespace
       line = line.strip()

       # Split on spaces
       words = re.split("\s+", line.strip())

       # How much of the line is actual characters (dirty way to find out lol)
       size = len("".join(words))

       # How many splits are there going to be
       splits = len(words) - 1

       # Why justify with just one word?
       if splits == 0:
           print("You need to write more than a single word, buddy")
           quit()

       # How much of the justified length will be space
       spaceNeeded = length - size

       # How large each split should be
       splitSize = spaceNeeded // splits

       # Let's check... will this even work?
       if splitSize < 1:
           print("Your line is too long for the length you desire")
           quit()

       # Construct the split
       split = ""
       for x in range(splitSize):
           split += self.spaceChar

       # If the splits don't fit right we'll need to shim some bonus splits
       bonusSplits = spaceNeeded - (splitSize * splits)

       # Debug print statements
       if self.options.debug:
           print("words: %s" % words)
           print("size: %s" % size)
           print("splits: %s" % splits)
           print("spaceNeeded: %s" % spaceNeeded)
           print("splitSize: %s" % splitSize)
           print("split: \"%s\"" % split)
           print("bonusSplits: %s" % bonusSplits)

       # Build the output
       output = ""
       for x in range(len(words)):

           # Shim in the bonus split...
           if bonusSplits > 0:
               bonusSplits -= 1
               thisSplit = split + self.bonusChar
           else:
               thisSplit = split

           # Join the line back together, skipping a space on the last word.
           if x < len(words)-1:
               output += words[x] + thisSplit
           else:
               output += words[x]

       # Build the numberline
       numberline = ""
       for x in range( (int(self.options.l) + 9) // 10 * 10 ):
           numberline += str((x+1) % 10)

       # Done
       print(output)
       print(numberline)

# Do it.
justifier()




#
# Feedback 1:

# Line 13: An essential part of the success of a junior developer is attitude and willingness to compensate for the fact that they are new and learning.  A comment like this gives me pause: "I don't feel like spending all weekend on it."
#  
# Line 26: This is a more complex (more effort to maintain, more room for errors) approach than a simple script/function.  If the request is for a library, this might be justified, but solving a more complex problem than you were asked to solve has unexpected costs.
#  
# Line 42: It would be worth specifying that 'length' refers to line length.
#  
# Line 54: It might be good to check that the input length isn't longer than the expected line length.  (Although you'd have to know if spaces at the beginning or end of the line count.)
#  
# Line 77: This isn't a good comment.  It should explain more what the function is doing, what its params are, etc.  In particular it should note things that might not expected, like that spaces in the front and end are stripped.
#  
# Line 80: Good that you thought to strip white space, but stripping white space from the front of the line might be a bug.  This would need to be discussed with the Product Owner.  For example, maybe they expect indentation, tabs, etc. to be left in place.
#  
# Line 83: you already called line.split() on line 80
#  
# Line 86: size is not a good variable name.  It could refer to anything. 'numChars' or something like that would be clearer.
#  
# Line 93: Behavior like this that reflects a business rule should be confirmed with the PO, and should also be documented in the function comment.  The rule here could have just as easily have printed the single word rather than quitting with an error.
#  
# Line 104: This is a convoluted/unclear way to check if the input length is too long.  It takes a lot more effort to follow the logic above to confirm that this is indeed checking that the line length is too long.
#  
# Line 116: Good debug statement.
#  
# Line 143: Nice, I'm glad you included this.

#
# Feedback 2:

# First thing that stands out to me is the import of RE or regex. Then opt parse which is deprecated. This shows a bit of a lack in familiarity with common python practices.

# Second thing I notice is that you are defaulting to class variables for most of his state. I argue that using the lowest closure scope possible is the best practices in all languages. The most common mistake you see beginners making is using scopes at the wrong level. Generally they will default to class scope over function, and global scope over class. Each time you step up scope things become more difficult to manage.

# I also notice how there are uses of try/except to catch exceptions, only to set flags to run “quit” at later times. That is pretty bad practice. Catching a meaningful exception, squashing it, and then exiting silently is almost never a good idea.

# Functions do not have returns, they instead print out. You’re relying on them not exiting from the entire application.

# The main script only initializes your class. Your constructor actually executes the only valuable method on his class (justify). The function executed in a constructor is entirely less than ideal, with state that can be affected outside of that constructor, and is never accessed outside of the class.

# All together I think we need to strip the class out. Put returns in, no squashing exceptions, stop exiting, and try to use the lowest level scope possible.
