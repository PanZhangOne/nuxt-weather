export interface City {
  name: string;
  id: string;
  location: string;
}

export interface WeatherData {
  clouds: {
    all: number;
  };

  weather: {
    description: string;

    icon: string;

    id: number;

    main: string;
  };

  wind: {
    deg: number;

    gust: number;

    speed: number;
  };
}
