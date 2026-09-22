/**
 * Copy and imagery for the auth hero panel — Figma 43:7777.
 * Consumed through `useAuthContentStore`, never imported by a component.
 */
export const authHeroData = {
  backdrop: {
    src: "/auth/hero.png",
    // Figma scales the photo to 209.05% and offsets it -31.86%. Its natural
    // aspect (1.5) equals the crop's, so the scale is uniform and object-cover
    // reproduces it exactly — the offset becomes this object-position.
    imageClassName: "object-cover object-[29.21%_50%]",
    // It sits at 20% over a flat wash, which is what mutes it enough for the
    // white copy to read.
    opacityClassName: "opacity-20",
  },

  badge: {
    icon: { src: "/auth/pill-dot.svg", width: 8, height: 8 },
    label: "Always connected",
  },

  headlineLines: ["Every call.", "Every client."],

  subheadline:
    "Manage calls, messages, appointments and client requests — all in one focused workspace.",

  features: [
    {
      id: "live-calls",
      icon: { src: "/icons/call.svg", width: 24, height: 24 },
      title: "Live Call Management",
      body: "Answer, track and resolve calls",
    },
    {
      id: "appointments",
      icon: { src: "/icons/calendar.svg", width: 24, height: 24 },
      title: "Smart Appointments",
      body: "Schedule and manage availability",
    },
    {
      id: "messages",
      icon: { src: "/icons/message.svg", width: 24, height: 24 },
      title: "Messages & Voicemail",
      body: "SMS, chat and voice in one place",
    },
    {
      id: "tasks",
      icon: { src: "/icons/checked-white.svg", width: 21.0462, height: 18.9249 },
      title: "Tasks & Follow-ups",
      body: "Never miss the next action",
    },
  ],
};
