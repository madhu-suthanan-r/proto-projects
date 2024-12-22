const sections = [
  {
    title: "Section 1",
    content: "Content for secction 1",
  },
  {
    title: "Section 2",
    content: "Content for section 2",
  },
  {
    title: "Sectoin 3",
    content: "Content for section 3",
  },
];

document.addEventListener('DOMContentLoaded', () => {
    const accordionContainer = document.querySelector("#accordion");

    sections.forEach((section, index) => {
        const sectionItem = document.createElement('div');
        sectionItem.classList.add('accordion-item');

        const sectionHeader = document.createElement('div');
        sectionHeader.classList.add('accordion-header');
        sectionHeader.textContent = section.title;

        const sectionContent = document.createElement('div');
        sectionContent.classList.add('accordion-content');
        sectionContent.innerHTML = `<p>${section.content}</p>`;

        sectionItem.appendChild(sectionHeader);
        sectionItem.appendChild(sectionContent);
        accordionContainer.appendChild(sectionItem);

        if(index===0){
            sectionItem.classList.add('active');
            sectionContent.style.display = 'block';
        }

    });

    accordionContainer.addEventListener('click', function(event) {
        
        const sectionHeader = event.target.closest('.accordion-header');
        if(!sectionHeader) return;

        const sectionItem = event.target.closest('.accordion-item');
        if(!sectionItem) return;

        const sectionItems = document.querySelectorAll('.accordion-item');
        const sectionContents = document.querySelectorAll('.accordion-content');

        // contins
        if(sectionItem.classList.contains('active')){
            sectionItem.classList.remove('active');
            sectionItem.querySelector('.accordion-content').style.display = 'none';
            return;
        }

        sectionItems.forEach((item) => item.classList.remove('active'));
        sectionContents.forEach((content) => content.style.display = 'none');

        sectionItem.classList.add('active');
        sectionItem.querySelector('.accordion-content').style.display = 'block';


    })
})
