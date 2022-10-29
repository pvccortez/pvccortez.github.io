
import { linksContainers ,linksData } from './../src/data.js';

const navbar = document.querySelector('.navbar');
const navToggleBtn = document.querySelector('.nav-btn');
const navDropdown = document.querySelector('.navbar-dropdown');
const scrollBtn =  document.querySelector('.home-scroll-btn');
let dropdownClosed = true;


export function displayFixedNavbar()
{
	const navHeight = navbar.offsetHeight;
	

	window.addEventListener('scroll', e =>
	{
		const yPosition = window.scrollY;

		if(yPosition > navHeight)
		{
				navbar.classList.add('fixed-navbar');
				return;
		}

		else if(navbar.classList.contains('fixed-navbar'))
		{
				navbar.classList.remove('fixed-navbar');
				dropdownClosed = true;
		}
	});
}


export function toggleDropdownMenu()
{
	const navHeight = navbar.offsetHeight;

  navToggleBtn.addEventListener('click', () =>
	{
		if(dropdownClosed)
		{
			dropdownClosed = false;
			navDropdown.classList.add('show-dropdown');
			navbar.classList.add('fixed-navbar')
		}

		else
		{
			dropdownClosed = true;
			navDropdown.classList.remove('show-dropdown');
			
			const yPosition = window.scrollY;

			if(yPosition < navHeight)
			{
				navbar.classList.remove('fixed-navbar');
			}
		}
	});
}


export function checkDocumentWidth()
{
  let windowWidth = window.innerWidth;

	if(windowWidth >= 450)
	{
		navDropdown.classList.remove('show-dropdown');
	}

	else if(navDropdown.classList.contains('show-dropdown'))
	{
		navDropdown.classList.remove('show-dropdown');
	}

	window.addEventListener('resize', () =>
	{
		if(windowWidth >= 450)
		{
			navDropdown.classList.remove('show-dropdown');
		}

		else if(navDropdown.classList.contains('show-dropdown'))
		{
			navDropdown.classList.remove('show-dropdown');
		}
	});
}


export function dropdownLinksScroll()
{
	const navLinks = [...document.querySelectorAll('.nav-links a')];
	const dropdownLinks = [...document.querySelectorAll('.dropdown-links a')];

	addScrollFunction(navLinks);
	addScrollFunction(dropdownLinks);
	setHomeScrollBtn();
}


export function addScrollFunction(links)
{

	const navHeight = navbar.offsetHeight;

	links.forEach(link =>
		{
			link.addEventListener('click', (e) =>
			{
				e.preventDefault();
				navDropdown.classList.remove('show-dropdown');

				const section = document.querySelector(link.getAttribute('href'));
				const sectionCordn = section.getBoundingClientRect();
				const windowY = window.scrollY;			

				window.scrollTo({top: sectionCordn.top + windowY - navHeight, left: 0, behavior: 'smooth'});
			});
		});
}


export function setupLinks()
{
	linksContainers.forEach(element =>
		{
			const container = document.querySelector(element);

			container.innerHTML = linksData.map(link =>
				{
					return `<li><a href="${link.id}">${link.name}</a></li>`
				}).join("");
		})
}


function setHomeScrollBtn()
{
	scrollBtn.addEventListener('click', (e) =>
	{
		e.preventDefault();
		
		const navHeight = navbar.offsetHeight;
		const section = document.querySelector(e.target.parentElement.getAttribute('href'));
		const sectionCordn = section.getBoundingClientRect();
		const windowY = window.scrollY;			

		window.scrollTo({top: sectionCordn.top + windowY - navHeight, left: 0, behavior: 'smooth'});
	});
}