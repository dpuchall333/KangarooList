Daniela Puchall
Applied Internet Technologies
Spring 2021

Final Project: Milestone #1

# Kangaroo
## Overview
 As a student or researcher, there are often endless websites, papers ,links to return to. 
 Using only the Bookmarks bar as a resource to hold all this information can be confusing and
 can make these links easy to loose track of. Kangaroo provides a solution! 

 Kangaroo provides: 
 1. A secure platform (username/password) 
 2. A place to organize and sort "bookmarks" by topic, priority, or date
 3. For each bookmark, a space to write notes, reminders, or share the bookmark on a Forum for other   students 
 4. Forum sorted by topic and university (if indicated by user)


## Data Model 
The application will store Users (username, password, university), Bookmarks List, and User Notes
1. User's will be able to have multiple Bookmark lists based on topic and priority (reference documents)
2. Each Bookmark list can have multiple bookmarks (reference pages), there will potentially be a limit to number of bookmarks, but this is to be determined for later on in the project (embedded documents)


User Example
```javascript
  {
      username: "NYUstudent",
      password: hash, //Password hashed and salt added
      university: "NYU",
      kangaroo_lists: // Queue based Array Data Structure
      likes: [ 'nyc' ] //array of liked topics (for forum component)
  }  
```
Bookmarks List
'''javascript

 '''


[Link to Commented First Draft Schema](../blob/master/LICENSE)


## Wireframes

## Site Map

## User Stories or Use Cases

## Research Topics
1. Slack App Integration with Bolt for JavaScript(7pts)

2. Bootstrap (3pts)
[Link to Initial Main Project File](../blob/master/LICENSE)

## Annotations/References Used
1. [Slack App Getting Started](https://slack.dev/bolt-js/tutorial/getting-started)

2. [Bolt for JavaScript](https://slack.dev/bolt-js/reference) 

3. [Bootstrap](https://getbootstrap.com/)
