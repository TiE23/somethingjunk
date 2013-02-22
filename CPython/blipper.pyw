'''
Created on Feb 22, 2013

@author: Kyle Geib
'''

import sys
from PyQt4 import QtGui
from Blipper.menu import MainWindowMenu


application = QtGui.QApplication(sys.argv)
window = MainWindowMenu()
window.show()
application.exec_()