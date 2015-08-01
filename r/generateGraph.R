#
# /r/generateGraph.r
# Generate A Graph from a custom data
#
#
#

args <- commandArgs(trailingOnly = TRUE);

# File as argument
file <- NULL
if (length(args) > 0) {
	file <- args[1]
}
# Output director
output <- NULL
if (length(args) > 1) {
	output <- args[2]
}
# Graph type
type <- "line"
if (length(args) > 2) {
	type <- args[3]
}
# Colx
colX <- NULL
if (length(args) > 3) {
	colX <- args[4]
}
# ColY
colY <- NULL
if (length(args) > 3) {
	colY <- args[4]
}

#
# generateGraph
# Generate a graph
#
generateGraph <- function (file, output = NULL, type = "line", colX = NULL, colY = NULL) {
	# Require packages
    require(ggplot2) # Ploting graphs
    require(lubridate) # Manipulating date values
    require(jsonlite) # JSON data
	library(reshape2) # Use mainly for melting data

    # variable to hold data for final plotting
    dtp <- NULL

	# Read JSON file
	readData <- fromJSON(readLines(file, warn="F")) # Read JSON data from json file
	# get fields dynamically from file
	readDataColumns = colnames(readData)
	# Add each column data from json into our data for plotting
	for (column in readDataColumns) {
		# Dynamic
		dtp[column] <- c(readData[column])
	}

	# Generate data frame from data
    df <- as.data.frame(dtp)

    # Names to use for x and y axis of data
    # Use first and second column for x and y if none supplied
    if (length(colX) == 0) {
    	colX <- readDataColumns[1]
    }
    if (length(colY) == 0) {
    	colY <- readDataColumns[2]
    }

    # Prepare data and graph
    plot <- NULL
    if ( type == "bar") { # Bar chat
	    # Melt Data and plot with melted 
	    df <- melt(df, id = colX)
    	plot <- ggplot(df, aes_string(x = colX, y = "value", fill = "variable"))
    } else { # DEFAULT: line
    	# Plot multple lines too
	    # Melt Data
	    df <- melt(df, id = colX)
    	plot <- ggplot(df, aes_string(x = colX, y = "value", colour = "variable", group = "variable"))
    }

    # smooth disabled for now
    # plot <- plot + geom_smooth(aes(group = 1))
    plot <- plot + ggtitle(paste("Graph", sep = "")) # Graph Title
    plot <- plot + theme_bw(base_size=15) # Graph theme

    if ( type == "bar") { # bar chat
    	plot <- plot + geom_bar( stat = "identity" )
    } else { # DEFAULT: line
		plot <- plot + geom_line()
    }

	# Plot Graph
    plot

    # file and dir name
    fileName <- basename(file)
    if (length(output) == 0) {
    	print ("in here")
    	dirName <- dirname(file)
    	output <- paste(dirname, "generated", fileName, ".png", sep = "")
    } else {
    	# print ("out here")
    	output <- paste(output, "/", fileName, ".png", sep = "")
    }

    # save as image
    ggsave(output, width = 10, height = 6)

    return(output)
}

# Generate Graph
generateGraph(file, output, type, colX, colY)
