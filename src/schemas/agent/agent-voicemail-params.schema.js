import { voicemailData } from "@/data/agent/voicemail.data";
import { CALLS_PARAM_KEYS } from "@/schemas/calls/calls-params.schema";
import {
  createListParamsSchema,
  filterParamsFrom,
  optionalIdParam,
} from "@/schemas/url/list-params.schema";

/**
 * Everything the agent's Voicemail page keeps in its URL —
 * `/agent/voicemail?q=isabel&status=pending&callback=pending&page=2` for the
 * list, plus `&call=<id>` for an open voicemail's details (the same key as
 * the call log's, since a voicemail is a call).
 */
export const agentVoicemailParamsSchema = createListParamsSchema({
  filters: filterParamsFrom(voicemailData?.filters),
  extra: { [CALLS_PARAM_KEYS.call]: optionalIdParam },
});
