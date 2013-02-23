'''
Created on Feb 22, 2013

@author: Kyle
'''

import sys
from PyQt4 import QtGui
from subsExtract import MainSubsExtract


application = QtGui.QApplication(sys.argv)
window = MainSubsExtract()
window.show()
application.exec_()