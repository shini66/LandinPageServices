const phone = "+595984732556";


function sendWhatsapp(message) {

    const encodeMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodeMessage}`;
    window.open(url, '_blank');

}