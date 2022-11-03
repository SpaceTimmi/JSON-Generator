# JSON-Generator
Script that generates a CHIP-0007 compatible json with sha256 hashing for each json file. (For HNG9 task)

steps to use the script
* Clone the repository. `git clone https://github.com/SpaceTimmi/JSON-Generator.git`
* Navigate into the new folder `cd JSON-Generator`
* Install denpendencies `npm install`
* Run the script with the following commands `node script.js 'path-to-csv-file'`

  For example, if the csv file is in the download folder:
  `node script.js ~/Downloads.name-of-file.csv`

After running the script with the correct parameters, you will find a folder called results in your current direcotry and inside that folder is a result.csv (the new data) 


