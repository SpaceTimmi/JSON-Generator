const fs = require('fs');
const path = './main.csv';

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
    parsedOutput.forEach((item) => {
        if (item[1] !== '') { // array holds value and is not empty
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
    // header is now clean


    // Make a directory called json if it doesn't exist already 
    // (The directory house all of the created json files).
    let location = './json';
    if (!fs.existsSync(location)) {
        fs.mkdirSync(location, {recursive: true})
    }

    console.log(header);
}

parse(path)
