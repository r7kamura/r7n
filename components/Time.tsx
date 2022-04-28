import { formatInTimeZone } from "date-fns-tz";

export default function Time({ date }: { date: string }) {
  const isoString = `${date}T00:00+0900`;
  return (
    <time dateTime={isoString}>
      {formatInTimeZone(new Date(isoString), "Asia/Tokyo", "yyyy年MM月dd日")}
    </time>
  );
}
