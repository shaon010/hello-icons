import { getIcons } from "@/lib/data/icons";
import IconGridClient from "./IconGridClient";

export default async function IconGrid() {
  const icons = await getIcons();
  return <IconGridClient icons={icons} />;
}
