# Code Tester

A simple web application to test JavaScript code snippets and their outputs against predefined test cases.

## Prerequisites

- Node.js (version 12 or later)
- npm (Node package manager)

## Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/my-project.git
   cd my-project

2. **Install dependencies:** 
   npm install

3. **Start the server:**
   node server.js

4. **Open your web browser and navigate to:**
   http://localhost:3000

## Files
'public/index.html'
This file contains the front-end interface for the application where users can input their code and test cases, and see the test results.

'server.js'
This file contains the back-end server code using Express.js. It serves the static files and handles the test execution logic by using vm2 for sandboxed code execution.

## Usage
Enter your code in the "Enter your code" textarea. For example:

javascript:
```
function printFirstLetters(phrase) {
    console.log(phrase.split(' ').map(word => word.charAt(0)).join(''));
}
```

Enter your test cases in the "Enter test cases" textarea. Each test case should be on a new line in the format input|expected output.



