export const fetcher = (url) =>
  fetch(url).then((res) => {
    console.log(res?.text);
    return res.json();
  });
