

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
    const doors = doorGallery.querySelectorAll('.door');
    const indicator = document.querySelector('.door_indicator');

    var doorIndex = 0
    var maxIndex = doors.length - 1

    doors.forEach((item, i)=>{
        var div = document.createElement('div');
        div.classList.add('item')
        indicator.append(div)
      })

      const indicators = document.querySelectorAll('.door_indicator .item');
      indicators.forEach((item, i)=>{
        item.addEventListener('click', ()=>{
            goToIndex(i)
        })
      })

    function openTheDoor(e) {
        e.classList.add('active');
    }
    function closeTheDoor(e) {
        e.classList.remove('active')
    }

    function nextIndex(){
        goToIndex(++doorIndex)
    }


    function goToIndex(index){
        if(index > maxIndex){
            goToIndex(0)
        } else if(index < 0){
            goToIndex(maxIndex)
        } else {
            doors.forEach(door=>{
                closeTheDoor(door)
            })
            indicators.forEach(item=>{
                item.classList.remove('active')
            })

            doorIndex = index
            openTheDoor(doors[index])
            indicators[index].classList.add('active')


            stopTimer()
            startTimer()
        }
    }


    var timer;
  
    function startTimer(){
      timer = setInterval(()=>{
        nextIndex()
      }, 3000)
    }
    function stopTimer(){
      clearInterval(timer)
    }

    goToIndex(doorIndex)


    class ActivateInView {
        constructor(element) {
            this.element = element;
            this.init();
        }
    
        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.onInView(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
    
            observer.observe(this.element);
        }
    
        onInView(element) {
            element.classList.add('active');
        }
    }
    

    
    var fromRightToLeft_s = document.querySelectorAll('.fromRightToLeft')

    fromRightToLeft_s.forEach(item=>{
        new ActivateInView(item)
    })
    
    var fromLeftToRight_s = document.querySelectorAll('.fromLeftToRight')
    
    
    fromLeftToRight_s.forEach(item=>{
        new ActivateInView(item)
    })
    
    var fromDownToTop_s = document.querySelectorAll('.fromDownToTop')
    
    fromDownToTop_s.forEach(item=>{
        new ActivateInView(item)
    })

})