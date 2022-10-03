
const closeIcon = document.querySelector('.popup-header i'),
addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.pop-box'),
addBtn = popupBox.querySelector('button'),
addNoteTitle = popupBox.querySelector('.form-title input'),
addNoteDesc = popupBox.querySelector('.form-description textarea')


let notes = JSON.parse(localStorage.getItem('notes') || '[]') ;
console.log(notes);
addBox.addEventListener('click',()=>{
    popupBox.classList.add('show');
})
closeIcon.addEventListener('click',()=>{
    popupBox.classList.remove('show');
    addNoteDesc.value = '';
    addNoteTitle.value = '';
})

addBtn.addEventListener('click',()=>{        
    let dateObj = new Date();
    let day = dateObj.getDay();
    let month = dateObj.getDay();
    let year = dateObj.getFullYear();
    if(!addNoteTitle.value && !addNoteDesc.value){        
    }else{
        let noteObj = {title:addNoteTitle.value, desc:addNoteDesc.value, date:`${day} ${month} ${year}`};
        notes.push(noteObj);
        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
    }
    
})