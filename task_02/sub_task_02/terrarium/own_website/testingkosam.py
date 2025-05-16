x = input("Enter name 1: ").lower()
y = input("Enter name 2: ").lower()

setalpha = set('abcdefghijklmnopqrstuvwxyz')

letter_rep_x = {chr(i): 0 for i in range(ord('a'), ord('z') + 1)}
letter_rep_y = {chr(i): 0 for i in range(ord('a'), ord('z') + 1)}

def calculator(x, y):
    for i in x:
        if i in setalpha:
            letter_rep_x[i] += 1
    for i in y:
        if i in setalpha:
            letter_rep_y[i] += 1
    for i in setalpha:
        letter_rep_x[i] = abs(letter_rep_y[i] - letter_rep_x[i])

    number_of_uncommon = sum(letter_rep_x.values())
    return number_of_uncommon
uncommon_count = calculator(x, y)

flames = "FLAMES"
while len(flames) > 1:
    index = (uncommon_count - 1) % len(flames)
    flames = flames[:index] + flames[index + 1:]
result = {'F': 'Friends', 'L': 'Love','A': 'Affection','M': 'Marriage','E': 'Enemies','S': 'Siblings'}

relationship = result[flames]
print(f"relationship is : {relationship}")