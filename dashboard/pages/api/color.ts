import { getFile } from "../../lib";
import color from "color";
import { kebabCase } from "lodash";

const tokens = {
  FontFamily: '"Source Sans Pro", Arial, sans-serif',
  FontLineHeightHeading2xlarge: "3.25rem",
  FontLineHeightHeadingXlarge: "2.5rem",
  FontLineHeightHeadingLarge: "2.25rem",
  FontLineHeightHeadingMedium: "2rem",
  FontLineHeightHeadingSmall: "1.75rem",
  FontLineHeightHeadingXsmall: "1.5rem",
  FontLineHeightXlarge: "1.75rem",
  FontLineHeightLarge: "1.5rem",
  FontLineHeightMedium: "1.25rem",
  FontSizeHeading2xlarge: "2.5rem",
  FontSizeHeadingXlarge: "2rem",
  FontSizeHeadingLarge: "1.75rem",
  FontSizeHeadingMedium: "1.5rem",
  FontSizeHeadingSmall: "1.25rem",
  FontSizeHeadingXsmall: "1.125rem",
  FontSizeXlarge: "1.25rem",
  FontSizeLarge: "1.125rem",
  FontSizeMedium: "1rem",
  FontSizeSmall: "0.875rem",
  FontWeightBold: "600",
  FontWeightRegular: "400",
  ZIndexModal: 2000,
  ZIndexPopover: 1000,
  ZIndexFocus: 10,
  ZIndexTooltip: 3000,
  BorderRadiusSmall: "2px",
  BorderRadiusMedium: "4px",
  BorderRadiusLarge: "8px",
  BorderRadiusXlarge: "12px",
  BorderRadiusFull: "9999px",
  GlobalColorBlue50: "rgba(230, 240, 255, 1)",
  GlobalColorBlue100: "rgba(204, 225, 255, 1)",
  GlobalColorBlue200: "rgba(153, 195, 255, 1)",
  GlobalColorBlue300: "rgba(102, 165, 244, 1)",
  GlobalColorBlue400: "rgba(51, 134, 224, 1)",
  GlobalColorBlue500: "rgba(0, 103, 197, 1)",
  GlobalColorBlue600: "rgba(0, 86, 180, 1)",
  GlobalColorBlue700: "rgba(0, 69, 156, 1)",
  GlobalColorBlue800: "rgba(0, 52, 125, 1)",
  GlobalColorBlue900: "rgba(0, 34, 82, 1)",
  GlobalColorDeepblue50: "rgba(230, 241, 248, 1)",
  GlobalColorDeepblue100: "rgba(204, 226, 240, 1)",
  GlobalColorDeepblue200: "rgba(153, 196, 221, 1)",
  GlobalColorDeepblue300: "rgba(102, 163, 196, 1)",
  GlobalColorDeepblue400: "rgba(51, 128, 165, 1)",
  GlobalColorDeepblue500: "rgba(0, 91, 130, 1)",
  GlobalColorDeepblue600: "rgba(0, 80, 119, 1)",
  GlobalColorDeepblue700: "rgba(0, 67, 103, 1)",
  GlobalColorDeepblue800: "rgba(0, 52, 83, 1)",
  GlobalColorDeepblue900: "rgba(0, 36, 58, 1)",
  GlobalColorGray50: "rgba(247, 247, 247, 1)",
  GlobalColorGray100: "rgba(241, 241, 241, 1)",
  GlobalColorGray200: "rgba(229, 229, 229, 1)",
  GlobalColorGray300: "rgba(207, 207, 207, 1)",
  GlobalColorGray400: "rgba(176, 176, 176, 1)",
  GlobalColorGray500: "rgba(143, 143, 143, 1)",
  GlobalColorGray600: "rgba(112, 112, 112, 1)",
  GlobalColorGray700: "rgba(89, 89, 89, 1)",
  GlobalColorGray800: "rgba(64, 64, 64, 1)",
  GlobalColorGray900: "rgba(38, 38, 38, 1)",
  GlobalColorGreen50: "rgba(243, 252, 245, 1)",
  GlobalColorGreen100: "rgba(204, 241, 214, 1)",
  GlobalColorGreen200: "rgba(153, 222, 173, 1)",
  GlobalColorGreen300: "rgba(102, 199, 134, 1)",
  GlobalColorGreen400: "rgba(51, 170, 95, 1)",
  GlobalColorGreen500: "rgba(6, 137, 58, 1)",
  GlobalColorGreen600: "rgba(0, 124, 46, 1)",
  GlobalColorGreen700: "rgba(0, 106, 35, 1)",
  GlobalColorGreen800: "rgba(0, 85, 25, 1)",
  GlobalColorGreen900: "rgba(0, 59, 15, 1)",
  GlobalColorLightblue50: "rgba(235, 252, 255, 1)",
  GlobalColorLightblue100: "rgba(216, 249, 255, 1)",
  GlobalColorLightblue200: "rgba(181, 241, 255, 1)",
  GlobalColorLightblue300: "rgba(151, 230, 255, 1)",
  GlobalColorLightblue400: "rgba(124, 218, 248, 1)",
  GlobalColorLightblue500: "rgba(102, 203, 236, 1)",
  GlobalColorLightblue600: "rgba(76, 173, 205, 1)",
  GlobalColorLightblue700: "rgba(54, 141, 168, 1)",
  GlobalColorLightblue800: "rgba(35, 107, 125, 1)",
  GlobalColorLightblue900: "rgba(19, 72, 82, 1)",
  GlobalColorLimegreen50: "rgba(253, 255, 230, 1)",
  GlobalColorLimegreen100: "rgba(249, 252, 204, 1)",
  GlobalColorLimegreen200: "rgba(236, 243, 153, 1)",
  GlobalColorLimegreen300: "rgba(217, 227, 102, 1)",
  GlobalColorLimegreen400: "rgba(193, 203, 51, 1)",
  GlobalColorLimegreen500: "rgba(162, 173, 0, 1)",
  GlobalColorLimegreen600: "rgba(147, 158, 0, 1)",
  GlobalColorLimegreen700: "rgba(127, 137, 0, 1)",
  GlobalColorLimegreen800: "rgba(102, 110, 0, 1)",
  GlobalColorLimegreen900: "rgba(71, 78, 0, 1)",
  GlobalColorNavRed: "rgba(195, 0, 0, 1)",
  GlobalColorOrange50: "rgba(255, 249, 240, 1)",
  GlobalColorOrange100: "rgba(255, 236, 204, 1)",
  GlobalColorOrange200: "rgba(255, 215, 153, 1)",
  GlobalColorOrange300: "rgba(255, 193, 102, 1)",
  GlobalColorOrange400: "rgba(255, 170, 51, 1)",
  GlobalColorOrange500: "rgba(255, 145, 0, 1)",
  GlobalColorOrange600: "rgba(212, 123, 0, 1)",
  GlobalColorOrange700: "rgba(168, 100, 0, 1)",
  GlobalColorOrange800: "rgba(125, 76, 0, 1)",
  GlobalColorOrange900: "rgba(82, 51, 0, 1)",
  GlobalColorPurple50: "rgba(239, 236, 244, 1)",
  GlobalColorPurple100: "rgba(224, 216, 233, 1)",
  GlobalColorPurple200: "rgba(192, 178, 210, 1)",
  GlobalColorPurple300: "rgba(161, 141, 187, 1)",
  GlobalColorPurple400: "rgba(130, 105, 162, 1)",
  GlobalColorPurple500: "rgba(99, 70, 137, 1)",
  GlobalColorPurple600: "rgba(82, 56, 116, 1)",
  GlobalColorPurple700: "rgba(65, 43, 93, 1)",
  GlobalColorPurple800: "rgba(48, 31, 70, 1)",
  GlobalColorPurple900: "rgba(31, 20, 47, 1)",
  GlobalColorRed50: "rgba(253, 232, 230, 1)",
  GlobalColorRed100: "rgba(249, 210, 204, 1)",
  GlobalColorRed200: "rgba(239, 168, 157, 1)",
  GlobalColorRed300: "rgba(225, 128, 113, 1)",
  GlobalColorRed400: "rgba(208, 92, 74, 1)",
  GlobalColorRed500: "rgba(186, 58, 38, 1)",
  GlobalColorRed600: "rgba(163, 42, 23, 1)",
  GlobalColorRed700: "rgba(136, 29, 12, 1)",
  GlobalColorRed800: "rgba(106, 18, 4, 1)",
  GlobalColorRed900: "rgba(72, 9, 0, 1)",
  GlobalColorTransparent: "rgba(255, 255, 255, 0)",
  GlobalColorWhite: "rgba(255, 255, 255, 1)",
  SemanticColorBorderInverted: "rgba(229, 229, 229, 1)",
  SemanticColorBorderMuted: "rgba(143, 143, 143, 1)",
  SemanticColorBorder: "rgba(112, 112, 112, 1)",
  SemanticColorCanvasBackgroundInverted: "rgba(38, 38, 38, 1)",
  SemanticColorCanvasBackgroundLight: "rgba(255, 255, 255, 1)",
  SemanticColorCanvasBackground: "rgba(241, 241, 241, 1)",
  SemanticColorComponentBackgroundAlternate: "rgba(247, 247, 247, 1)",
  SemanticColorComponentBackgroundInverted: "rgba(38, 38, 38, 1)",
  SemanticColorComponentBackgroundLight: "rgba(255, 255, 255, 1)",
  SemanticColorDivider: "rgba(207, 207, 207, 1)",
  SemanticColorFeedbackDangerBackground: "rgba(253, 232, 230, 1)",
  SemanticColorFeedbackDangerBorder: "rgba(186, 58, 38, 1)",
  SemanticColorFeedbackDangerIcon: "rgba(186, 58, 38, 1)",
  SemanticColorFeedbackDangerText: "rgba(186, 58, 38, 1)",
  SemanticColorFeedbackInfoBackground: "rgba(235, 252, 255, 1)",
  SemanticColorFeedbackInfoBorder: "rgba(54, 141, 168, 1)",
  SemanticColorFeedbackInfoIcon: "rgba(54, 141, 168, 1)",
  SemanticColorFeedbackSuccessBackground: "rgba(243, 252, 245, 1)",
  SemanticColorFeedbackSuccessBorder: "rgba(6, 137, 58, 1)",
  SemanticColorFeedbackSuccessIcon: "rgba(0, 124, 46, 1)",
  SemanticColorFeedbackWarningBackground: "rgba(255, 249, 240, 1)",
  SemanticColorFeedbackWarningBorder: "rgba(212, 123, 0, 1)",
  SemanticColorFeedbackWarningIcon: "rgba(212, 123, 0, 1)",
  SemanticColorFocusInverted: "rgba(153, 195, 255, 1)",
  SemanticColorFocus: "rgba(0, 52, 125, 1)",
  SemanticColorInteractionDangerHover: "rgba(163, 42, 23, 1)",
  SemanticColorInteractionDangerSelected: "rgba(136, 29, 12, 1)",
  SemanticColorInteractionDanger: "rgba(186, 58, 38, 1)",
  SemanticColorInteractionPrimaryHoverSubtle: "rgba(230, 240, 255, 1)",
  SemanticColorInteractionPrimaryHover: "rgba(0, 86, 180, 1)",
  SemanticColorInteractionPrimarySelected: "rgba(0, 91, 130, 1)",
  SemanticColorInteractionPrimary: "rgba(0, 103, 197, 1)",
  SemanticColorLinkVisited: "rgba(99, 70, 137, 1)",
  SemanticColorLink: "rgba(0, 103, 197, 1)",
  SemanticColorTextInverted: "rgba(255, 255, 255, 1)",
  SemanticColorTextMuted: "rgba(112, 112, 112, 1)",
  SemanticColorText: "rgba(38, 38, 38, 1)",
  ShadowXsmall: "0 1px 2px 0 rgba(0, 0, 0, 0.12)",
  ShadowSmall:
    "0 1px 2px -1px rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  ShadowMedium:
    "0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  ShadowLarge:
    "0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  ShadowXlarge:
    "0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 25px 50px -5px rgba(0, 0, 0, 0.1)",
  ShadowFocus: "0 0 0 3px rgba(0, 52, 125, 1)",
  ShadowFocusInverted: "0 0 0 3px rgba(153, 195, 255, 1)",
  Spacing1: "0.25rem",
  Spacing2: "0.5rem",
  Spacing3: "0.75rem",
  Spacing4: "1rem",
  Spacing5: "1.25rem",
  Spacing6: "1.5rem",
  Spacing7: "1.75rem",
  Spacing8: "2rem",
  Spacing9: "2.25rem",
  Spacing10: "2.5rem",
  Spacing11: "2.75rem",
  Spacing12: "3rem",
  Spacing14: "3.5rem",
  Spacing16: "4rem",
  Spacing18: "4.5rem",
  Spacing20: "5rem",
  Spacing24: "6rem",
  Spacing32: "8rem",
};

