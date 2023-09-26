const fontSizes = document.querySelectorAll('.choose-size span')
const root = document.querySelector(':root')
const colorPalette = document.querySelectorAll('.choose-color span')
const backgroundColor = document.querySelectorAll('.choose-bg > div')


// remove active class from all 
const changeActiveFont = ()=>{
    fontSizes.forEach(item=>{
        item.classList.remove('active')
    })
}
// remove active class from all 
const changeActiveColor = ()=>{
    colorPalette.forEach(item=>{
        item.classList.remove('active')
    })
}
// remove active class from all 
const changeActiveBgColor = ()=>{
    backgroundColor.forEach(item=>{
        item.classList.remove('active')
    })
}


// on load
window.addEventListener('load', ()=>{
    const color  = JSON.parse(localStorage.getItem('primary-color'))
    const bg = JSON.parse(localStorage.getItem('bg-lightness'))
    const font = JSON.parse(localStorage.getItem('font'))



    if (color) {
        root.style.setProperty('--primary-color-hue', color.state)
        changeActiveColor()
        colorPalette.forEach(c=>{
            if(c.classList.contains(color.activeClass)){
                c.classList.add('active')
            }
        })
    }
    if(bg){
        root.style.setProperty('--dark-color-lightness', bg.darkColorLigthness)
        root.style.setProperty('--light-color-lightness', bg.lightColorLigthness)
        root.style.setProperty('--white-color-lightness', bg.whiteColorLigthness)
        changeActiveBgColor()
        backgroundColor.forEach(b=>{
            if(b.classList.contains(bg.activeClass)){
                b.classList.add('active')
            }
        })
    }
    if(font){
        root.style.setProperty('----sticky-top-left', font.stickyLeft) 
        root.style.setProperty('----sticky-top-right', font.stickyRight)
        document.querySelector('html').style.fontSize = font.fontsize
        changeActiveFont()
        fontSizes.forEach(fz=>{
          
            if(fz.classList.contains(font.activeClass)){
                fz.classList.add('active')
            }
        })
    }
})














// show nav
const gear = document.querySelector('.gear')
const sidebar = document.querySelector('.sidebar')

gear.addEventListener('click', ()=>{
    sidebar.classList.toggle('show')
})

// nav input
const searchBtnIcon = document.querySelector('.search-bar .uil');
const searchForm = document.querySelector('.search-bar');


searchBtnIcon.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('uil-search', 'uil-x');
        } else {
            searchBtnIcon.classList.replace('uil-x', 'uil-search');
        }
    }else  if (window.innerWidth > 576) {
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('uil-search', 'uil-x');
        } else {
            searchBtnIcon.classList.replace('uil-x', 'uil-search');
        }
    }
});


window.addEventListener('resize', () => {
    if (window.innerWidth > 576) {
        sidebar.classList.remove('show');
        searchBtnIcon.classList.replace('uil-x', 'uil-search');
        searchForm.classList.remove('show');
    }
});




// messages 
const messagesNotification = document.querySelector('#message-notifications')
const messagesBox= document.querySelector('.messages')

messagesNotification.addEventListener('click', ()=>{
    messagesBox.style.boxShadow = '0 0 1rem var(--color-primary)'

    messagesNotification.querySelector('.notification-count').style.display = 'none'

    setTimeout(()=>{
        messagesBox.style.boxShadow = 'none'
    }, 2000)
})





// message search
const messages = document.querySelector('.messages')
const message = messages.querySelectorAll('.message')
const messageSearch = document.querySelector('#message-search')

const searchMessge = ()=>{
    const val = messageSearch.value.toLowerCase()
  

    message.forEach(chat =>{
       let name = chat.querySelector('h5').textContent.toLowerCase() 

       if (name.indexOf(val) != -1) {
         chat.style.display = 'flex'
       }else{
        chat.style.display = 'none'
       }
    })
}

messageSearch.addEventListener('keyup', searchMessge)





// sidebar
const menuItems = document.querySelectorAll('.menu-item')


// remove active class from all menu items
const changeActiveItem = ()=>{
    menuItems.forEach(item=>{
        item.classList.remove('active')
    })
}

