/* eslint-disable react/display-name */
import { TagLayout } from "../../comps/TagLayout";
import { generatePaths } from "../../lib";

const Eksempel = ({ ...props }) => <TagLayout {...(props as any)} />;

export const getStaticPaths = async () => await generatePaths("ikoner");

export async function getStaticProps({ params: { element } }) {
  return {
    props: {
      type: "ikoner",
      name: element[0],
      prop: element?.[1]?.toLowerCase() ?? null,
    },
  };
}

export default Eksempel;
