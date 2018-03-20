const rootUrl = 'http://samples.openweathermap.org/data/2.5/weather?appid=511c025d9660f85edada762f6f115893';

export const fetchWeather = (lat, lon) => {
	const url = rootUrl += '&lat='+lat+'&lon='+lon
	return fetch(url)
		.then(res => res.json())
		.then(json => ({
			'temp': json.main.temp,
			'weather': json.weather[0].main
		}) )
}