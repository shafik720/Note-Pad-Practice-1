
const closeIcon = document.querySelector('.popup-header i'),
addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.pop-box')



addBox.addEventListener('click',()=>{
    popupBox.classList.add('show');
})
closeIcon.addEventListener('click',()=>{
    console.log('Closed');
})