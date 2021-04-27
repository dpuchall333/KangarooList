

 function createComment(id){
    const modalComment = document.querySelector('#modal-comment');
     modalComment.style.display = 'block';
  
     const idCode = document.querySelector('#post-id');
     
     
     idCode.value = id;
     console.log(idCode.value);
  }
  
  
  function main(){
      
      let url = 'http://localhost:3000/forum';
      getComments();
  
 
  

      $('#create-post').on('click', function (e) {
        const title = document.querySelector('#post-title').value;
      const listInfo = document.querySelector('#post-content').value;
      console.log("Title: "+ title);
      console.log('Content: '+ listInfo);
      postList(title,listInfo);
     
      });
  
  $('#create-comment').on('click',function(e){
    const id = document.querySelector('#post-id').value;
    
    const comment = document.querySelector('#comment-text').value;
    postComment(id,comment);
  });
  
      async function getComments(){
          const response = await fetch(url);
          const data = await response.json();
  
          if(data.err){
              console.log(data.err);
          }
          else{ 
              
              const root = document.querySelector('#previous-post');
              for (const c of data.lists){
                  
                 const title = document.createElement('h2');
                 title.textContent = c.title;
                 root.append(title);
  
                 const header = document.createElement('pre');
                  header.textContent = c.header;
                 root.appendChild(header);
  
                  const comment = document.createElement('ul');
                  for (i in c.comment){
                      const indiv = document.createElement('li');
                      indiv.textContent = c.comment[i]; 
                      root.appendChild(indiv);
                  }
  
  
                   const idVal = document.createElement('div');
                   idVal.id = 'post_id';
                   idVal.setAttribute('value',c._id); 
                   idVal.setAttribute("type", "hidden");
                   root.appendChild(idVal);
  
                  const newcomment = document.createElement('input');
                  newcomment.type = 'button';
                  newcomment.value = 'Comment';
                  root.appendChild(newcomment);
                  
                  newcomment.addEventListener('click',function(){
                      createComment(c._id);
                  });
  
                  
                 
              }
              
             
          }
          //setTimeout(postCode,500);
      }
  
   
  async function postList( title, listInfo){
   
    
      const options ={
           method:'POST',
           headers: {
               'Content-Type':'application/x-www-form-urlencoded'
           },
           body: `title=${title}&content=${listInfo}`
  
      };
      const response = await fetch(url,options);
      const data = await response.json();
      
      
  
  };
  
       async function postComment(id,comment){
        
          //need to change
          let url = `http://localhost:3000/forum/${id}/comments`;
           const options ={
                method:'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body: `_id=${id}&comment=${comment}`
                //
           };//
           console.log(id);
           const response = await fetch(url,options);
           const data = await response.json();
           
       };
       
  
  }
  
  
  
  
  document.addEventListener('DOMContentLoaded', main); 