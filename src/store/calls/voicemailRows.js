import { callsData } from "@/data/admin/calls.data";
import {
  CALLBACKS,
  TRANSCRIPTIONS,
  VOICEMAIL_STATUSES,
  voicemailData,
} from "@/data/admin/voicemail.data";

const VOICEMAILS = voicemailData?.voicemails ?? {};

/**
 * Each voicemail: its call from the call log joined with what the voicemail
 * has of its own — the badges the list shows, the keys its filters match,
 * and the drawers' received time, length, callback state and transcript.
 * Calls without a voicemail are not listed. Built once, and read by both
 * portals' voicemail lists (rule 29: one record set, one source).
 */
export const voicemailRows =
  callsData?.rows
    ?.filter((row) => VOICEMAILS?.[row?.id])
    ?.map((row) => {
      const voicemail = VOICEMAILS?.[row?.id];
      const callback = CALLBACKS?.[voicemail?.callback];

      return {
        ...row,
        voicemailKey: voicemail?.status,
        voicemailStatus: VOICEMAIL_STATUSES?.[voicemail?.status]?.badge,
        transcriptionStatus: TRANSCRIPTIONS?.[voicemail?.transcription],
        callbackKey: voicemail?.callback,
        callbackStatus: callback?.badge,
        callbackLabel: callback?.badge?.label,
        received: voicemail?.received,
        voicemailLength: voicemail?.voicemailLength,
        transcription: voicemail?.transcript,
      };
    }) ?? [];
