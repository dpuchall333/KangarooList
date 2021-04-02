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
3. Each Bookmark (page) in a List uses a mongoose URL Slug for references 


**User Example**
```javascript
  {
      username: "NYUstudent",
      password: hash, //Password hashed and salt added
      university: "NYU",
      kangaroo_lists: ['cs','chem','bio']// Queue based Array Data Structure based on topic
      likes: [ 'nyc' ] //array of liked topics (for forum component)
  }  
```
**Bookmarks List** (aka Kangaroo List)
```javascript
  {
      username: "NYUstudent",//Who List belongs too
      university: "NYU",
      list_name: "cs", // Name of list (based on topic or preference (ex. list_name: '1'))
      pages: ["classWebsite","github"], //pages, user wants to bookmark under topic (NOT URL, rather references to pages)
      header: "This list is for CS" //notes or comments user wants to give to specific list; can be null

  }  
```

**Kangaroo Page** 
```javascript
  {
      username: "NYUstudent",//Who List belongs too
      list_name: "cs", // Name of list page is under
      university: "NYU", // for use in forums 
      shared: true OR false, // user can indicate if they want to share the Kangaroo page on a forum with matching topic = list_name
      page_name: "classWebsite", //page name, given by user
      url: "https://cs.nyu.edu/courses/spring21/CSCI-UA.0480-034/_site/" // URL to page user would like to bookmark 
      notes: [{content:"This is the course website for AIT", date: new Date('2021-04-01')} ]// array of notes that can be organized by date
  }  
```
**notes** (only accessible by main user; notes will not be accessible in forum (for now))
```javascript
  {
      content:"This is content", //Note content
      data: new Date('2021-04-01')) //Use JavaScript date object to keep track of when notes are written, AND allows notes to be organized by date added (user specified)
  }  
```

[Link to Commented First Draft Schema]()


## Wireframes

## Site Map

## User Stories or Use Cases

## Research Topics
1. Slack App Integration with Bolt for JavaScript(7pts)
2. Bootstrap (3pts)
3. Authenticaion Plugin Option (3pts)
[Link to Initial Main Project File](../blob/master/LICENSE)

## Annotations/References Used
1. [Slack App Getting Started](https://slack.dev/bolt-js/tutorial/getting-started)

2. [Bolt for JavaScript](https://slack.dev/bolt-js/reference) 

3. [Bootstrap](https://getbootstrap.com/)
