def balanced_latin(array, participantId):
    result = []
    i = 0
    j = 0
    h = 0

    while i < len(array):
        val = 0
        if i < 2 or i % 2 != 0:
            val = j
            j += 1
        else:
            val = len(array) - h - 1
            h += 1

        idx = (val + participantId) % len(array)
        result.append(array[idx])

        i += 1

    return result


array = ["A", "B", "C", "D", "E", "F", "G", "H"]  # Replace with your array of values

# Perform iterations and save results to a single array
results = []
for i in range(100):
    results.extend(balanced_latin(array, i))

#print(results)
