# Scaling ChatGPT to Building Larger Applications with Microtask Programming

## Abstract
ChatGPT and other large language models (LLMs) bring the potential to revolutionize programming by enabling developers to synthesize code and whole programs from natural language descriptions. However, current LLMs are limited in the size of the code they can generate and by their tendency to generate incorrect code. These limitations require new ways for human developers to guide the code generation offered by LLMs. To explore this direction, we investigated using LLMs to generate code within a microtask programming workflow. Microtask programming is a software development method in which developers write complex software through short, self-contained microtasks including testing, implementing, debugging, and reviewing functions. We envision using ChatGPT to write code for one function, which developers can then use microtasks to review and to suggest changes, enabling more complex software application to be built step by step. We investigated the feasibility of this process by using ChatGPT to generate code from descriptions of functions taken from microtasks and evaluating their correctness using a unit test suite. Our findings reveal that ChatGPT-generated functions successfully passed 70% (24 out of 34) of unit tests in one codebase and 59% (23 out of 39) in a second codebase. Overall, our findings indicate promising prospects for using ChatGPT as part of a microtask workflow to build more complex software.

## Table of Contents
### GPT-CLI-main
* `shopping_functionDescriptions.txt` and `todo_functionDescriptions.txt`: Descriptions of decontextualized functions for ChatGPT to generate for two codebases, shopping and todo.
* `prompt_template1.txt` and `prompt_template2.txt`: Prompt templates used to prompt ChatGPT to generate functions. Contain ADTs (abstract data types) and 3rd party API functions of respective codebases, as well as implementing role assignment concept.
* `automatedUseAPI.py`: Script automating function generation by using the function descriptions and prompt templates.

### service
ChatGPT-generated Javascript functions.

### tests
`allShoppingTests.js` and `alltodoTests.js` contain unit tests for both codebases.

## How To Run Project
To generate functions run ```python GPT-CLI-main/automatedUseAPI.py```

To run the server run `node routes/todo_endpoints.js`.

To execute unit tests run `npx mocha tests/alltodoTests.js --reporter mochawesome`. This uses Mochawesome, a custom reporter for use with the Javascript testing framework, mocha. It generates a HTML/CSS report to visualize test runs.


_Created by Emi Zhang, Henry Hu, Manohar Nookala, Emad Aghayi, and Thomas LaToza at the Department of Computer Science, George Mason University._
