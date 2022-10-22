// To parse this data:
//
//   import { Convert, DataT } from "./file";
//
//   const dataT = Convert.toDataT(json);

export interface DataT {
  elementer?: Elementer[];
  komponenter?: Komponenter[];
  ikoner?: Ikoner[];
  css?: CSS;
}

interface CSS {
  mediaQueries?: string[];
  selectors?: Selector[];
  declarations?: { [key: string]: string[] };
}

interface Selector {
  file?: string;
  val?: string;
}

interface Elementer {
  name?: string;
  val?: ElementerVal;
}

interface ElementerVal {
  uses?: number;
  instances?: PurpleInstance[];
  props?: { [key: string]: number };
}

interface PurpleInstance {
  props?: { [key: string]: any };
  propsSpread?: boolean;
  location?: Location;
}

interface Location {
  file?: string;
  start?: {
    line?: number;
    column?: number;
  };
}

interface Ikoner {
  name?: string;
  val?: IkonerVal;
}

interface IkonerVal {
  uses?: number;
  instances?: FluffyInstance[];
  props?: { [key: string]: number };
}

interface FluffyInstance {
  importInfo?: ImportInfo;
  props?: { [key: string]: number };
  propsSpread?: boolean;
  location?: Location;
}

interface ImportInfo {
  imported?: string;
  local?: string;
  moduleName?: ModuleName;
  importType?: ImportType;
}

enum ImportType {
  ImportDefaultSpecifier = "ImportDefaultSpecifier",
  ImportSpecifier = "ImportSpecifier",
}

enum ModuleName {
  NaviktDsIcons = "@navikt/ds-icons",
  NaviktDsIconsCjs = "@navikt/ds-icons/cjs",
  NaviktDsIconsEsmBellFilled = "@navikt/ds-icons/esm/BellFilled",
  NaviktDsIconsEsmEmailFilled = "@navikt/ds-icons/esm/EmailFilled",
  NaviktDsReact = "@navikt/ds-react",
  NaviktDsReactCjs = "@navikt/ds-react/cjs",
  NaviktDsReactEsmModalModalContent = "@navikt/ds-react/esm/modal/ModalContent",
  NaviktDsReactEsmPaginationPaginationItem = "@navikt/ds-react/esm/pagination/PaginationItem",
  NaviktDsReactEsmTabsTab = "@navikt/ds-react/esm/tabs/Tab",
  NaviktDsReactInternal = "@navikt/ds-react-internal",
  NaviktDsReactSrc = "@navikt/ds-react/src",
}

interface Komponenter {
  name?: string;
  val?: KomponenterVal;
}

interface KomponenterVal {
  uses?: number;
  instances?: TentacledInstance[];
  props?: { [key: string]: number };
}

interface TentacledInstance {
  importInfo?: ImportInfo;
  props?: { [key: string]: number };
  propsSpread?: boolean;
  location?: Location;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toDataT(json: string): DataT {
    return JSON.parse(json);
  }

  public static dataTToJson(value: DataT): string {
    return JSON.stringify(value);
  }
}
