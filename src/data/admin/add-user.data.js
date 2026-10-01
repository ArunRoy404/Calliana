import { USER_ROLE_OPTIONS } from "@/data/admin/users.data";

/**
 * "Add User" side panel — the users toolbar's primary action. Field `name`s
 * match the keys in `src/schemas/users/add-user.schema.js`.
 */
export const addUserData = {
  title: "ADD USER",
  subtitle: "Create an account and set its role and access.",

  fields: {
    name: {
      name: "name",
      label: "FULL NAME",
      type: "text",
      autoComplete: "name",
      placeholder: "Jane Doe",
    },
    email: {
      name: "email",
      label: "EMAIL",
      type: "email",
      autoComplete: "email",
      placeholder: "contact@gmail.com",
    },
  },

  sections: {
    access: "ROLE & ACCESS*",
  },

  selects: {
    role: {
      name: "role",
      label: "ROLE",
      options: USER_ROLE_OPTIONS,
    },
    status: {
      name: "status",
      label: "INITIAL STATUS",
      options: [
        { value: "invited", label: "Invited (send setup email)" },
        { value: "active", label: "Active" },
      ],
    },
  },

  notice: {
    icon: { src: "/icons/sms-primary.svg", width: 24, height: 24 },
    title: "Invitation email will be sent",
    description: "The user will receive a setup link to create their password.",
  },

  footer: {
    requiredMark: "*",
    requiredNote: "Required fields",
    cancelLabel: "Cancel",
    submitLabel: "Add User",
  },

  notFunctionalMessage: "User creation isn’t wired up yet",
  notFunctionalDescription:
    "The details are valid — the account will be created once the backend is connected.",
};
