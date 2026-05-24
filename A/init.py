# A.Mystic Waves 求和
import sys
input = sys.stdin.readline

def result():
  x, n = map(int, input().split())
  return sum(x * (-1) ** (i + 1) for i in range(n))

for _ in range(int(input())):
  print(result())