export type TSongSuggestionsRequest = {
  titles: string;
  length: number;
  temperature: number;
};

export type TSongSuggestionsResult = {
  suggestions: string;
};

export type TSong = {
  title: string;
  artist: string;
}
