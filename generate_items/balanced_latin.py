import string
import pandas as pd
import numpy as np

def balanced_latin(condNum):
    """
    Generate a **balanced** Latin square based on the given condition number.
    Balanced Latin square is different from generic Latin square. 
    It removes the immediate carry-over effects: A condition will precede another condition exactly once.
    In generic Latin square, the precedence is order is always the same,
    given A, B, C, conditions B is preceded by A, C by B, and A by C.
    
    Theoretical reference is 
    Bradley, J. V. (1958). Complete counterbalancing of immediate sequential effects in a Latin square design. 
    Journal of the American Statistical Association, 53, 525–528. https://doi.org/10.2307/2281872
    
    Code reference (originally in javascript) is from https://cs.uwaterloo.ca/~dmasson/tools/latin_square/.

    Args:
        condNum (int): The number of conditions.

    Returns:
        list: 
            A list representing the balanced Latin square. Given that you have a .csv file, 
            where every line represent one and only condition of an item, 
            and the order of conditions are the same in every item set, 
            you can bind this list as a new column title "Group" to your .csv file. 
            PCIbex will create the grouping.
            Do not forget to repeat the final list by (Number of Items/Number of Conditions) 
            before binding it to the .csv file.
    """
    condNum = int(condNum)  # Convert the condition number to an integer

    # Create an array of uppercase letters up to the given condition number
    array = list(string.ascii_uppercase)[:condNum]
    results = []

    # Generate the balanced Latin square
    for cond in range(condNum):
        i = 0
        j = 0
        h = 0
        oneline = []

        # Iterate over each letter in the array until the condition is met
        # The loop iterates over the letters in the array list and calculates 
        # the index of the letter to be included in the current condition's sequence. 
        # The val variable determines the offset for indexing into the array.
        while i < len(array):
            val = 0
            
            # Determine the value of 'val' based on the current iteration index 'i'
            # if it is an odd-number, set val to j, and increase j by 1
            # otherwise, if it is an even number, 
            # set val to the length of the array minus h minus 1, and increase h by 1
            if i < 2 or i % 2 != 0:
                val = j
                j += 1
            else:
                val = len(array) - h - 1
                h += 1

            # Calculate the index of the letter in the array based on 'val' and 'cond'
            idx = (val + cond) % len(array)
            
            # Append the letter at the calculated index to the 'oneline' list
            oneline.append(array[idx])

            # Increment the iteration index 'i'
            i += 1

        results.extend(oneline)

    # Create a DataFrame from the results list
    df = pd.DataFrame(np.array(results).reshape(condNum, condNum))

    # Set the column names and row labels of the DataFrame
    df.columns = list(range(1, condNum + 1))
    df.index = ['G' + str(i) for i in list(range(1, condNum + 1))]

    # Create an empty DataFrame to store the results
    result_df = pd.DataFrame(columns=['itemnum', 'condition', 'group'])

    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        # Iterate over each column in the row
        for column, value in row.items():
            # Append a new row to the result DataFrame with the current item number, condition, and group
            result_df = pd.concat([result_df, pd.DataFrame({'itemnum': [column], 'condition': [value], 'group': [index]})], ignore_index=True)

    # Sort the DataFrame by the "itemnum" and "condition" columns
    result_df = result_df.sort_values(by=['itemnum', 'condition'])

    # Get the "group" column from the result DataFrame as a list
    result_df = result_df['group'].tolist()

    unique = []
    for i in result_df:
        if i not in unique:
            unique.append(i)

    # Create a dictionary mapping
    mapping_dict = {element: value for element, value in zip(unique, array)}

    # Map the second list to the unique elements
    mapped_list = [mapping_dict[element] for element in result_df]

    return mapped_list