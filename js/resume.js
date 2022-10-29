const resumeCenter = document.querySelector('.resume-center');
const resumeOverlay = document.querySelector('.resume-overlay');


export function showResumeOverlay()
{
    resumeCenter.addEventListener('mouseenter', () =>
    {
        resumeOverlay.classList.add('show-resume');
    });

    resumeCenter.addEventListener('mouseleave', () =>
    {
        resumeOverlay.classList.remove('show-resume');
    });
}