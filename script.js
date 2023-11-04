fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const clientIp = data.ip;
        localStorage.setItem('ip',clientIp)
        ip.innerText = clientIp
    })
    .catch(error => {
        console.error(error);
    });


getStartedButton.addEventListener('click', () => {
    window.location.href = "details.html"
})

