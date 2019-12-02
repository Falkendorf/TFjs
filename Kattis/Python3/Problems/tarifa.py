#! /usr/bin/python3

import sys

c = 0
left = 0
x = 0
for i in sys.stdin:
    if c==1:
        c+=1
        continue
    if c==0:
        x = int(i)
        left += x
    else:
        dif = int(i)
        if (left-dif)<0:
            left = 0
        else:
            left -= dif
        left += x
    c+=1
print(left)
