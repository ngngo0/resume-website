class RatingWidget extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        const template = document.createElement("template");

        template.innerHTML = `
        <style>
            p,h3{
                margin: 0px;
            }
            #stars {
                display: flex;
                height: max-content;
                width:max-content;
            }
            #stars span{
                color: black;
                font-size: 30px;
                opacity: 50%;
                cusor: pointer;
            }
            #stars:hover span{
                opacity:100%;
            }
            #stars span:hover {
                opacity:100%;
            }
            #stars span:hover ~ span{
                opacity: 50%;
            }

        </style>
        <fieldset>
            <legend> <h3>Rating Widget </h3> </legend>
            <p>How satisfied are you?</p>
            <div id="stars">
                <span id="1">★</span>
                <span id="2">★</span>
                <span id="3">★</span>
                <span id="4">★</span>
                <span id="5">★</span>
            </div>
        </fieldset>
        `;
        
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const star1 = this.shadowRoot.getElementById("1");
        const star2 = this.shadowRoot.getElementById("2");
        const star3 = this.shadowRoot.getElementById("3");
        const star4 = this.shadowRoot.getElementById("4");
        const star5 = this.shadowRoot.getElementById("5");
        
        
        star1.addEventListener("click", e => this.clickMessage(e));
        star2.addEventListener("click", e => this.clickMessage(e));
        star3.addEventListener("click", e => this.clickMessage(e));
        star4.addEventListener("click", e => this.clickMessage(e));
        star5.addEventListener("click", e => this.clickMessage(e));
        
    }
    clickMessage(e){
        const containerStars = this.shadowRoot.getElementById("stars");
        if(e.target.id !== "4" && e.target.id !== "5"){
            containerStars.innerHTML= "Thanks for your feedback of " + e.target.id 
                + " stars. We will try to get better!" ;
        }else{
            containerStars.innerHTML= "Thanks for the " + e.target.id 
                + " star rating" ;
        }	
        fetch("https://httpbin.org/post", {
         method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Sent-By': 'Javascript'
          },
          body: JSON.stringify({
            question: "How satisfied are you" ,
            sentBy: "JS",
            rating: e.target.id
          })
        }).then(res => console.log(res));
    }
    

}
customElements.define('rating-widget', RatingWidget);

class WeatherWidget extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        const template = document.createElement("template");

        template.innerHTML = `
        <style>
            fieldset {
                display:flex;
                justify-content: space-around;
                
            }
            p,h3{
                margin: 0;
            }
        
            output {
                background-color: transparent;
            }

        </style>
        <fieldset> 
            <legend><h3>Current Weather</h3></legend>
        <section> 
            <p>Todays weather forecast:</p>
            <output> </output>
        </section>
        <section>
            <p>Humidity:</p>
            <output></output>
        </section>
        <section> 
            <p>Dewpoint: </p>
            <output></output>
        </section>
        <section> 
            <p>Wind: </p>
            <output></output>
        </section>
        </fieldset> 
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const outputForecast = this.shadowRoot.querySelector("output");
        const outputHumidity= this.shadowRoot.querySelectorAll("output")[1];
        const outputDewpoint= this.shadowRoot.querySelectorAll("output")[2];
        const outputWind= this.shadowRoot.querySelectorAll("output")[3];
        fetch("https://api.weather.gov/points/32.8801,-117.234")
        .then(response => {
            //fetches from this api, and turns it into json
            return response.json();
        })
        .then((data) => {
            //takes the return data and navigates to the forecast url
            return data.properties.forecast;
        }
        ).then((data) => {
            //since forecast is a url, we fetch from that url again
            fetch(data)
            .then(response => {
                return response.json();  
            })
            .then(data => {
                //default sunny icon
                let wIcon= "☀";
                //todays weather is all in this constant
                const todaysWeather = data.properties.periods[0];
                if(todaysWeather.shortForecast.includes("Rain")){
                    //rainy icon if the short forecast has the word rain in it
                    wIcon= "🌧";
                }else if(todaysWeather.shortForecast.includes("Cloudy")){
                    //cloudy icon if the forecast has cloudy in it.
                    wIcon= "🌤";
                }
                //output different forecasts from todays weather into output tags
                outputForecast.innerHTML=wIcon + " " + todaysWeather.shortForecast 
                +" " + todaysWeather.temperature + "°F";
                outputHumidity.innerHTML=todaysWeather.relativeHumidity.value+ "%";
                outputDewpoint.innerHTML=Math.round(todaysWeather.dewpoint.value)+ "°C";
                outputWind.innerHTML= todaysWeather.windSpeed;

            })
        });
    }
}
customElements.define('weather-widget', WeatherWidget);