menuItems.forEach(item=> {
    item.addEventListener('click', ()=>{
        changeActiveItem()

        item.classList.add('active')
        if (item.id != 'notifications') {
            document.querySelector('.notification-popup').
            style.display = 'none'
        }else{
         document.querySelector('.notification-popup').style.display = 'block'

         document.querySelector('#notifications .notification-count').style.display = 'none'


        }
    })
})




// theme
const theme = document.getElementById('theme')
const themeModal = document.querySelector('.customize-theme')


theme.onclick = ()=>{
    themeModal.style.display = 'grid'
}

themeModal.addEventListener('click',(e)=>{
    if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none'  
    }
})








// font
fontSizes.forEach(fz =>{
    let font = {
        fontsize : '', stickyLeft: '', stickyRight: '', activeClass: ''
    }

    fz.addEventListener('click', ()=>{
        changeActiveFont()
     
        font = {...font, activeClass : fz.classList.value}
       
        fz.classList.add('active')
        if (fz.classList.contains('font-size-1')) {
            font = {
              ...font,  fontsize : '10px', stickyLeft: '5.4rem', stickyRight: '5.4rem'
            }
        }else if (fz.classList.contains('font-size-2')) {
            font = {
              ...font,  fontsize : '13px', stickyLeft: '5.4rem', stickyRight: '-7rem'
            }
        }else if (fz.classList.contains('font-size-3')) {
            font = {
              ...font,  fontsize : '16px', stickyLeft: '-2rem', stickyRight: '-17rem'
            }
        }else if (fz.classList.contains('font-size-4')) {
            font = {
               ...font, fontsize : '19px', stickyLeft: '-5rem', stickyRight: '-25rem'
            }
        }else if (fz.classList.contains('font-size-5')) {
            font = {
              ...font,  fontsize : '22px', stickyLeft: '-12rem', stickyRight: '-35rem'
            }
        }

        root.style.setProperty('----sticky-top-left', font.stickyLeft)  //css (:root selector)
        root.style.setProperty('----sticky-top-right', font.stickyRight)
        document.querySelector('html').style.fontSize = font.fontsize
        console.log(font)
        localStorage.setItem('font', JSON.stringify(font))
    })


})


// colorPalette

colorPalette.forEach(color =>{
        let primarycolor = {
            state : '',  activeClass: ''
        }
    color.addEventListener('click', ()=>{ 
        changeActiveColor()
        primarycolor = {...primarycolor, activeClass : color.classList.value}
        color.classList.add('active')


        if (color.classList.contains('color-1')) {
            primarycolor = {...primarycolor,  state : '252'} 
        }else if (color.classList.contains('color-2')) {
            primarycolor = {...primarycolor,  state : '52'} 
        }else if (color.classList.contains('color-3')) {
            primarycolor = {...primarycolor,  state : '352'} 
        }else if (color.classList.contains('color-4')) {
            primarycolor = {...primarycolor,  state : '152'} 
        }else if (color.classList.contains('color-5')) {
            primarycolor = {...primarycolor,  state : '202'} 
        }
        
        root.style.setProperty('--primary-color-hue', primarycolor.state)
        localStorage.setItem('primary-color', JSON.stringify(primarycolor))
    })

})


// backgroundColor

backgroundColor.forEach(bg =>{
    let lightness = {
        activeClass: '', lightColorLigthness: '', darkColorLigthness: '', whiteColorLigthness: '',
    }
    bg.addEventListener('click', ()=>{ 
        changeActiveBgColor()
        lightness = {...lightness, activeClass : bg.classList.value}

        bg.classList.add('active')


        if (bg.classList.contains('bg-1')) {
            lightness =  {...lightness, lightColorLigthness: '95%', darkColorLigthness: '17%', whiteColorLigthness: '100%',}
        }else if (bg.classList.contains('bg-2')) {
            lightness =  {...lightness, lightColorLigthness: '15%', darkColorLigthness: '95%', whiteColorLigthness: '20%',}
        }else if (bg.classList.contains('bg-3')) {
            lightness =  {...lightness, lightColorLigthness: '0%', darkColorLigthness: '95%', whiteColorLigthness: '10%',}
        }
        root.style.setProperty('--dark-color-lightness', lightness.darkColorLigthness)
        root.style.setProperty('--light-color-lightness', lightness.lightColorLigthness)
        root.style.setProperty('--white-color-lightness', lightness.whiteColorLigthness)
      
        localStorage.setItem('bg-lightness', JSON.stringify(lightness))


    })

})