const mainContainer=document.querySelector('.main_container');
const search=document.querySelector('.userSearch button');
const weatherBox=document.querySelector('.weather_box');
const weatherDetails=document.querySelector('.weather_details');
const error404=document.querySelector('.hidden');
const start_info=document.querySelector('.welcome');

search.addEventListener('click', () => {
    const APIKey='e7a2ac1abcaea3b2d662998c7a65900f';
    const city=document.querySelector('.userSearch input').value;

    if(city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(res=> res.json()).then(json => {
        

        if(json.cod=='404'){
            mainContainer.style.height='400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            start_info.classList.add('hidden');
            return;
        }

        mainContainer.style.height='435px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');
         
        const image=document.querySelector('.weather_box img');
        const temp=document.querySelector('.weather_box .temp');
        const description=document.querySelector('.weather_box .description');
        const humidity=document.querySelector('.weather_details .humidity span');
        const wind=document.querySelector('.weather_details .wind span');
        switch(json.weather[0].main){
            case 'clear':
                image.src='clear.png';
                break;
            case 'Rain':
                image.src='rain.png';
                break;
            case 'Snow':
                image.src='snow.png';
                break;
            case 'Clouds':
                image.src='cloud.png';
                break;
            case 'Mist':
                image.src='mist.png';
                break;
            case 'Haze':
                image.src='mist.png';
                break;
            default:
                image.src='cloud.png';
                break;
        }

        temp.innerHTML=`${parseInt(json.main.temp)}<span>&degC</span>`;
        description.innerHTML=`${json.weather[0].description}`;
        humidity.innerHTML=`${json.main.humidity}%`;
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;

        if(weatherBox.classList.contains('active') || weatherDetails.classList.contains('active') ){
            start_info.classList.add('hidden');
        }
    });
});