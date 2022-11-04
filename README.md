# JSON-Generator
A script that generates a CHIP-0007 compatible json with sha256 hashing for each json file, and then returns a csv file the hashing as its own columnn. (For HNG9 task)

Requirements for running the script:
* git     (for installation of git, visit  https://git-scm.com/downloads) 
* node.js (for instllation of node.js, visit https://nodejs.org/en/download/)

Steps to use the script from your terminal:
* Clone the repository. `git clone https://github.com/SpaceTimmi/JSON-Generator.git`
* Navigate into the new folder `cd JSON-Generator`
* Install denpendencies `npm install`
* Run the script with the following commands `node script.js 'path-to-csv-file'` without the quotes ''.

  For example:
  * if the csv file is in the download folder: `node script.js ~/Downloads/name-of-file.csv`
  * if the csv file is in the current folder: `node script.js ./name-of-file.csv` and so on.

After running the script with the correct parameters, you will find a folder called results in your current directory and inside that folder is a 'name-of-file'.output.csv (the new data) 


