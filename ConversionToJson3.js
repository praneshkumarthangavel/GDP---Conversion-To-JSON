var learnData = require('fs'); 																				//Include File system

var learnLine = require('readline').createInterface( { input: learnData.createReadStream('Data.csv') } ); 	//Create a interface to read the data's from csv file

var index = 0, header = [], presentLine = [], sqr = []; 													//Intialize the variables

learnLine.on('line', function (line) 																		//Using call back method with line event, we read the data line by line
{
	if (index == 0) 
	{
		header = line.split(',');																			//Take the header value and splits it and store in a array
		index++;
	}
	else
	{
		var set = {};
		presentLine = line.split(',');  																	//Created a presentLine array to store the fetched data
		set[header[0].replace(/\"/g,"")] = presentLine[0].replace(/\"/g,""); 
		set[header[17].replace(/\"/g,"")] = presentLine[17].replace(/\"/g,""); 								//store the fetched data's in set object
		sqr.push(set);																						//push the data's into sqr object
	}
} );

learnLine.on('close', function (line) 																		//close event to close the connection
{ 
	learnData.appendFile('barchart3.json',JSON.stringify(sqr), function(err) 								//To append the fetched data into a json file
	{ 
		if (err) 																							//If error occurs, returns error message
			return console.error(err); 																		
	} );
	console.log('Connection Closed');																		//displays message after the connection is closed
} );