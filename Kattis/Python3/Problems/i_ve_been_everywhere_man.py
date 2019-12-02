#! /usr/bin/python3

import sys

inpt = sys.stdin.readlines()
n = int(inpt[0])
c = 1
for i in range(n):
    towns = []
    m = int(inpt[c])
    c+=1
    for j in range(m):
        k = inpt[c]
        c+=1
        b = 1
        for town in towns:
            if town == k:
                b = 0
                break
        if b == 1:
            towns.append(k)
    print(len(towns))
