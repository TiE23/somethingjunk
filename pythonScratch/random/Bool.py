def sikuli(x, y, z):
    result = ((x or (y or z)) and not (x and (y or z)))
    return result

# Main Body
print "+---+---+---+---+"
print "| x | y | z | ? |"
print "+---+---+---+---+"

for x in range(2):
    for y in range(2):
        for z in range(2):
            result = 1 if sikuli(x, y, z) else 0
            print "| %(x)s | %(y)s | %(z)s | %(result)s |" % { 'x':x, 'y':y, 'z':z, 'result':result}

print "+---+---+---+---+"
