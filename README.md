# Data-Awesome
Data-Awesome: Awesome Data for awesome story tellers.

### Trello Board
https://trello.com/b/au8Eh0yB/data-awesome

### What?

Data-Awesome is a data analysing app, that helps journalists and bloggers to embed data into their content as user friendly graphs.

### Why?

Because we believe many many more Ghanaians need to get access to these Open Data and there are very few better ways to achieve this than through the people they already listen to.

### How?

* The uploads a file container some set of Data
* He then has to chose how he wants to display the data.
* Data-Awesome will take up from there and return an <img /> to the user that he can embed on any website.

### Running it locally

#### Requirements

* LAMP stack (PHP, MySQL and Apache)
* R
* R packages: ggplot2, lubridate, jsonline, reshape2
 
### Running

1. Clone this repo into your htdocs folder so that you can access the php_d folder at http://localhost/php_d
2. Visit http://localhost/php_d/upload.php to test.

*PS:* Your server should have write permissions over the /php_d/uploads folder.
