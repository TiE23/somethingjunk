'''
Created on Feb 21, 2013

@author: Kyle Geib
'''

import util # utility module

import threading
from time import sleep

# GUI system
from PyQt4 import QtGui, QtCore, QtXml, uic

# .NET API calls
import clr
from System.Diagnostics import PerformanceCounter
from System import InvalidOperationException


class MainWindowMenu(QtGui.QMainWindow):
    def __init__(self):
        QtGui.QMainWindow.__init__(self)
        
        uic.loadUi(util.buildResPath('ui/blipper.ui'), self)   # Load window UI
        self.actionGo.triggered.connect(self.go)
        self.actionHalt.triggered.connect(self.halt)
        
        
        self.progressBarCycles.hide()
        
        print "__init__"
    
    def go(self):
        self.pcThread = performanceCounterThread(self)
        self.pcThread.runPerformanceCounter()

    def halt(self):
        if self.pcThread is not None:
            print "Hit the Halt button!"
            self.pcThread.halt = True
        else:
            print "Nothing running now!"
        
    def closeEvent(self, event):
        print "Closing!"
        
        
        
        
class performanceCounterThread(threading.Thread):
    def __init__(self, parent):
        threading.Thread.__init__(self)
        self.parent = parent
        self.halt = False
    
    def runPerformanceCounter(self):
        self.fromOptions()
        
        try:
            self.parent.progressBarCycles.show()
            pc = PerformanceCounter(self.category, self.counter, self.process)
            cycles = int(self.runTime/self.interval)
            
            for x in range(cycles):  
                print pc.NextValue()
                self.parent.progressBarCycles.setValue(int(x/cycles)) # Update progress bar!
                sleep(self.interval)
                
                if self.halt:
                    print "Thread HALTING!"
                    break
                
        except InvalidOperationException:
            print "Could not find process \"%(process)s\"!" % {'process':self.process}

        self.parent.progressBarCycles.hide()
        
        
        
    def fromOptions(self):
        self.category = str(self.parent.comboBoxCategory.currentText())
        self.counter = str(self.parent.comboBoxCounter.currentText())
        self.process = str(self.parent.lineEditProcess.text())
        
        self.interval = self.parent.doubleSpinBoxInterval.value()
        self.runTime = self.parent.spinBoxRunTime.value()
             
        
    