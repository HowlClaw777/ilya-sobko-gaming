// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Проверяем, есть ли сохраненная тема в localStorage
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Устанавливаем текущую тему
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
}

// Переключение темы при клике
themeToggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

// Анимация счетчиков статистики
function animateCounters() {
    const tournamentsCount = document.getElementById('tournamentsCount');
    const teamsCount = document.getElementById('teamsCount');
    const prizeCount = document.getElementById('prizeCount');
    const viewersCount = document.getElementById('viewersCount');
    
    if (tournamentsCount) {
        let count = 0;
        const target = 42;
        const speed = 5;
        
        const updateCount = () => {
            const increment = Math.ceil(target / speed);
            count += increment;
            
            if (count < target) {
                tournamentsCount.textContent = count;
                setTimeout(updateCount, 50);
            } else {
                tournamentsCount.textContent = target;
            }
        };
        
        updateCount();
    }
    
    if (teamsCount) {
        let count = 0;
        const target = 386;
        const speed = 10;
        
        const updateCount = () => {
            const increment = Math.ceil(target / speed);
            count += increment;
            
            if (count < target) {
                teamsCount.textContent = count;
                setTimeout(updateCount, 20);
            } else {
                teamsCount.textContent = target;
            }
        };
        
        updateCount();
    }
    
    if (prizeCount) {
        let count = 0;
        const target = 2500000;
        const speed = 50;
        
        const updateCount = () => {
            const increment = Math.ceil(target / speed);
            count += increment;
            
            if (count < target) {
                prizeCount.textContent = count.toLocaleString('ru-RU');
                setTimeout(updateCount, 10);
            } else {
                prizeCount.textContent = target.toLocaleString('ru-RU');
            }
        };
        
        updateCount();
    }
    
    if (viewersCount) {
        let count = 0;
        const target = 12500;
        const speed = 25;
        
        const updateCount = () => {
            const increment = Math.ceil(target / speed);
            count += increment;
            
            if (count < target) {
                viewersCount.textContent = count.toLocaleString('ru-RU');
                setTimeout(updateCount, 20);
            } else {
                viewersCount.textContent = target.toLocaleString('ru-RU');
            }
        };
        
        updateCount();
    }
}

// Анимация появления элементов при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.tournament-card, .stat-item, .value-item, .partner-card, .rule-item, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Фильтрация турниров
function initTournamentFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tournamentsGrid = document.getElementById('tournamentsGrid');
    
    if (!tournamentsGrid || !filterButtons.length) return;
    
    // Данные турниров
    const tournamentsData = [
        {
            id: 1,
            title: "Winter Championship 2025",
            date: "15-20 января 2025",
            format: "Групповая стадия + Плей-офф",
            teams: "16 команд",
            prize: "100 000₽",
            status: "upcoming",
            description: "Крупнейший зимний турнир года с участием сильнейших команд России. Призовой фонд 100 000 рублей."
        },
        {
            id: 2,
            title: "Weekend Cup #12",
            date: "11-12 января 2025",
            format: "Double Elimination",
            teams: "8 команд",
            prize: "50 000₽",
            status: "upcoming",
            description: "Еженедельный турнир для команд любого уровня. Быстрый формат, динамичные матчи."
        },
        {
            id: 3,
            title: "Spring Major 2025",
            date: "15-25 марта 2025",
            format: "Отборочные + Финал",
            teams: "32 команды",
            prize: "200 000₽",
            status: "upcoming",
            description: "Главное событие весны с масштабным призовым фондом. Отборочные пройдут в феврале."
        },
        {
            id: 4,
            title: "Solo Mid Tournament #5",
            date: "25-26 декабря 2024",
            format: "Single Elimination",
            teams: "16 игроков",
            prize: "25 000₽",
            status: "ongoing",
            description: "Турнир для соло-мидеров. Каждый игрок играет за себя в формате 1v1."
        },
        {
            id: 5,
            title: "Winter Cup 2024",
            date: "10-15 декабря 2024",
            format: "Групповая стадия + Плей-офф",
            teams: "16 команд",
            prize: "75 000₽",
            status: "ongoing",
            description: "Зимний турнир с участием лучших команд со всей страны. Прямая трансляция на Twitch."
        },
        {
            id: 6,
            title: "November Championship",
            date: "5-10 ноября 2024",
            format: "Double Elimination",
            teams: "8 команд",
            prize: "50 000₽",
            status: "past",
            description: "Итоговый турнир осеннего сезона с призовым фондом 50 000 рублей."
        },
        {
            id: 7,
            title: "Halloween Cup",
            date: "30-31 октября 2024",
            format: "Single Elimination",
            teams: "16 команд",
            prize: "30 000₽",
            status: "past",
            description: "Специальный тематический турнир с особыми правилами и призами для лучших игроков."
        },
        {
            id: 8,
            title: "Summer Major 2024",
            date: "15-25 июля 2024",
            format: "Групповая стадия + Плей-офф",
            teams: "32 команды",
            prize: "150 000₽",
            status: "past",
            description: "Главное событие лета с рекордным призовым фондом и участием приглашенных команд из СНГ."
        }
    ];
    
    // Функция для отображения турниров
    function displayTournaments(filter = 'all') {
        tournamentsGrid.innerHTML = '';
        
        const filteredTournaments = filter === 'all' 
            ? tournamentsData 
            : tournamentsData.filter(tournament => tournament.status === filter);
        
        filteredTournaments.forEach(tournament => {
            const tournamentElement = document.createElement('div');
            tournamentElement.className = `tournament-full-card status-${tournament.status}`;
            tournamentElement.innerHTML = `
                <div class="tournament-header">
                    <h3>${tournament.title}</h3>
                    <span class="tournament-badge-status">${getStatusText(tournament.status)}</span>
                </div>
                <div class="tournament-body">
                    <p><strong>Дата:</strong> ${tournament.date}</p>
                    <p><strong>Формат:</strong> ${tournament.format}</p>
                    <p><strong>Участники:</strong> ${tournament.teams}</p>
                    <p>${tournament.description}</p>
                </div>
                <div class="tournament-footer">
                    <span class="tournament-prize">Призовой фонд: ${tournament.prize}</span>
                    <a href="#" class="btn small">Подробнее</a>
                </div>
            `;
            tournamentsGrid.appendChild(tournamentElement);
        });
        
        // Инициализация анимаций для новых элементов
        initScrollAnimations();
    }
    
    // Получение текста статуса
    function getStatusText(status) {
        switch(status) {
            case 'upcoming': return 'Предстоящий';
            case 'ongoing': return 'В процессе';
            case 'past': return 'Завершен';
            default: return 'Неизвестно';
        }
    }
    
    // Обработчики событий для кнопок фильтрации
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем класс active у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем класс active к нажатой кнопке
            button.classList.add('active');
            
            // Отображаем соответствующие турниры
            const filter = button.dataset.filter;
            displayTournaments(filter);
        });
    });
    
    // Отображение всех турниров при загрузке страницы
    displayTournaments();
}

