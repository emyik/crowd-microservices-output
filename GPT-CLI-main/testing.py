def extract_function_info(file_path):
    functions = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        current_function = None
        current_description = None
        for line in lines:
            if line.strip() == '':
                if current_function is not None and current_description is not None:
                    functions.append({'name': current_function, 'description': current_description})
                    current_function = None
                    current_description = None
            elif current_function is None:
                current_function = line.strip()
            elif current_description is None:
                current_description = line.strip()
            else:
                current_description += "\n" + line.strip()
    return functions

# Usage
file_path = 'GPT-CLI-main/functionDescriptions.txt'  # Replace with the actual file path
functions = extract_function_info(file_path)
for function in functions:
    print('Function Name:', function['name'])
    print('Description:', function['description'])
    print()