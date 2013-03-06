'''
Created on Feb 25, 2013

@author: Kyle Geib
'''

from PyQt4 import QtGui, QtCore

class perfCounter(QtGui.QProgressDialog):
    def __init__(self, procBrowser, procFlash, interval, duration):
        QtGui.QProgressDialog.__init__(self)