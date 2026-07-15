import { redirect } from "next/navigation";

const SettingsIndexPage = () => {
  redirect("/dashboard/settings/edit-profile");
};

export default SettingsIndexPage;
