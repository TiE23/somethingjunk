from System.Diagnostics import PerformanceCounter
import time

pc = PerformanceCounter("Process", "% Processor Time", "Firefox")

for count in range(25):
    print "Processor time %(ct)s: %(nv)s" % {'ct':count+1, 'nv':pc.NextValue().ToString()}
    time.sleep(0.5)