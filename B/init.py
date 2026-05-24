# B. CargoCraft Fleet

def find_valid_b(n):
    return next((b for b in range(n // 6, max(n // 6 - 3, -1), -1)
                  if b >= 0 and (n - 6 * b) % 4 == 0), None)

def find_valid_a(n):
    return next((a for a in range(n // 4, max(n // 4 - 3, -1), -1)
                  if a >= 0 and (n - 4 * a) % 6 == 0), None)

def result(n):
    if n % 2 != 0 or n < 4:
        return "-1"

    b_max = find_valid_b(n) 
    a_max = find_valid_a(n)

    if b_max is None or a_max is None:
        return "-1"

    min_ships = (n - 6 * b_max) // 4 + b_max

    max_ships = a_max + (n - 4 * a_max) // 6

    return f"{min_ships} {max_ships}"

t = int(input())

print("\n".join(result(int(input())) for _ in range(t)))