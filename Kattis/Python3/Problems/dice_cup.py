#! /usr/bin/python3

import sys

inpt = sys.stdin.readlines()
tmp = inpt[0].split()
a = int(tmp[0])
b = int(tmp[1])
nums = []
for i in range(a+b):
    nums.append(0)
for i in range(a):
    for j in range(b):
        nums[(i+1)+(j+1)-2]+=1
max = 0
for i in range(a+b):
    if nums[i]>max:
        max = nums[i]
for i in range(a+b):
    if nums[i]==max:
        print(i+2)
