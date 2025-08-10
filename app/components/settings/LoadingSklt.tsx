// components/TextSkeleton.tsx

export default function TextSkeleton({
  width = "w-32",
  height = "h-4",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded ${width} ${height} bg-gray-700`}
    ></div>
  );
}
