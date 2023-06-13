

document.addEventListener('DOMContentLoaded', ()=>{


    const navbar = document.querySelector('.navbar');

    const initialPaddingTop = 70;
    const finalPaddingTop = 0;
    const scrollThreshold = 400;


    const updateNavbar = () => {
        const scrollTop = window.scrollY;
        const progress = Math.min(scrollTop / scrollThreshold, 1);

        const currentPaddingTop = initialPaddingTop - progress * (initialPaddingTop - finalPaddingTop);

        navbar.style.paddingTop = `${currentPaddingTop}px`;

        // Calculate the current opacity using linear interpolation
        const currentOpacity = progress;
        const backgroundColor = `rgba(191, 200, 182, ${currentOpacity})`;

        navbar.style.backgroundColor = backgroundColor;
    };

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();


    const doorGallery = document.querySelector('.doorGallery');

    const doors = doorGallery.querySelectorAll('.door')

    var doorIndex = 0
    var maxIndex = doors.length
    
    console.log(maxIndex);
    console.log(doors);

    function openTheDoor(index) {
        doors[index].classList.add('active')
        console.log(doors[index]);
    }

    openTheDoor(doorIndex)

})