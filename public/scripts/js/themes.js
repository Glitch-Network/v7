
function updateStyles(config) {
    if (config.backgroundColorMain) {
        document.documentElement.style.setProperty('--background-color-main', config.backgroundColorMain);
    }
    if (config.backgroundColorToolbar) {
        document.documentElement.style.setProperty('--background-color-toolbar', config.backgroundColorToolbar);
    }
    if (config.textColor) {
        document.documentElement.style.setProperty('--text-color', config.textColor);
    }
    if (config.gradientBackground) {
        document.body.style.background = config.gradientBackground;
    }

    const toolbar = document.querySelector('#toolbar');
    if (config.toolbarBorderColor) {
        toolbar.style.borderColor = config.toolbarBorderColor;
    }

    const navLinks = document.querySelectorAll('#nav-links h3');
    navLinks.forEach(link => {
        if (config.navLinkHoverShadow) {
            link.addEventListener('mouseover', () => {
                link.style.boxShadow = config.navLinkHoverShadow;
            });
            link.addEventListener('mouseout', () => {
                link.style.boxShadow = 'none';
            });
        }
    });

    const buttons = document.querySelectorAll('.main_button');
    buttons.forEach(button => {
        if (config.buttonBackgroundColor) {
            button.style.backgroundColor = config.buttonBackgroundColor;
        }
        if (config.buttonHoverColor) {
            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = config.buttonHoverColor;
            });
            button.addEventListener('mouseout', () => {
                button.style.backgroundColor = config.buttonBackgroundColor;
            });
        }
    });
    const tabs = document.querySelector('#tabs');
    if (tabs) {
        if (config.backgroundColorToolbar) {
            tabs.style.backgroundColor = config.backgroundColorToolbar;
        }
        if (config.toolbarBorderColor) {
            tabs.style.borderBottom = `3px solid ${config.toolbarBorderColor}`;
        }
        if (config.navLinkHoverShadow) {
            tabs.style.boxShadow = config.navLinkHoverShadow;
        }
    }

    const tabElements = document.querySelectorAll('.tab');
    tabElements.forEach(tab => {
        if (config.buttonBackgroundColor) {
            tab.style.backgroundColor = config.buttonBackgroundColor;
        } else if (config.backgroundColorToolbar) {
            tab.style.backgroundColor = config.backgroundColorToolbar;
        }

        if (config.textColor) {
            tab.style.color = config.textColor;
        }

        if (config.buttonHoverColor) {
            tab.addEventListener('mouseover', () => {
                tab.style.backgroundColor = config.buttonHoverColor;
                tab.style.color = '#ffffff'; 
            });
            tab.addEventListener('mouseout', () => {
                tab.style.backgroundColor = config.buttonBackgroundColor || config.backgroundColorToolbar;
                tab.style.color = config.textColor;
            });
        }

        const closeBtn = tab.querySelector('p.close');
        if (closeBtn && config.textColor) {
            closeBtn.style.color = config.textColor;
        }
    });

    const createTabs = document.querySelectorAll('#create_tab, .create_tab');
    createTabs.forEach(createTab => {
        if (config.buttonBackgroundColor) {
            createTab.style.backgroundColor = config.buttonBackgroundColor;
        } else if (config.backgroundColorToolbar) {
            createTab.style.backgroundColor = config.backgroundColorToolbar;
        }

        if (config.textColor) {
            createTab.style.color = config.textColor;
        }

        if (config.buttonHoverColor) {
            createTab.addEventListener('mouseover', () => {
                createTab.style.backgroundColor = config.buttonHoverColor;
                createTab.style.color = '#ffffff';
            });
            createTab.addEventListener('mouseout', () => {
                createTab.style.backgroundColor = config.buttonBackgroundColor || config.backgroundColorToolbar;
                createTab.style.color = config.textColor;
            });
        }
    });
}


const themes = {
    // Mocha Theme
    Mocha: {
      background: '#F3E5AB',
      toolbar: '#CD853F',
      text: '#4B2E83',
      gradient: 'linear-gradient(to bottom, #A0522D, #F3E5AB)',
      border: '#A0522D',
      button: '#D2691E',
    },
  
    // Ocean Breeze Theme
    OceanBreeze: {
      background: '#A0D9FF',
      toolbar: '#0082BA',
      text: '#FFFFFF',
      gradient: 'linear-gradient(to bottom, #004D73, #A0D9FF)',
      border: '#003850',
      button: '#007BA7',
    },
  
    // Neon Night Theme
    NeonNight: {
      background: '#000000',
      toolbar: '#343434',
      text: '#00FF00',
      gradient: 'linear-gradient(to bottom, #0D0D0D, #2E2E2E)',
      border: '#00FF00',
      button: '#00FF00',
    },
  
    // Vintage Rose Theme
    VintageRose: {
      background: '#F9E4E4',
      toolbar: '#BF8181',
      text: '#6D3F3F',
      gradient: 'linear-gradient(to bottom, #D0A6A6, #F9E4E4)',
      border: '#B94D6C',
      button: '#B94D6C',
    },
  
    // Forest Green Theme
    ForestGreen: {
      background: '#E8F5E9',
      toolbar: '#388E3C',
      text: '#1B5E20',
      gradient: 'linear-gradient(to bottom, #2E7D32, #E8F5E9)',
      border: '#1B5E20',
      button: '#1B5E20',
    },
  
    // Twilight Purple Theme
    TwilightPurple: {
      background: '#EDE7F6',
      toolbar: '#7B1FA2',
      text: '#AB47BC',
      gradient: 'linear-gradient(to bottom, #6A1B9A, #EDE7F6)',
      border: '#AB47BC',
      button: '#AB47BC',
    },
  
    // Sandy Beach Theme
    SandyBeach: {
      background: '#FFF3E0',
      toolbar: '#FF8A65',
      text: '#BF360C',
      gradient: 'linear-gradient(to bottom, #FFAB91, #FFF3E0)',
      border: '#BF360C',
      button: '#BF360C',
    },
  
    // Arctic Chill Theme
    ArcticChill: {
      background: '#E1F5FE',
      toolbar: '#039BE5',
      text: '#0277BD',
      gradient: 'linear-gradient(to bottom, #0288D1, #E1F5FE)',
      border: '#0277BD',
      button: '#0277BD',
    },
  
    // Sunset Orange Theme
    SunsetOrange: {
      background: '#FFEBEE',
      toolbar: '#FF5722',
      text: '#BF360C',
      gradient: 'linear-gradient(to bottom, #FF7043, #FFEBEE)',
      border: '#BF360C',
      button: '#BF360C',
    },
  
    // Midnight Blue Theme
    MidnightBlue: {
      background: '#001F3F',
      toolbar: '#004B95',
      text: '#E0E0E0',
      gradient: 'linear-gradient(to bottom, #003366, #001F3F)',
      border: '#003366',
      button: '#003366',
    },
  };
  

if (localStorage.getItem("theme") != null && localStorage.getItem("theme") != "nul" && window.location.href.includes("launch.html") == false) {
    updateStyles(themes[localStorage.getItem("theme")]);
}

console.log("themes.js loaded ig current theme " + localStorage.getItem("theme"))