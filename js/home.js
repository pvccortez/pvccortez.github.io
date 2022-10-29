import { displayFixedNavbar, toggleDropdownMenu, checkDocumentWidth, dropdownLinksScroll, setupLinks } from './navbar.js'
import { displayProject } from './../js/projects.js';
import { showResumeOverlay } from './resume.js';





window.addEventListener('DOMContentLoaded', () =>
{
	/********** Navigation Bar Functions **********/
	setupLinks();
	displayFixedNavbar();
	toggleDropdownMenu();
	checkDocumentWidth();
	dropdownLinksScroll();

	/********** Project Section Function(s) **********/
	displayProject();

	/********** Resume Section Function(s) **********/
	showResumeOverlay();
});


