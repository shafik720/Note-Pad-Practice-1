
const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.pop-box'),
closeIcon = popupBox.querySelector('.popup-header i'),
addNoteTitle = popupBox.querySelector('.popup-details input'),
addNoteDesc = popupBox.querySelector('.popup-details textarea'),
addButton = popupBox.querySelector('.popup-details button')


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
        console.log('ok');
    }
    
})