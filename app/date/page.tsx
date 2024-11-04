import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default function Date() {
  return <h1>{dayjs().format("LLL")}</h1>;
}
