
/*//Need for button to redirect to register page
document.getElementById("myButton").onclick = function () {
    location.href = "www.yoursite.com";
};*/
/*
$(document).ready(function(){
   $('#modal-comment').
  });

  */

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
  
     const mainbtn = document.getElementById('btn-show-modal-post');
      mainbtn.addEventListener('click', function(){
         const modal_div = document.querySelector('.modal');
         modal_div.style.display = 'block';
       });
  
  const cancelBtn = document.querySelector('.close');
  cancelBtn.addEventListener('click',function(){
      const modal_div = document.querySelector('.modal');
      modal_div.style.display = 'none';
  });
  
  const cancelComment = document.getElementById('closeComment');
  cancelComment.addEventListener('click',function(){
      const modal_comment = document.querySelector("#modal-comment");
      modal_comment.style.display = 'none';
  });
  
  const createbtn = document.getElementById('create-post');
  createbtn.addEventListener('click',function(){
      const title = document.querySelector('#post-title').value;
      const listsInfo = document.querySelector('#post-content').value;
  
      console.log("Title: "+ title);
      console.log('Content: '+ listInfo);
      postCode(title,listInfo);
      const modal_div = document.querySelector('.modal');
      modal_div.style.display = 'none';
  });
  
  const commentbtn = document.getElementById('create-comment');
  commentbtn.addEventListener('click',function(){
      //id = document.querySelector('#code-snippet-id');
      const id = document.querySelector('#post-id').value;
    
      const comment = document.querySelector('#comment-text').value;
      
    //  console.log('New id: '+ id);
      postComment(id,comment);
      const modal_comment = document.querySelector("#modal-comment");
      modal_comment.style.display = 'none';
  })
  
      async function getComments(){
          const response = await fetch(url);
          const data = await response.json();
  
          if(data.err){
              console.log(data.err);
          }
          else{ 
              
              const root = document.querySelector('#previous-post');
              for (const c of data.codeComments){
                  
                 const title = document.createElement('h2');
                 title.textContent = c.title;
                 root.append(title);
  
                 const code = document.createElement('pre');
                  code.textContent = c.code;
                  root.appendChild(code);
  
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
  
   
  async function postCode( title, listInfo){
     /*if (err){
          console.log(err);
      }*/
    
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