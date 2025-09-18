export interface Token {
    access_token: string;
    token_type: string;
}

export interface User {
    id?: string;  // MongoDB ObjectId as string
    email: string;
    phone: string;
    full_name: string;
    language_preference: string;
    password?: string; // Only for registration
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    token?: Token; // Included in registration response
}

export interface Farm {
    id: number;
    name: string;
    location: string;
    area: number;
    soil_type: string;
    irrigation_type: string;
    owner_id: number;
    created_at: string;
    updated_at: string;
    crops?: Crop[];
    soil_tests?: SoilTest[];
}

export interface Crop {
    id: number;
    name: string;
    name_hindi: string;
    scientific_name: string;
    season: string;
    duration: number;
    water_requirement: number;
    created_at: string;
    updated_at: string;
    diseases?: Disease[];
}

export interface Disease {
    id: number;
    name: string;
    name_hindi: string;
    crop_id: number;
    symptoms: string;
    prevention: string;
    treatment: string;
    created_at: string;
    updated_at: string;
}

export interface SoilTest {
    id: number;
    farm_id: number;
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organic_matter: number;
    test_date: string;
    created_at: string;
    updated_at: string;
}

export interface WeatherData {
    id: number;
    location: string;
    temperature: number;
    humidity: number;
    rainfall: number;
    wind_speed: number;
    date: string;
    created_at: string;
}

export interface MarketPrice {
    id: number;
    crop_id: number;
    market_name: string;
    price: number;
    date: string;
    created_at: string;
}