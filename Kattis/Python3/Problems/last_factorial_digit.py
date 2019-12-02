#! /usr/bin/python3

import sys

c = 0
for i in sys.stdin:
    if c!=0:
        a = int(i)
        ld = 1
        for j in range(a):
            ld *= (j+1)
            ld %= 10
        print(ld)
    c += 1
