    fetch('https://spreadsheets.google.com/feeds/list/1BuePN0GHsl2ig48EYF2Z9Amx6aA94tE9lYTTy-tg4dY/1/public/full?alt=json')
        .then(response => response.json())
        .then(({
            feed
        }) => [...feed.entry].map(({gsx$text,gsx$id,gsx$links}) => {
            return {text:gsx$text.$t,id:gsx$id.$t,link:gsx$links.$t}
        }))
        .then(data => {
            data = data.sort((a,b)=>{
                if(a.text > b.text){
                    return 1;
                } 
                if(a.text < b.text){
                    return -1;
                }

                return 0;
            });
            data.forEach(({text,id}) => {
                console.log(id)
               let src = `https://drive.google.com/uc?id=${id}&export=download`;
                let card = `<div class='card'>
            <h3>Card</h3>
                <img src="${src}"></img>
                <div class="box">
                <span>${text}</span>
                </div>
                </div>`
                document.querySelector('.container').innerHTML += card;
            })
        })
