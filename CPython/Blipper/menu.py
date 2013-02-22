'''
Created on Feb 21, 2013

@author: Kyle Geib
'''

import util # utility module

import sys
from time import sleep

# GUI system
from PyQt4 import QtGui, QtCore, QtXml, uic

# .NET API calls support provided by Python for .NET
sys.path.append(util.buildResPath('PyNET'))
import clr
from System import Diagnostics
from System import InvalidOperationException


class MainWindowMenu(QtGui.QMainWindow):
    def __init__(self): 
        QtGui.QMainWindow.__init__(self)
        
        uic.loadUi(util.buildResPath('ui/blipper.ui'), self)   # Load window UI
        self.actionGo.triggered.connect(self.onGoClick)
        self.actionUpdate_Process_List.triggered.connect(self.populateCurrentProcessesList)
        
        self.listWidgetProcesses.itemDoubleClicked.connect(self.onProcessDoubleClick)

        self.populateCurrentProcessesList()

        self.progressBarCycles.hide()
    
    def onGoClick(self):
        self.runPerformanceCounter()
    
    def onProcessDoubleClick(self):
        self.onGoClick()
       
    def closeEvent(self, event):
        print "Closing!"
    
    def runPerformanceCounter(self):
        self.fromOptions()
        print "Doing it for %s" % self.process
        
        try:
            self.progressBarCycles.show()
            pc = Diagnostics.PerformanceCounter(self.category, self.counter, self.process)
            cycles = int(self.runTime/self.interval)
            
            for x in range(cycles):  
                print pc.NextValue()
                self.progressBarCycles.setValue( int( 100*(x/cycles) ) ) # Update progress bar!
                sleep(self.interval)
                
        except InvalidOperationException:
            print "Could not find process \"%(process)s\"!" % {'process':self.process}

        self.progressBarCycles.hide()
        
        
    def fromOptions(self):
        self.category = str(self.comboBoxCategory.currentText())
        self.counter = str(self.comboBoxCounter.currentText())
        self.process = str(self.listWidgetProcesses.currentItem().text())
        
        self.interval = self.doubleSpinBoxInterval.value()
        self.runTime = self.spinBoxRunTime.value()
             
    
    def populateCurrentProcessesList(self):
        if self.listWidgetProcesses.count() > 0:
            self.listWidgetProcesses.clear()
        
        procList = self.getCurrentProcesses()
        for x in range(len(procList)):
            self.listWidgetProcesses.addItem(str(procList[x]))
        
        # Choose the first item by default
        self.listWidgetProcesses.setCurrentRow(0)   
    
    
    def getCurrentProcesses(self):
        procs = Diagnostics.Process.GetProcesses()
        procDict = {}
        
        for x in range(len(procs)):
            procDict.update({procs[x].ProcessName : procs[x].WorkingSet64})
            
        if len(procs) == 0:
            procDict.update({"COULD NOT READ PROCESSES" : -1})
            
        # Return sorted list of processes by physical memory used in descending order
        procList = []
        for key, value in sorted(procDict.iteritems(), key=lambda (k,v):(v,k), reverse=True):
            procList.append(key+".exe")
            
        return procList
