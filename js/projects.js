import { projectsData } from './../src/data.js'

const projectCenter = document.querySelector('.projects-center');




export function displayProject()
{
	projectCenter.innerHTML = projectsData.map(project =>
		{
			return `
								<div class="project-container ${project.styleType}-container" id="${project.id}">

									<div class="project-info-center">
										<span class="project-title">${project.title}</span>
										<span class="img-span">
											<img src="${project.img}" alt="" class="project-img">
										</span>
										
										<ul class="icon-list">
											${getIconStr(project.languages)}
										</ul>
									</div>

									<div class="project-overlay">
										<p class='project-desc'>${project.desc}</p>

										<div class="overlay-btn-container">
											<button >
												<a href="${project.link}" class="project-btn">
													<i class="fa-brands fa-github"></i>
												</a>
											</button>

											<button>
												<a href="#" class="project-btn">
													<i class="fa-solid fa-code"></i>
												</a>
											</button>
										</div>
									</div>
								</div>`;
		}).join("");

		setProjectOverlay();
}


function getIconStr(list)
{
	return list.map(name =>
		{
			return `<li>
								<img class="icon-img" src="./../images/icon_${name}.png" alt="">
								<span>${name}</span>
							</li>`
		}).join("");
}


function setProjectOverlay()
{
	const projects = [...	document.querySelectorAll('.project-container')];

	projects.forEach(project =>
		{
			const overlay = project.querySelector('.project-overlay');
			
			project.addEventListener('mouseenter', (e) =>
			{
				overlay.classList.add('show-project-overlay');
			});

			project.addEventListener('mouseleave', () =>
			{
				overlay.classList.remove('show-project-overlay');
			});
		});
}