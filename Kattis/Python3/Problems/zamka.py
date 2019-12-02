#! /usr/bin/python3

import sys

inpt = sys.stdin.readlines()
l = int(inpt[0])
d = int(inpt[1])
x = int(inpt[2])
min = l
max = d
for i in range(d-l+1):
    sum = 0
    num = i+l
    while(num > 0):
        Reminder = num % 10
        sum = sum + Reminder
        num = num //10
    if sum==x:
        min = i+l
        break
for i in range(d-l+1):
    sum = 0
    num = d-i
    while(num > 0):
        Reminder = num % 10
        sum = sum + Reminder
        num = num //10
    if sum==x:
        max = d-i
        break
if max>min:
    print(min)
    print(max)
else:
    print(max)
    print(min)