// Обработка формы контактов
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm || !formMessage) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const playerName = document.getElementById('playerName').value;
        const teamName = document.getElementById('teamName').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Здесь обычно отправляли бы данные на сервер
        // Для демо-версии просто покажем сообщение
        
        // Сохраняем данные в localStorage для демо-версии
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push({
            playerName,
            teamName,
            email,
            subject,
            message,
            date: new Date().toISOString()
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Отображаем сообщение об успешной отправке
        formMessage.innerHTML = `
            <div style="background-color: rgba(76, 175, 80, 0.2); color: #4caf50; padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #4caf50;">
                Спасибо, ${playerName}! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время для обсуждения деталей.
            </div>
        `;
        
        // Очищаем форму
        contactForm.reset();
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            formMessage.innerHTML = '';
        }, 5000);
    });
}

// Функция для сохранения истории посещений
function trackPageVisit() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const visits = JSON.parse(localStorage.getItem('pageVisits')) || [];
    
    // Добавляем текущую страницу в историю
    visits.push({
        page: currentPage,
        timestamp: new Date().toISOString()
    });
    
    // Ограничиваем историю последними 10 посещениями
    if (visits.length > 10) {
        visits.shift();
    }
    
    localStorage.setItem('pageVisits', JSON.stringify(visits));
}

// Отображение последних посещенных страниц
function showRecentVisits() {
    const visits = JSON.parse(localStorage.getItem('pageVisits')) || [];
    if (visits.length === 0) return;
    
    const footer = document.querySelector('footer .container');
    if (!footer) return;
    
    const recentVisits = document.createElement('div');
    recentVisits.className = 'recent-visits';
    recentVisits.style.marginTop = '20px';
    recentVisits.innerHTML = '<h4 style="color: white; margin-bottom: 10px; font-family: \'Orbitron\', sans-serif;">Недавно просмотренные страницы:</h4><ul></ul>';
    
    const ul = recentVisits.querySelector('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    
    // Показываем только последние 3 уникальных посещения
    const uniquePages = [...new Set(visits.map(v => v.page).reverse())].slice(0, 3);
    
    uniquePages.forEach(page => {
        const li = document.createElement('li');
        li.style.marginBottom = '5px';
        
        let pageName = '';
        
        switch(page) {
            case 'index.html':
                pageName = 'Главная';
                break;
            case 'about.html':
                pageName = 'О нас';
                break;
            case 'tournaments.html':
                pageName = 'Турниры';
                break;
            case 'contact.html':
                pageName = 'Контакты';
                break;
            default:
                pageName = page.replace('.html', '').replace('-', ' ');
        }
        
        li.innerHTML = `<a href="${page}" style="color: #9575cd; text-decoration: none; transition: all 0.3s ease; font-family: 'Orbitron', sans-serif;">${pageName}</a>`;
        ul.appendChild(li);
    });
    
    footer.prepend(recentVisits);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация счетчиков на главной странице
    if (document.getElementById('tournamentsCount')) {
        animateCounters();
    }
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
    
    // Инициализация фильтрации турниров
    initTournamentFilter();
    
    // Инициализация формы контактов
    initContactForm();
    
    // Отслеживание посещений страниц
    trackPageVisit();
    showRecentVisits();
    
    // Сохранение темы при перезагрузке страницы
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
    
    // Добавление интерактивности для видео
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            const message = document.createElement('div');
            message.style.position = 'fixed';
            message.style.top = '20px';
            message.style.right = '20px';
            message.style.backgroundColor = 'rgba(76, 175, 80, 0.9)';
            message.style.color = 'white';
            message.style.padding = '10px 20px';
            message.style.borderRadius = '8px';
            message.style.zIndex = '10000';
            message.style.fontFamily = "'Orbitron', sans-serif";
            message.innerHTML = 'Видео скоро будет доступно!';
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                document.body.removeChild(message);
            }, 3000);
        });
    }
});