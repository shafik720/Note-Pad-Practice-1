
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
        showNotes();
    }    
})

let showNotes = () => {
    document.querySelectorAll('.note').forEach(note=>note.remove());
    notes.forEach(note=>{
        let div = `
        <div class="note">            
        <div class="note-body">
            <div class="note-header">
                <p>${note.title}</p>                
            </div>
            <div class="note-details">
                <span>${note.desc}</span>
            </div>
        </div>
        <div class="note-bottom">
            <span>${note.date} </span>
            <span"><i class="fa-solid fa-ellipsis"></i>
                <div class="menu">
                    <span><i class="fa-regular fa-pen-to-square"></i>Edit</span>
                    <span><i style="color: red;" class="fa-solid fa-trash"></i>Delete</span>
                </div>
            </span>                
        </div>
    </div>
        `;
        addBox.insertAdjacentHTML('afterend', div);
    })
}
showNotes();