
const closeIcon = document.querySelector('.popup-header i'),
addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.pop-box'),
addBtn = popupBox.querySelector('button'),
addNoteTitle = popupBox.querySelector('.form-title input'),
addNoteDesc = popupBox.querySelector('.form-description textarea')

let isUpdate = false, updateId;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let notes = JSON.parse(localStorage.getItem('notes') || '[]') ;
addBox.addEventListener('click',()=>{
    popupBox.classList.add('show');
    addNoteTitle.focus();
})
closeIcon.addEventListener('click',()=>{
    popupBox.classList.remove('show');
    addNoteDesc.value = '';
    addNoteTitle.value = '';
    isUpdate = false;
})

addBtn.addEventListener('click',()=>{        
    let dateObj = new Date();
    let day = dateObj.getDate();
    let month = months[dateObj.getMonth()];
    let year = dateObj.getFullYear();
    let filterDesc = addNoteDesc.value.replaceAll('\n','<br/>');
    if(!addNoteTitle.value && !addNoteDesc.value){        
    }else{
        let noteObj = {title:addNoteTitle.value, desc:filterDesc, date:`${day} ${month} ${year}`};
        if(isUpdate){
            notes[updateId] = noteObj;
        }else{
            notes.push(noteObj);
        }        
        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }    
})
let showNotes = () => {
    document.querySelectorAll('.note').forEach(note=>note.remove());
    notes.forEach((note, id)=>{
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
            <span onclick="showMenu(this)"><i class="fa-solid fa-ellipsis"></i>
                <div class="menu">
                    <span onclick="updateNote(${id},'${note.title}','${note.desc}','${note.date}')"><i class="fa-regular fa-pen-to-square"></i>Edit</span>
                    <span onclick="deleteNote(${id})"><i style="color: red;" class="fa-solid fa-trash"></i>Delete</span>
                </div>
            </span>                
        </div>
    </div>
        `;
        addBox.insertAdjacentHTML('afterend', div);
    })
}
showNotes();

let updateNote = (id, title, desc) => {
    updateId = id;
    isUpdate = true;
    let filterDesc = desc.replaceAll('<br/>',  '\n');
    addBox.click();
    addNoteDesc.value = filterDesc;
    addNoteTitle.value = title;
}

let showMenu = (any) => {    
    any.parentElement.classList.add('show');
    document.addEventListener('click', e=>{
        if(e.target.tagName != 'I'){
            any.parentElement.classList.remove('show');
        }
    })
}

let deleteNote = (any) =>{
    let deleteConfirm = confirm('Delete this note ?');
    if(deleteConfirm){
        notes.splice(any,1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }    
    showNotes();
}