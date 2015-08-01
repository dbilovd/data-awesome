#
# /r/generateGraph.r
# Generate A Graph from a custom data
#
#
#

generateGraph <- function (file, type = "line",  colX = NULL, colY = NULL) {
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
	    df <- melt(df, id = "Region")
    	plot <- ggplot(df, aes_string(x = colX, y = "value", fill = "variable"))
    } else { # DEFAULT: line
	    # Melt Data
	    df <- melt(df, id = "Region")
    	plot <- ggplot(df, aes(x = Region, y = value, colour = variable, group = variable))
    	# plot <- ggplot(df, aes_string(x = colX, y = colY), geom = type)
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
    
    plot
    # save as image
    # ggsave("generator.png", width = 10, height = 6)

}