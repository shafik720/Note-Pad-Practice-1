
const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.pop-box'),
closeIcon = popupBox.querySelector('.popup-header i'),
addNoteTitle = popupBox.querySelector('.popup-details input'),
addNoteDesc = popupBox.querySelector('.popup-details textarea'),
addButton = popupBox.querySelector('.popup-details button'),
popupHeaderTitle = popupBox.querySelector('.popup-header p'),
popupBtn = popupBox.querySelector('button')

let isUpdate = false, updateId;
let notes = JSON.parse(localStorage.getItem('notes') || '[]')

addBox.addEventListener('click',()=>{
    popupBox.classList.add('show');
    addNoteTitle.focus();
})

closeIcon.addEventListener('click',()=>{
    popupBox.classList.remove('show');
    addNoteTitle.value = '';
    addNoteDesc.value = '';
    popupBtn.innerText = 'Add Note';
    popupHeaderTitle.innerText = 'Add a New Note';
    isUpdate = false;
})

addButton.addEventListener('click',()=>{    
    if(addNoteTitle.value || addNoteDesc.value){
        let filterDesc = addNoteDesc.value.replaceAll('\n', '<br/>');
        let dateObj = new Date();
        let day = dateObj.getDate();
        let month = dateObj.getMonth();
        let year = dateObj.getFullYear();
        let noteObj = {title:addNoteTitle.value, desc:filterDesc, date:`${day} ${month} ${year} `};
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

const showNotes = () =>{
    document.querySelectorAll('.note').forEach(note=>note.remove());
    notes.forEach((note,id)=>{
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
                <span>02 October, 2022</span>
                <span onclick="showMenu(this)"><i class="fa-solid fa-ellipsis"></i>
                    <div class="menu">
                        <span onclick="updateNote(${id}, '${note.title}', '${note.desc}')"><i class="fa-regular fa-pen-to-square"></i>Edit</span>
                        <span  onclick="deleteNote(${id})"><i style="color: red;" class="fa-solid fa-trash"></i>Delete</span>
                    </div>
                </span>                
            </div>
    </div>
        `;
        addBox.insertAdjacentHTML('afterend',div);
    })    
}
showNotes();

const showMenu = (any) => {
    any.parentElement.classList.add('show');
    document.addEventListener('click', e=>{
        if(e.target.tagName != 'I'){
            any.parentElement.classList.remove('show');
        }
    })
}

let updateNote = (id, title, desc) => {
    let filterDesc = desc.replaceAll('<br/>', '\n');
    updateId = id;
    isUpdate = true;
    addBox.click();
    addNoteTitle.value = title;
    addNoteDesc.value = filterDesc;
    popupBtn.innerText = 'Update Note';
    popupHeaderTitle.innerText = 'Edit Note';
}

let deleteNote = (id) => {
    let isConfirm = confirm('Proceed to Delete ? ');
    if(isConfirm){
        notes.splice(id, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }    
    showNotes();
}


