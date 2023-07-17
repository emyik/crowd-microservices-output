import openai
import json
from decouple import config

API_KEY = config("OPENAI_KEY")
openai.api_key = API_KEY

# Terminal Color Defenitions:
RED = "\033[91m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
BLUE = "\033[94m"
NORMAL = "\033[0m"

def textCompletion(model, prompt, temp):
    response = openai.Completion.create(
        model = model,
        prompt = prompt,
        temperature = temp,
        max_tokens = 1000
    )
    response = json.loads(str(response))
    content = response['choices'][0]['text']
    # print(content)

    with open("service/todo_microservice2.js", "a") as file: # CHANGE
        file.write(content)
    return content

def printChoices(useCase, model, temp):
    print("\nYou Chose:")
    print(GREEN + "Use Case:" + NORMAL, useCase)
    print(BLUE + "Model:" + NORMAL, model)
    print(YELLOW + "Temperature:" + NORMAL, temp)

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

def main():
    useCase, model, temp = "complete", "text-davinci-003", 0.5 # CAN CHANGE

    file_path = 'GPT-CLI-main/functionDescriptions.txt'
    functions = extract_function_info(file_path)
    for function in functions:
        with open("GPT-CLI-main/prompt_template.txt", 'r') as source: text = source.read()
        with open("GPT-CLI-main/Prompt.txt", 'w') as destination:
            destination.write(text + function['name'] + " with the following functionality: " + function['description'] + ".\nYou may call on the third party API functions.")
            destination.close()
        file = open("GPT-CLI-main/Prompt.txt", "r")
        prompt = file.read()
        file.close()
        textCompletion(model, prompt, temp)    
    
    with open("GPT-CLI-main/microservice_template.txt", 'r') as source: text = source.read()
    with open("service/todo_microservice2.js", 'a') as destination:
        destination.write(text)
        destination.close()


if __name__ == "__main__":
    main()