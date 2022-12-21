export const linksContainers = ['.nav-links', '.dropdown-links'];

export const linksData = [{name: 'Home', id: '#home'}, 
               {name: 'Projects', id: '#projects-section'},
               {name: 'About', id: '#about-section'},
               {name: 'Resume', id: '#resume-section'},
               {name: 'Contact', id: '#contact-section'}];


export const projectsData = [{title: 'Furniture Store', id: 'furniture-store', 
                              desc: `An online furniture store that uses an API to obtain
                                     product data. Contains a functioning shopping cart, 
                                     single "product" page, that are dynamically populated. Also contains a 
                                     products a page that contains all the products, where users can filter 
                                     based on name, company, or price.`, 
                              languages: ['Javascript', 'HTML', 'CSS'], 
                              img: './../images/Store_Homepage.png', styleType: 'odd', 
                              link: './Projects/Store/home.html',
                              githubLink: 'https://github.com/pvccortez/FurnitureStore'},
                            
                             {title: 'Art Gallery', 
                              desc: `An art gallary website to display the works held by an art
                                     collector. Art pieces are uniformaly displayed and the artist
                                     page is dynamically populated.`, 
                              languages: ['Javascript', 'HTML', 'CSS'], 
                              img: './../images/Art_Gallery_Homepage.png', styleType: 'even',
                              link: './Projects/ArtCollection/index.html',
                              githubLink: 'https://github.com/pvccortez/ArtCollection'},
                    
                             {title: 'Cocktails API', 
                              desc: `Uses "thecocktaildb" API to get information on thousands of
                                     cocktails. It allows users to search for cocktails based on
                                     their name, and view cocktail information in a dynamically
                                     populated page.`, 
                              languages: ['Javascript', 'HTML', 'CSS'], 
                              img: './../images/Cocktails_Homepage.png', styleType: 'odd',
                              link: './Projects/Cocktails/home.html',
                              githubLink: '',},

                             {title: 'Wikipedia API', 
                              desc: `Utilizes Wikipeia's API that displays users search results
                                     in a elegant grid format.`, 
                              languages: ['Javascript', 'HTML', 'CSS'], 
                              img: './../images/Wikipedia_Homepage.png', styleType: 'even',
                              link: './Projects/Wikipedia/index.html',
                              githubLink: ''},  
                            ];
