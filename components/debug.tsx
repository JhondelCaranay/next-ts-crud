type DebugProps = {
  data: Object;
  width?: string;
};

const Debug = ({ data, width }: DebugProps) => {
  return process.env.NEXT_PUBLIC_MODE === "development" ? (
    <div className={width ? width : "w-full"}>
      <pre className="mb-4 rounded-md bg-gray-800 p-4 font-mono text-xs text-white">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  ) : null;
};
export default Debug;
