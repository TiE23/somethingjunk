'''
Created on Feb 21, 2013

@author: Kyle Geib
'''

import os.path

def buildResPath(relative):
    directory = os.path.dirname(__file__) # util.py file location
    return os.path.join(directory, relative)