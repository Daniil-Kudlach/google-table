let i =0;
while(i<1000){
    fetch('https://spreadsheets.google.com/feeds/list/1BuePN0GHsl2ig48EYF2Z9Amx6aA94tE9lYTTy-tg4dY/1/public/full?alt=json')
    .then(response=>response.json())
    .then(({feed})=>[...feed.entry].map(el=>{
        return el.content.$t.replace(/\w+\:\s*/g, '').replace(/\s/g, '').split(',')
    }))
    .then(data=>{
        data.forEach(el=>{
            let card = `<div class='card'>
            <h3>Card</h3>
                <img src="https://drive.google.com/uc?id=${el[1]}&export=download"></img>
                <span>${el[0]}</span></div>`
            document.querySelector('.container').innerHTML += card;
        })
    })
    i++;
}