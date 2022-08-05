import { AvatarVariants } from "@snapchat/minis-sdk";

export const getAvatarOptions = (): {
  label: string;
  value: AvatarVariants;
}[] => {
  const avatarValues = Object.values(AvatarVariants);
  return Object.keys(AvatarVariants)
    .map((k, i) => {
      return { label: k, value: avatarValues[i] };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
};
