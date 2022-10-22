export const NeutralBar = ({ percentage }: { percentage: string }) => {
  return (
    <span className="flex h-2 bg-gray-600 w-full rounded-sm relative">
      <span
        style={{ width: percentage }}
        className="[mask:linear-gradient(#fff_0_0)] h-2 before:bg-gradient-to-r before:from-sky-500 before:to-sky-300 rounded-sm before:absolute before:inset-0"
      />
    </span>
  );
};

export const DangerBar = ({ percentage }: { percentage: string }) => {
  return (
    <span className="flex h-2 bg-gray-600 w-full rounded-sm relative">
      <span
        style={{ width: percentage }}
        className="[mask:linear-gradient(#fff_0_0)] h-2 before:bg-gradient-to-r before:from-rose-500 before:to-rose-700 rounded-sm before:absolute before:inset-0"
      />
    </span>
  );
};
