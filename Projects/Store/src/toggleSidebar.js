const closeBtn = document.querySelector('.sidebar-close-btn');
const openBtn = document.querySelector('.toggle-btn');
const sidebarOverlay = document.querySelector('.sidebar-overlay');

export function toggleSidebar()
{
    closeBtn.addEventListener('click',() =>
    {
        sidebarOverlay.classList.remove('show-sidebar');
    });

    openBtn.addEventListener('click', ()=>
    {
        sidebarOverlay.classList.add('show-sidebar');
    });
}