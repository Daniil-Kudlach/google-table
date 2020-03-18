    fetch('https://spreadsheets.google.com/feeds/list/1BuePN0GHsl2ig48EYF2Z9Amx6aA94tE9lYTTy-tg4dY/1/public/full?alt=json')
        .then(response => response.json())
        .then(({
            feed
        }) => [...feed.entry].map(el => {
            return el.content.$t.replace(/\w+\:\s*/g, '').split(',')
        }))
        .then(data => {
            data = mergeSort(data);
            data.forEach(el => {
               let src = `https://drive.google.com/uc?id=${el[1]}&export=download`;
               src = src.replace(/\s/g, '');
                let card = `<div class='card'>
            <h3>Card</h3>
                <img src="${src}"></img>
                <span>${el[0]}</span></div>`
                document.querySelector('.container').innerHTML += card;
            })
        })

        function mergeSort(unsortedArray) {
            //условие выхода из рекурсии
            //если переданный массив имеет менее двух элементов - нечего сортировать
            if (unsortedArray.length < 2) {
                return unsortedArray;
            }
            //находим центр при помощи побитовой операции сдвига на 1 бит вправо
            //аналог деления на два и округления - только эффективнее
            const middle = unsortedArray.length >> 1;
            const left = unsortedArray.slice(0, middle);
            const right = unsortedArray.slice(middle);
            //сама сортировка
            function merge(left, right) {
                const resultArray = [];
                let leftIndex = 0;
                let rightIndex = 0;
                while (leftIndex < left.length && rightIndex < right.length) {
                    if (left[leftIndex] < right[rightIndex]) {
                        resultArray.push(left[leftIndex]);
                        leftIndex++;
                    } else {
                        resultArray.push(right[rightIndex]);
                        rightIndex++;
                    }
                }
                return resultArray
                    .concat(left.slice(leftIndex))
        
                    .concat(right.slice(rightIndex));
            }
            return merge(mergeSort(left), mergeSort(right));
        }