// Carousel functionality (optional for image sliding effect)
const carousel = document.querySelector('.carousel');
let index = 0;

setInterval(() => {
    index++;
    const offset = index * 100;
    carousel.style.transform = `translateX(-${offset}%)`;

    if (index === carousel.childElementCount) {
        index = 0;
    }
}, 3000);

// Handle reservation form submission
document.getElementById('reservationForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const partySize = document.getElementById('party-size').value;

    const reservationData = { name, date, time, partySize };

    try {
        const response = await fetch('http://localhost:3000/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        const result = await response.json();
        document.getElementById('reservationMessage').textContent = result.message;
        document.getElementById('reservationMessage').classList.remove('error');
    } catch (error) {
        console.error('Error submitting reservation:', error);
        document.getElementById('reservationMessage').textContent = 'Failed to book reservation. Please try again later.';
        document.getElementById('reservationMessage').classList.add('error');
    }
});
