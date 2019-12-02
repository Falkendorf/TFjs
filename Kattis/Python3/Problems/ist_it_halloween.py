#! /usr/bin/python3

import sys

for i in sys.stdin:
    ab = i.split()
    a = ab[0]
    b = int(ab[1])
    if (a == 'OCT' and b == 31) or (a == 'DEC' and b == 25):
        print('yup')
    else:
        print('nope')
