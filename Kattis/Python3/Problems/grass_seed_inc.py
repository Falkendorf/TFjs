#! /usr/bin/python3

import sys

inpt = sys.stdin.readlines()
cost = float(inpt[0])
n = int(inpt[1])
sum = 0.0
for i in range(n):
    ab = inpt[i+2].split()
    a = float(ab[0])
    b = float(ab[1])
    sum+=a*b*cost
print(sum)
