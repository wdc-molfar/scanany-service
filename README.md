# scanany-service
@molfar/scanany-service

## Requirements:

 1) Service should take two parameters - script (YAML file) and params (YAML file).
    1) _Script_ - describes the algorithm of scrapping itself
    2) _Params_ - config, which contains type of source (e.g. telegram/rss/...) and url to the wanted resource
    
 2) Service should return JSON, which aggregates both metadata and scraping result 
 
 3) Service should validate the input message (task from scheduler) and break if validation fails
 
 4) Service should validate the output message and break if validation fails
 
 5) The algorithm of scraping should be passed declaratively to the service and should not be contained inside
 
 6) The process of scrapping should be hidden behind the "Facade" of Scanany
 
