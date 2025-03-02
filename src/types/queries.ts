export interface IGeoCodeResult {
    name: string;
    local_names: { [key: string]: string };
    lat: number;
    lon: number;
    country: string;
}

export interface IGeoCodeQuery {
    location: string;
}
