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
from System.Diagnostics import PerformanceCounter
from System import InvalidOperationException


class MainWindowMenu(QtGui.QMainWindow):
    def __init__(self): 
        QtGui.QMainWindow.__init__(self)
        
        uic.loadUi(util.buildResPath('ui/blipper.ui'), self)   # Load window UI
        self.actionGo.triggered.connect(self.go)

        self.halt = False
        self.progressBarCycles.hide()
    
    def go(self):
        self.runPerformanceCounter()
        
    def closeEvent(self, event):
        print "Closing!"
        
    
    def runPerformanceCounter(self):
        self.fromOptions()
        
        try:
            self.progressBarCycles.show()
            pc = PerformanceCounter(self.category, self.counter, self.process)
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
        self.process = str(self.lineEditProcess.text())
        
        self.interval = self.doubleSpinBoxInterval.value()
        self.runTime = self.spinBoxRunTime.value()
             
        
    