const filter = [
  "#",
  "rgb",
  "hsl",
  "var(--navds-global",
  "var(--navds-semantic",
  "transparent",
];

const decl = ["background", "background-color", "color", "border-color"];

const findTokenRef = (c: string) => {
  if (!c.startsWith("var(")) {
    return c;
  }
  const cleaned = c.replace("var(--navds-", "").replace(")", "");

  const found = Object.keys(tokens).find((key) => kebabCase(key) === cleaned);
  return found ? tokens[found] : c;
};

export default async function handler(req, res) {
  const file = await getFile();

  const tags = Object.keys(file.css.declarations)
    .filter((x) => !x.startsWith("-"))
    .filter((x) => decl.find((y) => y === x));

  const filtered = {};

  tags.push("bg");
  for (let tag of tags) {
    const l =
      tag === "bg"
        ? [
            ...file.css.declarations["background-color"],
            ...file.css.declarations["background"],
          ]
        : file.css.declarations[tag];
    tag;
    const hist = {};
    l.filter((x) => filter.find((y) => x.startsWith(y))).map(function (a) {
      try {
        const c = color(a).rgb();
        if (c in hist) hist[c]++;
        else hist[c] = 1;
      } catch (error) {
        if (a in hist) hist[a]++;
        else hist[a] = 1;
      }
    });
    filtered[tag] = hist;

    const hist2 = {};

    l.filter((x) => filter.find((y) => x.startsWith(y))).map(function (a) {
      try {
        const tokenRef = findTokenRef(a);
        const c = color(tokenRef).rgb();
        if (c in hist2) hist2[c]++;
        else hist2[c] = 1;
      } catch (error) {
        if (a in hist2) hist2[a]++;
        else hist2[a] = 1;
      }
    });
    filtered[`${tag}-summary`] = hist2;
  }

  const data = Object.keys(filtered)
    .map((x) => ({
      tag: x,
      values: Object.keys(filtered[x])
        .map((y) => ({
          name: y,
          uses: filtered[x][y],
        }))
        .sort((a, b) => (a.uses > b.uses ? -1 : 1)),
    }))
    .filter((x) => !x.tag.includes("background"));

  res.status(200).json(data ?? {});
}
