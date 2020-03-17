let src = '',
img;
fetch('https://spreadsheets.google.com/feeds/cells/1BuePN0GHsl2ig48EYF2Z9Amx6aA94tE9lYTTy-tg4dY/1/public/full?alt=json')
.then(response=>response.json())
.then(data=>src = data.feed.entry)
.then(arr=>arr.map(el => {
    let i = el.content.$t.indexOf('id=') + 3;
        return el.content.$t.substring(i);
}).forEach(el => {
    let img=new Image();
    img.src = `https://drive.google.com/uc?id=${el}&export=download`;
    document.body.prepend(img);    
}))
