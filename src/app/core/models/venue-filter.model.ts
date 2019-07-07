export interface VenueFilter {
  latitude: number;
  longitude: number;
  search: string;
  near: string;
  locationByMap: boolean;
  zoomLevel: number;
  limit: number;
  offset: number;
}
