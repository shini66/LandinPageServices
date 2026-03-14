let testimonials = []
let currentIndex = 0
const testimonialContainer = document.getElementById('testimonialContainer')
const prevBtn = document.getElementById('prevTestimonial')
const nextBtn = document.getElementById('nextTestimonial')

function getItemsPreView(){
    return window.innerWidth < 768 ? 1 : 3
}

function renderTestimonials() {
    const itemsPreView = getItemsPreView();

    testimonialContainer.innerHTML = "";

    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPreView);

    visibleTestimonials.forEach(testimonial => {

        if(testimonial.photo && testimonial.photo !== ''){
            avatar = `<img src="${testimonial.photo}" alt="${testimonial.name}" class="w-16 h-16 rounded-full object-cover">`;
        }else{
            avatar = generateAvatar(testimonial.name);
        }
            

        const card = `
            <div class="bg-white p-6 rounded shadow-lg text-center flex flex-col items-center">
                ${avatar}
                <p class="font-bold mt-2">"${testimonial.name}"</p>
                <p class="text-center italic mt-4">- ${testimonial.message}</p>
            </div>
        `;

        testimonialContainer.innerHTML += card;
    });
}

nextBtn.addEventListener('click', () => {
    const itemsPreView = getItemsPreView();
    if (currentIndex + itemsPreView < testimonials.length) {
        currentIndex += itemsPreView;
    }else{
        currentIndex = 0;
    }
    renderTestimonials()
});

prevBtn.addEventListener('click', () => {
    const itemsPreView = getItemsPreView();
    if (currentIndex - itemsPreView >= 0) {
        currentIndex -= itemsPreView;
    }else{
        currentIndex = testimonials.length - itemsPreView;
    }
    renderTestimonials()
});

window.addEventListener('resize', renderTestimonials)

async function fetchTestimonials() {
    const response = await fetch('/src/data/testimonials.json')
    testimonials = await response.json()
    renderTestimonials()
}

function generateAvatar(name) {
    const initials = name.charAt(0).toUpperCase();
    const color = getAvatarColor(name);
    return `<div class="w-16 h-16 rounded-full ${color} flex items-center justify-center text-white font-bold">${initials}</div>`;
}

function getAvatarColor(name) {
    const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
}