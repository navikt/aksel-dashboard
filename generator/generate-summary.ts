import { readJson, writeJson } from "./read-files.js";

const htmlTags = [
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

const getTimeStr = () => {
  const date = new Date();

  return (
    `${date.getFullYear()}`.slice(2, 4) +
    "-" +
    ("00" + date.getMonth()).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2)
  );
};

const filterObj = (obj: any, keys: string[]) => {
  const data = { ...obj };
  const res = Object.entries(data).reduce((newObj, [key, val]) => {
    return keys.includes(key) ? { ...newObj, [key]: val } : { ...newObj };
  }, {});

  return res;
};

const createSummary = (raw: any, tags: any, noImports?: boolean) =>
  Object.entries(raw).reduce((newObj, [key, val]: [key: string, val: any]) => {
    const filter =
      noImports && val?.instances.filter((x: any) => !x?.importInfo);

    if (
      (noImports && filter?.length === 0) ||
      (!noImports && tags[key]?.instances === 0)
    ) {
      return { ...newObj };
    }
    return {
      ...newObj,
      [key]: {
        uses: noImports ? filter.length : tags[key].instances,
        instances: noImports ? filter : val?.instances,
        props: tags[key].props,
      },
    };
  }, {});

const sortObj = (obj: any) => {
  return Object.entries(obj)
    .reduce((cur, [key, val]) => [...cur, { name: key, val }], [] as any)
    .sort((a: any, b: any) => (a.val.uses > b.val.uses ? -1 : 1));
};

/* Generates a more readable and iteratable summary */
export const genSummary = async () => {
  const comp = await readJson("./out/components.json");
  const compRaw = await readJson("./out/raw-comp.json");
  const icons = await readJson("./out/icons.json");
  const iconsRaw = await readJson("./out/raw-icons.json");
  const css = await readJson("./out/css.json");

  let raw = await readJson("./out/raw.json");
  let tags = await readJson("./out/tags.json");

  const summaryElements = createSummary(
    filterObj(raw, [...htmlTags]),
    filterObj(tags, [...htmlTags]),
    true
  );
  const summaryComp = createSummary(
    filterObj(compRaw, [...Object.keys(comp)]),
    filterObj(comp, [...Object.keys(comp)])
  );
  const summaryIcons = createSummary(
    filterObj(iconsRaw, [...Object.keys(icons)]),
    filterObj(icons, [...Object.keys(icons)])
  );

  const res = {
    elementer: sortObj(summaryElements),
    komponenter: sortObj(summaryComp),
    ikoner: sortObj(summaryIcons),
    css,
  };

  await writeJson(res, `./out/summary-${getTimeStr()}.json`);
};
