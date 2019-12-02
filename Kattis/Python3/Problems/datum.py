#! /usr/bin/python3

import sys
import calendar

inpt = sys.stdin.readlines()
tmp = inpt[0].split()
day = int(tmp[0])
mon = int(tmp[1])
data = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
print(data[calendar.weekday(2009,mon,day)])
