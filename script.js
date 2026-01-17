    let ism = document.querySelector('.ism-input')
    let zhanr = document.querySelector('.zhanr-input')
    let reyting = document.querySelector('.reyting-input')
    let knopka = document.querySelector('.dobavit-knopka')
    let schet = document.querySelector('.schet')
    let spisok = document.querySelector('.spisok-ul')
    let temaKnopka = document.querySelector('.tema-knopka')

    let films = JSON.parse(localStorage.getItem('films')) || []

    function saqlash() {
        localStorage.setItem('films', JSON.stringify(films))
    }

    function formatVaqt(date) {
        let kun = date.getDate().toString().padStart(2, '0')
        let oy = (date.getMonth() + 1).toString().padStart(2, '0')
        let yil = date.getFullYear()
        let soat = date.getHours().toString().padStart(2, '0')
        let minut = date.getMinutes().toString().padStart(2, '0')
        return `${kun}.${oy}.${yil} | ${soat}:${minut}`
    }

    function filmChiz(film) {
        let li = document.createElement('li')

        let info = document.createElement('div')
        info.className = 'info'

        let img = document.createElement('img')
        img.className = 'film-img'
        img.src = film.img

        let text = document.createElement('div')

        let title = document.createElement('div')
        title.className = 'ism'
        title.textContent = film.ism

        let desc = document.createElement('div')
        desc.textContent = `${film.zhanr} | Рейтинг: ${film.reyting} | ${film.vaqt}`

        text.append(title, desc)
        info.append(img, text)

        let actions = document.createElement('div')

        let star = document.createElement('span')
        star.className = 'zvezda'
        star.textContent = '★'
        star.style.color =
            film.reyting <= 5 ? 'red' :
            film.reyting <= 7 ? 'orange' : 'green'

        let del = document.createElement('button')
        del.className = 'udalit'
        del.textContent = 'Удалить'
        del.onclick = () => {
            films = films.filter(f => f.id !== film.id)
            saqlash()
            li.remove()
            schet.textContent = films.length
        }

        actions.append(star, del)
        li.append(info, actions)
        spisok.append(li)
    }

    films.forEach(filmChiz)
    schet.textContent = films.length

    knopka.onclick = () => {
        if (!ism.value || !zhanr.value || !reyting.value) return

        let film = {
            id: Date.now(),
            ism: ism.value,
            zhanr: zhanr.value,
            reyting: Number(reyting.value),
            vaqt: formatVaqt(new Date()),
            img: "https://www.kinopoisk.ru/film/1048334/"
        }

        films.push(film)
        saqlash()
        filmChiz(film)
        schet.textContent = films.length

        ism.value = zhanr.value = reyting.value = ''
    }

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark')
        temaKnopka.textContent = '☀️'
    }

    temaKnopka.onclick = () => {
        document.body.classList.toggle('dark')
        localStorage.setItem('theme',
            document.body.classList.contains('dark') ? 'dark' : 'light'
        )
        temaKnopka.textContent =
            document.body.classList.contains('dark') ? '☀️' : '🌙'
    }