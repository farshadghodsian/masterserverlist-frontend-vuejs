# Master Server List 

### Use Case - Background:<br>
Inventory and asset management can be a nightmare at most big Tech Companies/Enterprises and information is not always easily accessible during a high severity incident when the operations and technical staff need the information at their finger tips. Keeping this in mind over the years I took the initiative to build several server and inventory management front-end websites that could be used by all internal teams to quickly and efficiently look up server information, IPs, URLs, etc.

Originally dubbed the "Master Server List" I created the first iteration of the site using Microsoft Report Builder (SSRS), and soon after Tableau to query our inventory databases for this information and present it to the user in an easy to search and digestible fashion. The Tableau version of the site quickly became the top most viewed Tableau Dashboard at TELUS, still topping the charts at around 10,000+ views the last time I checked.

The current iteration of the Telus Health Master Server List website is a custom built site using my expertise with Vue.JS as the frontend and Node.js as the backend with MySQL being the database of choice. Both the front and back end are built as microservices and can easily be modified independantly or hosted eslewhere should the need arise. The site has many superior features from the previous versions such as RESTful API integration, being able to export and download lists directly to excel, or typing in a URL to find which servers it is hosted on. It is a valuable resource for me and my fellow team members and showcases my dedication to helping to improve the day to day lives of my coworkers. It continues to save valuable minutes when we are in a crunch and need to know what server a particular IP belongs to or what service or datacenter a server is located in.

To view the application/site check out the below URL: <br/>
https://masterserverlist.learningautomation.io:54003

#### Note: That this is an example of what I had built in production and doesn't include the entire codebase. Some things have been intentionally left out. Server information listed on the site is using dummy data and not actual real server names, ips, etc.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
