

 function main(){
    const url = "http://localhost:3000/profile";
    const editbtn = document.getElementById('saveChanges');
    editbtn.addEventListener('click',function(){
        const university = document.querySelector('#university').value;
        const topics = document.querySelector('#topics').value;
    
        editProfile(university,topics);
        const modal_div = document.querySelector('.modal');
        modal_div.style.display = 'none';
    });


 }


 async function editProfile(university, topics){
    /*if (err){
         console.log(err);
     }*/
   
     const options ={
          method:'POST',
          headers: {
              'Content-Type':'application/x-www-form-urlencoded'
          },
          body: `university=${university}&topics=${topics}`
 
     };
     const response = await fetch(url,options);
     const data = await response.json();
     
     
 
 };

document.addEventListener('DOMContentLoaded', main);