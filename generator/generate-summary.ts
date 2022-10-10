import { readJson, writeJson } from "./read-files.js";

const filterObj = (obj: any, keys: string[]) => {
  const data = { ...obj };
  const res = Object.entries(data).reduce((newObj, [key, val]) => {
    return keys.includes(key) || tags.includes(key)
      ? { ...newObj, [key]: val }
      : { ...newObj };
  }, {});

  return res;
};

const createSummary = (raw: any, tags: any) =>
  Object.entries(raw).reduce((newObj, [key, val]: [key: string, val: any]) => {
    return {
      ...newObj,
      [key]: {
        uses: tags[key].instances,
        instances: val?.instances,
        props: tags[key].props,
      },
    };
  }, {});

export const genSummary = async () => {
  const comp = await readJson("./out/components.json");
  const icons = await readJson("./out/icons.json");
  let raw = await readJson("./out/raw.json");
  let tags = await readJson("./out/tags.json");

  const keys = [...Object.keys(comp), ...Object.keys(icons)];

  raw = filterObj(raw, keys);
  tags = filterObj(tags, keys);
  const res = createSummary(raw, tags);
  await writeJson(res, "./out/summary.json");
  return;
};

const tags = [
  "a",
  "abbr",
  "acronym",
  "address",
  "applet",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "basefont",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "font",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1 to h6",
  "head",
  "header",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noframes",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
];
