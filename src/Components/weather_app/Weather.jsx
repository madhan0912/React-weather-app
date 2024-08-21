import React from 'react';
import './Weather.css';
import search from '../Assets/search.png';
import clear from '../Assets/clear.jpeg';
import cloudy from '../Assets/cloudy.jpeg';
import drizzle from '../Assets/drizzle.jpeg';
import humidity from '../Assets/humidity.png';
import rainny from '../Assets/rainny.jpeg';
import sunny from '../Assets/sunny_1.png';
import wind from '../Assets/wind.png';
import snow  from '../Assets/snow.jpeg';



const Weather = ()=>{
      //api key from openweathermap app 
      let api_key = 'b52b78341860422af5aca4160237dc9a';

      //to set the use state for to change the icon according to the weathericons form the weathericon 
      const[wicon, setWicon] = React.useState(sunny);
      const[names, setNames]= React.useState("its too hot")
      const[error, setError]  = React.useState()
     


      const find = async ()=>{
         const  inputdata = document.getElementsByClassName('input');
         // to get the data from the input fields
         //console.log(inputdata[0].value);
         
         if (inputdata[0].value==="")
            {
               return 0;
            }
         
             

         //url from the thunderclient  
         try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputdata[0].value}&units=Metric&appid=${api_key}`   
            //to get the data from the url inthe json format
            let response = await fetch(url);
            let data = await  response.json();
         
        
         
         // to select the class name according to their classnames
         const location = document.getElementsByClassName("weather_location");
         const temperature = document.getElementsByClassName("weather_temperature");
         const humidity= document.getElementsByClassName("humidity_percent");
         const wind = document.getElementsByClassName("wind_percent");
         
         // to get the data form the url and insert the data accroding to their names 
         location[0].innerHTML = data.name;
         temperature[0].innerHTML = data.main.temp;
         humidity[0].innerHTML = data.main.humidity + "%";
         wind[0].innerHTML = data.wind.speed + "km/hr";

         
         // to change the weather icons(images)  below the input box according to their weather icons values
         if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
            {
               setWicon(clear)
               setNames("its clear sky")
            }
         else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
            {
               setWicon(cloudy)
               setNames("its cloudy outside")
            }
         else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
            {
               setWicon(cloudy)
               setNames("its cloudy now")
            }   
         else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
            {
               setWicon(drizzle)
               setNames("its drizzle now ")
            }
         else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
            {
               setWicon(rainny)
               setNames("Rainny outside")
            }
         else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
            {
               setWicon(rainny)
               setNames("Rainny ouside")
            }     
         else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
            {
               setWicon(snow)
               setNames("snowwing outside")
            } 
         // this else condition works on the undefined weather_icons conditions   
         else{
            setWicon(clear)
            setNames("its clear sky now ")
         }    
      }
      catch(err){
         setError(`city not found ${inputdata[0].value}`)
         console.log(error)
      }
      }
      
     return (
      <center>
         
       <div className="container">
         <h1>Weather App</h1>
         <div className="topbar">
            <div className="inputfield">
               <input type="text" className="input" placeholder='Enter city Name' />
            <div className="image" onClick={()=>find()}> 
               <img src={search} alt="" className="img_icon" />
               
            </div>
               
            </div>
         </div>
         <div className="weather_image">
            <img src={wicon} alt=""className='weather_images_icos' />
            <h3>{names}</h3>
            
         </div>
         <div className="weather_action">
            <div className="weather_temperature">24deg</div>
            <div className="weather_location">chennai</div>
            <div className="weather_error">{error}</div> 
         </div>
         <div className="weather_container">
            <div className="humidity data">
               <img src={humidity} alt="humidity"className='weather_icon'/>
               <div className="humidity">
                  <div className="humidity_percent">40%</div>
                  <div className="humidity_text">Humidity</div>
               </div>
            </div>
            <div className="wind data">
            <img src={wind} alt="wind" className='weather_icon' />
               <div className="wind">
                  <div className="wind_percent">400 km/hr</div>
                  <div className="wind_text">wind</div>
               </div>
            </div>
         </div>
       </div>
       </center>
     )
};

export default Weather;