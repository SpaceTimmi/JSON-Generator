const fs = require('fs');
const crypto = require('crypto');
const { resolve } = require('path');

//const path = './main.csv';

function parse(path) {
    // Read CSV file into array.
    let rawFile = fs.readFileSync(
        path, 
        'utf-8'
    ).split('\n')

    // Separate the header of the CSV file and the body of the CSV file. (will come in handy later)
    let rawHeader = rawFile.slice(0, 1) 
    let rawBody = rawFile.slice(1);

    // Read each element of the array and parse individual values out of each string.
    parsedOutput = rawBody.map((item) => {
        return item.split(",")
    });

    // Cleaning the data (removing null values, team names and  empty strings)
    const dataArr = [];
    let teamName = '';
    parsedOutput.forEach((item) => {
        if (item[1] !== '') { // array holds value and is not empty
            teamName = (item[0] !== '') ? item[0] : teamName; 
            item[0] = teamName;
            dataArr.push(item);
        }  
    });
    // Final cleaning (removing carrage return symbol '\r' from uid) 
    const data = dataArr.map((item) => {
        let endIndex = item.length - 1
        item[endIndex] = item[endIndex].slice(0, -1)
        return item
    });
    //data is clean and can now be converted to JSON.
    
    // Parsing header
    let header = rawHeader[0].split(',')
    let endIndex = header.length - 1
    header[endIndex] = header[endIndex].slice(0, -1);
    header = header.map((item) => {
        let a = item.toLowerCase();  // change header to lowercase
        let b = a.replace(' ', '_'); // replace whitespace ' ' with '_'
        return b
    })
    // header is now clean

    // Generating JSON file for each entry and storing in a folder called (/json)
    let arrayOfJSON = data.map( (item) => {
        let obj = {}
        item.forEach((sub, id) => {
            obj['format'] = 'CHIP-0007'
            obj[header[id]] = sub
        })
        let result = hashNode(JSON.stringify(obj))
        obj['sha256'] = result
        return obj
    });

    let finalData = arrayOfJSON.map((item) => {
        delete item['format']
        return item
    }); 

    // Convert to csv and store in folder called results.
    if (!fs.existsSync('./results')) {
        fs.mkdirSync('./results')
    }
    let filePath = path.split('/'); 
    let fileName = filePath[filePath.length - 1]
    let newName = `${fileName.split('.')[0]}.output.csv`

    const csv = jsonToCsv(finalData);
    fs.writeFileSync(`./results/${newName}`, csv, {encoding: 'utf-8', flag: 'w'});
    return 0;
}



// Hashing function 
function hashNode(j) {
    return crypto.createHash('sha256').update(j).digest('hex');
}

// JSON to csv
function jsonToCsv(items) {
  const header = Object.keys(items[0]);

  const headerString = header.join(',');

  // handle null or undefined values here
  const replacer = (key, value) => value ?? '';

  const rowItems = items.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(',')
  );
  // join header and body, and break into separate lines
  const csv = [headerString, ...rowItems].join('\r\n');
  return csv;
}


// Main function
function main() {
    let arg = process.argv.slice(2);
    let path = arg[0];
    if (path === undefined) {
        console.log("Missing csv params: expects node script.js 'path to csv file'");
    } else {
        parse(path);
        console.log('Success! Check the results folder!');
    }
}
main();