/* Desenvolva sua lógica aqui ... */

export const handleDarkMode = () => {
    const darkModeButton = document.querySelector(".btn-controller");
    const html = document.querySelector("html");
    const theme = localStorage.getItem('darkmode'); 

    const imgDark = document.querySelector('.img-darkmode')
    let sol = "https://media.graphassets.com/BgTFGDVvRdymZmzAgg9t";
    let lua = "https://media.graphassets.com/AWCWFFLPSEWh4lhYs68c";

    if(theme === 'true'){
        imgDark.setAttribute("src", sol);
        html.classList.add('dark-mode')
    } else if (theme === 'false'){
        imgDark.setAttribute("src", lua);
        html.classList.remove('dark-mode')
    }

    darkModeButton.addEventListener('click', () => {
        html.classList.toggle('dark-mode');

        if(html.classList.contains('dark-mode')) {
            imgDark.setAttribute("src", sol);
            localStorage.setItem('darkmode', true);
        } else {
            imgDark.setAttribute("src", lua);
            localStorage.setItem('darkmode', false);
        }
        
    })
  }

    