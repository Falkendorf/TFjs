#! /usr/bin/python3

import sys

sum = 0.0
c = 0
for i in sys.stdin:
    if c!=0:
        ab = i.split()
        a = float(ab[0])
        b = float(ab[1])
        sum += a*b
    c+=1
print(sum)
