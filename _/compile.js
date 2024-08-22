const fs = require('fs');
const path = require('path');

// Function to convert PascalCase to kebab-case
function pascalToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Function to process each file
function processFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');

  let newFileContent = '';
  let className = '';
  let foundClass = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for class declaration that extends Shadow
    const classMatch = line.match(/class\s+(\w+)\s+extends\s+Shadow/);

    if (classMatch) {
      className = classMatch[1];
      foundClass = true;
      newFileContent += lines.slice(i).join('\n');
      break;
    }
  }

  if (foundClass && className) {
    // Add the registration line at the end
    const kebabCaseName = pascalToKebabCase(className);
    const finalKebabCaseName = (className.toLowerCase() === kebabCaseName ? kebabCaseName + '-' : kebabCaseName)
    newFileContent += `\nwindow.register(${className}, '${finalKebabCaseName}');`;

    // Write the new content to a file in the ./build/ directory
    const newFilePath = path.join(__dirname, 'build', path.basename(filePath));
    fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
    fs.writeFileSync(newFilePath, newFileContent, 'utf8');
    console.log(`Processed and created: ${newFilePath}`);
  }
}

// Function to recursively read all JS files in the directory
function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const fullPath = path.join(directory, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  });
}

// Start processing files in the ../src directory
const srcDirectory = path.resolve(__dirname, '../src');
processDirectory(srcDirectory);
