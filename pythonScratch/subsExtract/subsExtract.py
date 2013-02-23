'''
Created on Feb 22, 2013

@author: Kyle
'''
import subprocess
import os.path
import string

from PyQt4 import QtGui, uic, QtCore, QtXml

class MainSubsExtract(QtGui.QMainWindow):
    def __init__(self):
        QtGui.QMainWindow.__init__(self)

        uic.loadUi(self.buildResPath('extract.ui'), self)
        self.actionSelect_File.triggered.connect(self.onAddFiles)
        self.actionSelect_Directory.triggered.connect(self.onAddDirectory)
        self.actionDelete_File.triggered.connect(self.removeFiles)
        self.actionFind_MKVExtract_exe.triggered.connect(self.findMKVExtract)
        self.actionRip.triggered.connect(self.onRipSubs)

        self.fileList = []
        self.subDir = str()
        self.trackIDString = str()
        self.mkvextractAddress = str()
        
        
        
    def onRipSubs(self):
        # Get file list from file list GUI
        for x in range(self.listWidgetFiles.count()):
            self.fileList.append(self.listWidgetFiles.item(x).text())
            
        if not len(self.fileList) > 1:
            return
        
        self.subDir = str(self.lineEditSubDirectory.text())
        self.trackIDString = str(self.lineEditTrackID.text())

        if len(self.trackIDString) is not 0:
            for x in range(len(self.fileList)):
                if len(self.fileList[x]) > 0:
                    print self.createCommand(self.mkvextractAddress, str(self.fileList[x]), self.trackIDString, self.subDir)
                    subprocess.call(self.createCommand(self.mkvextractAddress, str(self.fileList[x]), self.trackIDString, self.subDir))

        
    def createCommand(self, mkvAddress, fileAddress, tracks, subDir):
        command = str()
        if len(mkvAddress) > 0:
            command += "\"" + mkvAddress + "\""
        else:
            command += "mkvextract "
            
        command += "tracks " + "\"" + fileAddress + "\""

        trackList = eval("[" + tracks + "]")
        if type(trackList) is not [].__class__:    # Check eval was successful
            return ""
        
        if len(subDir) > 0:
            subDirss = self.insertSubDir(fileAddress, subDir)
        else:
            subDirss = fileAddress
            
        for x in range(len(trackList)):
            command += " " + str(trackList[x]) + ":\"" + subDirss + "_sub_" + str(trackList[x]) + ".sup\""
      
        return command
      
    def onAddFiles(self):
        filenames = QtGui.QFileDialog.getOpenFileNames(
            parent=self,
            caption='Select file(s) to add',
            filter='MKV files (*.mkv);;All files (*.*)'
        )
        self.addFiles(filenames)
   
 
    def onAddDirectory(self):
            directory = QtGui.QFileDialog.getExistingDirectory(self, 'Select an MKV directory to add')
            if not directory.isNull():
                self.addDirs([directory])
                
                
    def addFiles(self, filenames):
        filenames.sort()

        filenamesListed = []
        # Grab what's in the file widget already
        for i in xrange(0, self.listWidgetFiles.count()):
            filenamesListed.append(self.listWidgetFiles.item(i).text())

        for filename in filenames:
            if filename not in filenamesListed: # Don't double add files
                filename = QtCore.QString(filename)
                self.listWidgetFiles.addItem(filename)


    def addDirs(self, directories):
        filenames = []

        for directory in directories:
            for root, subdirs, subfiles in os.walk(unicode(directory)):
                for filename in subfiles:
                    path = os.path.join(root, filename)
                    if self.isMKVFile(path):
                        filenames.append(path)

        self.addFiles(filenames)


    def buildResPath(self, relative):
        directory = os.path.dirname(__file__)
        return os.path.join(directory, relative)
    
    
    def removeFiles(self):
        for item in self.listWidgetFiles.selectedItems():
            row = self.listWidgetFiles.row(item)
            self.listWidgetFiles.takeItem(row).text()


    def isMKVFile(self, filename):
        mkvExts = ['.mkv']
        filename = unicode(filename)
        return (
            os.path.isfile(filename) and
            os.path.splitext(filename)[1].lower() in mkvExts
        )

    def findMKVExtract(self):
        filename = QtGui.QFileDialog.getOpenFileName(
            parent=self,
            caption='Select your mkvextract.exe file',
            filter='MKVExtract (mkvextract.exe);;All files (*.*)'
        )
        self.mkvextractAddress = str(filename)
        self.lineMKVAddress.setText(filename)
        
    def grabFileName(self, fileAddress):
        splits = string.split(fileAddress, "\\")
        return splits[len(splits)-1] if len(splits) > 0 else "ERROR"

    def insertSubDir(self, fileAddress, subDir):
        splits = string.split(fileAddress,"\\")
        splits.insert(len(splits)-1, subDir)
        
        concat = ""
        for x in range(len(splits)):
            concat += splits[x]
            if x < len(splits)-1:
                concat += "\\"
        return concat