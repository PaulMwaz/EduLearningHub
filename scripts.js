document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = button.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.download-button').forEach(button => {
        button.addEventListener('click', async () => {
            const subject = button.getAttribute('data-subject');
            try {
                const response = await fetch('http://localhost:3000/exams');
                const exams = await response.json();
                const filteredExams = exams.filter(exam => exam.subject === subject);
                if (filteredExams.length > 0) {
                    alert(`Downloading exams for ${subject}`);
                } else {
                    alert(`No exams found for ${subject}`);
                }
            } catch (error) {
                console.error('Error fetching exams:', error);
            }
        });
    });

    document.querySelectorAll('.download-ebook').forEach(button => {
        button.addEventListener('click', async () => {
            const title = button.getAttribute('data-title');
            try {
                const response = await fetch('http://localhost:3000/ebooks');
                const ebooks = await response.json();
                const filteredEbooks = ebooks.filter(ebook => ebook.title === title);
                if (filteredEbooks.length > 0) {
                    alert(`Downloading ebook: ${title}`);
                } else {
                    alert(`No ebook found with title: ${title}`);
                }
            } catch (error) {
                console.error('Error fetching ebooks:', error);
            }
        });
    });

    async function fetchEvents() {
        try {
            const response = await fetch('http://localhost:3000/events');
            const events = await response.json();
            const eventsSection = document.getElementById('events');
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.innerHTML = `
                    <p><strong>${event.name}</strong> - ${event.description}</p>
                    <p>Venue: ${event.venue}</p>
                    <p>Date: ${event.date}</p>
                `;
                eventsSection.appendChild(eventElement);
            });
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    fetchEvents();
});
