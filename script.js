

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

    doors.forEach(item=>{
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
                closeTheDoor(item)
            })

            doorIndex = index
            openTheDoor(doors[index])
            openTheDoor(indicators[index])


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


    const windowGallery = document.querySelector('.windowGallery');
    const windows = windowGallery.querySelectorAll('.window');
    const winIndicator = document.querySelector('.window_indicator')

    var windowIndex = 0
    var windowMaxIndex = windows.length - 1

    windows.forEach(item=>{
        var div = document.createElement('div');
        div.classList.add('item')

        winIndicator.append(div)
    })

    const winIndicators = document.querySelectorAll('.window_indicator .item')

    winIndicators.forEach((item, i)=>{
        item.addEventListener('click', ()=> {
            goToWinIndex(i)
        })
    })

    function goToWinIndex(index) {
        if(index > windowMaxIndex){
            goToWinIndex(0)
        } else if(index < 0){
            goToWinIndex(windowMaxIndex)
        } else {
            windows.forEach(win=>{
                closeTheDoor(win)
            })
            winIndicators.forEach(item=>{
                closeTheDoor(item)
            })

            windowIndex = index
            openTheDoor(windows[index])
            openTheDoor(winIndicators[index])

            stopWinTimer()
            startWinTimer()

        }
    }

    function nextWinIndex(){
        goToWinIndex(++windowIndex)
    }

    var winTimer;

    function startWinTimer(){
        winTimer = setInterval(()=>{
          nextWinIndex()
        }, 3000)
      }
      function stopWinTimer(){
        clearInterval(winTimer)
      }

      goToWinIndex(windowIndex)




    const counters = document.querySelectorAll('.counter');

    const countUp = (counter, targetValue, duration) => {
        let startTime = null;
        const startValue = parseInt(counter.textContent) || 0;

        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentValue = Math.round(startValue + progress * (targetValue - startValue));
            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const duration = parseInt(counter.getAttribute('data-time'));
                const targetValue = parseInt(counter.getAttribute('data-count-upto'));

                countUp(counter, targetValue, duration);
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach((counter) => observer.observe(counter));


    const animatedText = document.querySelectorAll('.abtUs');
        animatedText.forEach(item=>{
            const textContent = item.textContent;
            item.textContent = '';

            for (let i = 0; i < textContent.length; i++) {
                const character = textContent[i];
                if (character === ' ') {
                    const spaceSpan = document.createElement('span');
                    spaceSpan.innerHTML = '&nbsp;';
                    item.appendChild(spaceSpan);
                } else {
                    const letterSpan = document.createElement('span');
                    letterSpan.textContent = character;
                    letterSpan.style.animationDelay = `${i * 0.005}s`; 
                    item.appendChild(letterSpan);
                }
            }
        })


        function removeAllChildNodes(parent) {
            while(parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }

        var sliderFrame = document.querySelector('.slideFrame');
        const slider = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slide');

        var teamSlideInfo = {
            frameWidth: 0,
            slideInFrame: 0,
            slidesCount: slides.length,
            numberOfFrame: 0,
            sliderLenght: 0,
        }

        function slideInFrame(){
            var sliderFrameWidth = sliderFrame.getBoundingClientRect().width;

            teamSlideInfo.frameWidth = sliderFrameWidth

            var slideInFrameCount;
            if(sliderFrameWidth >= 1000) {
                slideInFrameCount = 4
            } else if(sliderFrameWidth >= 700){
                slideInFrameCount = 3
            } else if(sliderFrameWidth >= 380){
                slideInFrameCount = 2
            } else {
                slideInFrameCount = 1
            }
            teamSlideInfo.slideInFrame = slideInFrameCount
            teamSlideInfo.numberOfFrame = Math.floor(slides.length / slideInFrameCount)
            
            if(slides.length % slideInFrameCount != 0){
                teamSlideInfo.numberOfFrame++
            }
            return slideInFrameCount;
        }
        function setSliderrWidth(){
            var inFrame = slideInFrame();
            
            var sliderFrameWidth = teamSlideInfo.frameWidth
            
            var slideWidth = Math.floor((sliderFrameWidth - ((inFrame - 1)*20))/inFrame)

            var sliderWidth = (slideWidth * slides.length) + (20 * (slides.length - 1))
            slider.style.width = `${sliderWidth}px`
            teamSlideInfo.sliderLenght = sliderWidth

            setSlideWidth(slideWidth)
            setTeamIndicator()
        }
        function setSlideWidth(slideWidth) {
            
            slides.forEach(item=>{
                item.style.width = `${slideWidth}px`
            })

        }
        setSliderrWidth()

        var teamIndex = 0;
        var maxTeamIndex;

        var team_indicator = document.querySelector('.team_indicator');

        function setTeamIndicator(){
            var team_indicator = document.querySelector('.team_indicator');
            removeAllChildNodes(team_indicator)
            for(var i=0; i< teamSlideInfo.numberOfFrame; i++)
            {
                var div = document.createElement('div');
                div.classList.add('item')
                team_indicator.append(div)
            }
        }


        function goToFrameIndex(index){
            var teamIndicators = team_indicator.querySelectorAll('.item')
            teamIndicators.forEach((item, i)=>{
                item.addEventListener('click', ()=>{
                    goToFrameIndex(i)
                })
            })
            if(index < 0){
                goToFrameIndex(teamSlideInfo.numberOfFrame - 1)
            } else if(index > (teamSlideInfo.numberOfFrame - 1)) {
                goToFrameIndex(0)
            } else {

                moveTheSlider(index)
                teamIndicators.forEach(item=>{
                    closeTheDoor(item)
                })


                openTheDoor(teamIndicators[index])
                teamIndex = index
                stopTeamTimer()
                startTeamTimer()
            }
        }

        goToFrameIndex(teamIndex)

        function moveTheSlider(index){
            var unitMove = teamSlideInfo.frameWidth
            var maxMove = teamSlideInfo.sliderLenght - unitMove
            
            var move = (unitMove + 20) * index;
            if(move >= maxMove) {
                move = maxMove
            }

            slider.style.transform = `translateX(-${move}px)`
        }

        function nextTeamIndex(){
            goToFrameIndex(++teamIndex)
        }
        function prevTeamIndex(){
            goToFrameIndex(--teamIndex)
        }

        var nextteamArrow = document.querySelector('.arrow.ar')
        var prevteamArrow = document.querySelector('.arrow.al')

        nextteamArrow.addEventListener('click', ()=>{
            nextTeamIndex()
        })
        prevteamArrow.addEventListener('click', ()=>{
            prevTeamIndex()
        })


        var teamTimer;

        function startTeamTimer(){
            teamTimer = setInterval(()=>{
            nextTeamIndex()
            }, 3000)
        }
        function stopTeamTimer(){
            clearInterval(teamTimer)
        }


        

        window.addEventListener('resize', ()=>{
            setSliderrWidth()
            goToFrameIndex(teamIndex)
        })


        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.links a');

        // Define the options for the Intersection Observer
        const options = {
        root: null, // Use the viewport as the root
        threshold: 0.5 // Trigger when 50% of the section is visible
        };

        // Define the callback function for the Intersection Observer
        const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            // Get the ID of the intersecting section
            const targetId = entry.target.getAttribute('id');

            // Add 'active' class to the corresponding navigation link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
                }
            });
            }
        });
        };

        // Create an Intersection Observer instance with the callback function and options
        const observerr = new IntersectionObserver(handleIntersection, options);

        // Observe each section
        sections.forEach(section => {
        observerr.observe(section);
        });

    })