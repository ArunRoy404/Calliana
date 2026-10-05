import UserAvatar from "@/components/atoms/UserAvatar";

/**
 * A person's picture and name — Figma 210:44307 (Users & Roles). Every person
 * picture is `UserAvatar` (rule 21); `column.field` names the row's name
 * field, `column.avatarField` an optional image url field.
 */
export default function UserCell({ column, row }) {
  const name = row?.[column?.field];

  return (
    <span className="flex min-w-0 flex-1 items-center gap-2">
      <UserAvatar name={name} src={row?.[column?.avatarField]} size="chip" />
      <span className="text-label-md min-w-0 truncate text-text-primary">
        {name}
      </span>
    </span>
  );
}
