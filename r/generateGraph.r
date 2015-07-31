#
# /r/generateGraph.r
# Generate A Graph from a custom data
#
#
#

generateGraph <- function (file){
	# Require packages
    require(ggplot2) # Ploting graphs
    require(lubridate) # Manipulating date values
    require(jsonlite) # JSON data


    # data to use for final plotting
    dtp <- NULL

	# Read JSON file
	readData <- fromJSON(readLines(file, warn="F")) # Read JSON data from json file
	# get fields dynamically from file
	readDataColumns = colnames(readData)

	for (column in readDataColumns) {
		# Dynamic
		dtp[column] <- c(readData[column])
	}

	# Generate data frame from data
    df <- as.data.frame(dtp)

    # Use first and second column for x and y
    firstColumn <- readDataColumns[1]
    secondColumn <- readDataColumns[2]

    ggplot(df, aes_string(firstColumn, secondColumn)) + 
    	geom_line(colour="green") +
    	geom_smooth() +
    	ggtitle(paste("Searches for ", sep = "")) + 
    	theme_bw(base_size=15)x`
    ggsave("generator.png", width = 10, height = 6)

}