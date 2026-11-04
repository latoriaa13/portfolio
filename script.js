const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const projectDetail = document.querySelector('#project-detail');

if (projectDetail) {
  const projectOrder = ['foxwatch', 'donorex', 'light-the-hoan', 'lescribe', 'single-cycle-processor', 'benmed', 'qual-v', 'digital-robot', 'vex-robotics'];

  const loadProject = async () => {
    const requestedProject = window.location.hash.slice(1) || projectOrder[0];
    const projectIndex = Math.max(0, projectOrder.indexOf(requestedProject));

    try {
      const response = await fetch('index.html');
      const page = new DOMParser().parseFromString(await response.text(), 'text/html');
      const projects = page.querySelectorAll('.project-source .project-entry');
      const selectedProject = projects[projectIndex] || projects[0];
      const project = selectedProject.cloneNode(true);

      project.classList.remove('reveal');
      project.classList.add('visible', 'project-detail-entry');
      projectDetail.replaceChildren(project);
      document.title = `${project.querySelector('h2').textContent} | Ava Latoria`;
    } catch (error) {
      projectDetail.innerHTML = '<p class="project-loading">This project could not be loaded. <a href="index.html#projects">Return to all projects.</a></p>';
    }
  };

  window.addEventListener('hashchange', loadProject);
  loadProject();
}
