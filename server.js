const express = require('express');
const bodyParser = require('body-parser');
const { VM } = require('vm2'); // A sandboxed environment for executing code

const app = express();
const port = 3000;
const path = require('path');

// Serve static files from a directory (e.g., 'public')
app.use(express.static('public'));

// Route for the root path
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));

});


app.use(bodyParser.json());

app.post('/run_tests', (req, res) => {
    console.log("Received a request to /run_tests");

    console.log('Backend');
    console.log(req.body.code); // Should log the submitted code
    console.log(req.body.testCases); // Should log the submitted test cases
    
    
    const { code, testCases } = req.body;
    const vm = new VM({
        sandbox: {
            _outputs: [],
            console: {
                log: function(output) {
                    this._outputs.push(output);
                }
            }
        }
    });
    const results = [];

    // Prepend a method to capture output
    const wrappedCode = `
        let _outputs = [];
        const _originalLog = console.log;
        console.log = (output) => _outputs.push(output);
        ${code}
        _outputs;
    `;

    try {
        const executionResult = vm.run(wrappedCode); // Execute user code

        testCases.split('\n').forEach((testCase) => {
            const [input, expectedOutput] = testCase.split('|');
            console.log("Executing user code...");
            const output = vm.run(`printFirstLetters(${JSON.stringify(input)}); _outputs.pop();`);
            if (output === undefined) {
                console.log("No output was produced by the user's code.");
                // Handle this case appropriately, maybe mark the test as failed with a specific message
            } else {
                // Proceed with comparing `output` to `expectedOutput`
                const pass = output.trim() === expectedOutput.trim();
                results.push({
                    message: `Test Case: ${input} => Expected: ${expectedOutput}, Received: ${output}`,
                    pass
                });
            }
            
        });

    } catch (error) {
        results.push({ message: `Error: ${error.message}`, pass: false });
    }

    res.json({ results });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});