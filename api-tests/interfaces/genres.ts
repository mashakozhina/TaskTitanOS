export interface GenreImage {
  id: number;
  locale: string;
  dominant_color: { image: string };
  image: string;
}

export interface Genre {
  id: number;
  code: string;
  name: string;
  contents: { url: string };
  image: GenreImage;
}
