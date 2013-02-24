'''
Created on Feb 23, 2013

How to use? 
Add this .py file to your Python install folder!!
Open a cmd prompt in the directory that holds all your directories.
It will not do nested directories!
>python then type "import jvrenamer"
>>> jvrenamer.run()
makes a file named changeNames.bat
review the .bat file, if it looks good, run it!

@author: Kyle
'''
import os, string

def makeRENcommands(dirList):
    commandList = []
    
    for x in range(len(dirList)):
        dirChange = changeDirName(dirList[x][2])
        if len(dirChange) > 0:
            commandList.append("ren \"" + dirList[x][2] + "\" \"" + dirChange + "\"")
            
    cmdFile = open("changeNames.bat", 'a')
    for x in range(len(commandList)):
        cmdFile.write(commandList[x] + "\n")
        print commandList[x]
    
    cmdFile.close()
    
    
def changeDirName(dirName):
    split = string.split(dirName, " ")
    
    lastOne = split[len(split)-1]
    if lastOne[ len(lastOne)-1 ] is ")" :
        if len(lastOne) > 1 and lastOne[len(lastOne)-2].isdigit():
            rank = str(lastOne[len(lastOne)-2])
            split[len(split)-1] = ")"
        else:
            rank = "_" # Placeholder value
            
        split.insert(1, rank + " -")
        
        newName = str()
        
        for x in range(len(split)):
            newName += split[x]
            if x < len(split)-2: #Do not add at end
                newName += " "
                    
                    
        return newName
    else:
        return ""
                
def run():
    dirList = []
    for dirname, dirnames, filenames in os.walk(os.getcwd()):   # Walks "current working directory"
        # print path to all subdirectories first.
        for subdirname in dirnames:
            dirList.append([os.path.join(dirname, subdirname), dirname, subdirname])
    
    makeRENcommands(dirList)

