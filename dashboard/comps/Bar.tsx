export const NeutralBar = ({ percentage }: { percentage: string }) => {
  return (
    <span className="flex h-2 bg-gray-600 w-full rounded-sm">
      <span
        style={{ width: percentage }}
        className="h-2 bg-gradient-to-r from-sky-500 to-sky-300 rounded-sm"
      />
    </span>
  );
};
