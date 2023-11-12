import APITENOR from "lib/apiTenor";

export const searchGifs = async (input = "") => {
  const { data, request } = await APITENOR.get(
    `${!input ? "/trending" : "/search"}`,
    {
      params: {
        q: input,
        key: process.env.NEXT_PUBLIC_TENOR_APIKEY,
      },
    }
  );
  const gifs = data.results.map(
    ({ media }: { media: Array<{ gif: { url: string } }> }) =>
      media.map(({ gif }) => gif.url)
  );

  return gifs;
};
