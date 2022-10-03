
const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.pop-box'),
closeIcon = popupBox.querySelector('.popup-header i')


addBox.addEventListener('click',()=>{
    popupBox.classList.add('show');
})

closeIcon.addEventListener('click',()=>{
    popupBox.classList.remove('show');
})