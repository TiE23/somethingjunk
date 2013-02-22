'''
Created on Feb 21, 2013

@author: Kyle Geib
'''

import util # utility module

from PyQt4 import QtGui, QtCore, uic


class MainWindow(QtGui.QMainWindow):
    def __init__(self):
        QtGui.QDialog.__init__(self)
        
        uic.loadUi(util.buildResPath('blipper.ui'), self)   # Load window UI
        self.pushButtonGo.triggered.connect(self.go())
        
        print "__init__"
    
    def go(self):
        print "GO!"