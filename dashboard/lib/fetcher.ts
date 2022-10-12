export const fetcher = (url) =>
  fetch(url).then((res) => {
    console.log(res?.text);
    console.log(res.body);
    return res.json();
  });
