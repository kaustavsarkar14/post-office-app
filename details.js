const IP = localStorage.getItem('ip')
const lat = document.getElementById('lat')
const lng = document.getElementById('lng')
const city = document.getElementById('city')
const region = document.getElementById('region')
const organisation = document.getElementById('organisation')
const hostname = document.getElementById('hostname')
const map = document.getElementById('map')
const timeZone = document.getElementById('timeZone')
const pincode = document.getElementById('pincode')
const message = document.getElementById('message')
const postOfficeContainer = document.getElementById('postOfficeContainer')

let postOfficeData = null
let filterData = null

async function getDetailsFromIP() {
    const res = await fetch(`https://ipapi.co/${IP}/json/`)
    const data = await res.json()
    ip.innerText = IP
    lat.innerText = data.latitude
    lng.innerText = data.longitude
    city.innerText = data.city
    region.innerText = data.region
    organisation.innerText = data.org
    hostname.innerText = data.version
    map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${data.latitude}, ${data.longitude}&z=15&output=embed" width="100%" height="100%" frameborder="0" style="border:0"></iframe>
    `
    timeZone.innerText = data.timezone
    dateTime.innerText = new Date().toLocaleString("en-US", { timeZone: data.timezone })
    pincode.innerText = data.postal

    getPostalDetails(data.postal)

}
getDetailsFromIP()

async function getPostalDetails(pincode) {
    const res = await fetch(` https://api.postalpincode.in/pincode/${pincode}`)
    const data = await res.json()
    message.innerText = data[0].Message

     postOfficeData = data[0].PostOffice
    filterData = [...postOfficeData]
    renderPostOfficeCards()


}

searchInput.addEventListener('input', (e) => {
    filterData = postOfficeData.filter(el => el.Name.toLowerCase().includes(e.target.value) || el.BranchType.toLowerCase().includes(e.target.value) )
    renderPostOfficeCards()
})

function renderPostOfficeCards() {
    postOfficeContainer.innerHTML = ''
    filterData.map(postOffice => {
        const postOfficeCard = document.createElement('div')
        postOfficeCard.className = 'postOfficeCard'
        postOfficeCard.innerHTML = `
            <h3>Name : <span>${postOffice.Name}</span></h3>
            <h3>BranchType : <span>${postOffice.BranchType}</span></h3>
            <h3>DeliveryStatus : <span>${postOffice.DeliveryStatus}</span></h3>
            <h3>District : <span>${postOffice.District}</span></h3>
            <h3>Division : <span>${postOffice.Division}</span></h3>
        `
        postOfficeContainer.appendChild(postOfficeCard)
    })
}

