#! /usr/bin/python3

import sys

inpt = sys.stdin.readlines()
tmp = inpt[0].split()
limit = int(tmp[0])
n = int(tmp[1])
denies = 0
recent = 0
for i in range(n):
    ab = inpt[i+1].split()
    a = ab[0]
    b = int(ab[1])
    if (a == 'enter'):
        if (recent+b)<=limit:
            recent+=b
        else:
            denies+=1
    else:
        recent-=b
print(denies)
