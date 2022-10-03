
const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.pop-box'),
closeIcon = popupBox.querySelector('.popup-header i'),
addNoteTitle = popupBox.querySelector('.popup-details input'),
addNoteDesc = popupBox.querySelector('.popup-details textarea'),
addButton = popupBox.querySelector('.popup-details button')


let notes = JSON.parse(localStorage.getItem('notes') || '[]')

addBox.addEventListener('click',()=>{
    popupBox.classList.add('show');
})

closeIcon.addEventListener('click',()=>{
    popupBox.classList.remove('show');
    addNoteTitle.value = '';
    addNoteDesc.value = '';
})

addButton.addEventListener('click',()=>{    
    if(addNoteTitle.value || addNoteDesc.value){
        let dateObj = new Date();
        let day = dateObj.getDate();
        let month = dateObj.getMonth();
        let year = dateObj.getFullYear();
        let noteObj = {title:addNoteTitle.value, desc:addNoteDesc.value, date:`${day} ${month} ${year} `};
        notes.push(noteObj);
        localStorage.setItem('notes', JSON.stringify(notes));
        
        closeIcon.click();
        showNotes();
    }    
})

const showNotes = () =>{
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
            <span>${note.date}</span>
            <i class="fa-solid fa-ellipsis"></i>
        </div>
    </div>
        `;
        addBox.insertAdjacentHTML('afterend',div);
    })    
}
showNotes();