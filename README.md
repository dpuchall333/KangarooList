
Daniela Puchall
Applied Internet Technologies
Spring 2021

Final Project: Milestone #1
To Run:http://linserv1.cims.nyu.edu:10970/
- To try a new user, clear cookies 

FORMS: 
(1)http://linserv1.cims.nyu.edu:10970/create/list
(2)http://linserv1.cims.nyu.edu:10970/create/page
(3)http://linserv1.cims.nyu.edu:10970/profile/editProfile

Higher Order Functions:


# Kangaroo
## Overview
 As a student or researcher, there are often endless websites, papers, links to return to. 
 Using only the Bookmarks bar as a resource to hold all this information can be confusing and
 can make these links easy to loose track of. Kangaroo provides a solution! Put the resource in a pouch (aka List)!

 Kangaroo provides: 
 1. A secure platform (username/password) 
 2. A place to organize and sort "bookmarks" by topic, priority, or date
 3. For each bookmark, a space to write notes, reminders, or share the bookmark on a Forum for other   students 
 4. Forum sorted by username and university (if indicated by user)

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
**notes**
```javascript
  {
      content:"This is content", //Note content
      data: new Date('2021-04-01')) //Use JavaScript date object to keep track of when notes are written, AND allows notes to be organized by date added (user specified)
  }  
```

### [Link to Commented First Draft Schema](https://github.com/nyu-csci-ua-0480-034-spring-2021/dpuchall333-final-project/blob/master/final-project-schema-milestone1.js)


## Wireframes
Login Page /login

<img width="607" alt="Screen Shot 2021-04-02 at 9 20 05 AM" src="https://user-images.githubusercontent.com/50317141/113419082-b8cfc880-9394-11eb-8556-cc0cf5c8e1b8.png">

Create an Account /createAccount

<img width="614" alt="Screen Shot 2021-04-03 at 1 16 22 AM" src="https://user-images.githubusercontent.com/50317141/113469264-443f6d00-941a-11eb-83a9-85ca9357b3fc.png">

Home Page  /home

<img width="633" alt="Screen Shot 2021-04-03 at 1 28 06 AM" src="https://user-images.githubusercontent.com/50317141/113469494-e7dd4d00-941b-11eb-9e12-b12040652bea.png">

Profile /profile

<img width="635" alt="Screen Shot 2021-04-03 at 1 38 28 AM" src="https://user-images.githubusercontent.com/50317141/113469651-566eda80-941d-11eb-98a9-319dda09cd66.png">

Forum /forum

<img width="620" alt="Screen Shot 2021-04-03 at 10 22 38 AM" src="https://user-images.githubusercontent.com/50317141/113481270-8f7f6d00-9466-11eb-910a-051c255ded3b.png">

Create Page (Similar Structure for Create List Page, with a few varying parameters (outlined in Schema))  /create/page
- Not all options are included in this example

<img width="671" alt="Screen Shot 2021-04-03 at 10 55 41 AM" src="https://user-images.githubusercontent.com/50317141/113482127-30702700-946b-11eb-9584-b1862c232ae0.png">

My Pages (Similar to individual List page with a few varying options)  /mypages

<img width="667" alt="Screen Shot 2021-04-03 at 11 17 27 AM" src="https://user-images.githubusercontent.com/50317141/113482804-4a5f3900-946e-11eb-81a6-4d8d0178fbe9.png">


## Site Map
![site_map](https://user-images.githubusercontent.com/50317141/113468868-f6753580-9416-11eb-9839-37de54f4e652.png)


## User Stories or Use Cases
User without an Account: 
1. Create an Account with Authentication Plugin or 
    username and password
2. Non-registered users cannot create a Kangaroo List, page, or view forum posts

User with an Account:
1. Login in with plugin or username/password
2. Create a profile with university, topics of interests 
3. Create a Kangaroo List 
4. Add any number of pages (urls) to a Kangaroo List
5. Each page consists of a url, title, and notes
6. User can add optional notes to each page.
7. User can "post" page or List to a forum where
other registered users can access the page/List 
8. Only the author of the notes can view the notes unless shared, other user cannot view notes provided on a page or List. However if a list is shared, all users can view it.
10. User can order pages by topic, priority (numbered), or last updated note (date)

## Research Topics

1. Bootstrap (3pts): I will be using bootstrap to as a front end framework to build a dynamic and responsive web application. Bootstrap is a JavaScript library. Aspects of JQuery JavaScript library will also be used to enhance the web application. 

2. Authenticaion Plugin Option (3pts)
    Authentication Plugin opton integration would allow the user to sign into or create a more secure account with Mongoose Passport library.

3. JQuery (3pts) Include JQuery Animation and additional features 

[Link to Initial Main Project File](https://github.com/nyu-csci-ua-0480-034-spring-2021/dpuchall333-final-project/blob/master/app_example.js)

## Annotations/References Used
1. [Bootstrap](https://getbootstrap.com/) 
2. [JQuery](https://jquery.com/)
3. [Passport-Local-Mongoose](https://www.npmjs.com/package/passport-local-mongoose)

