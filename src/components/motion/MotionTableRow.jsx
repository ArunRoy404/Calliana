"use client";

import { motion } from "framer-motion";

import { TableRow } from "@/components/shadcn/table";

/**
 * shadcn's `TableRow` as a motion component, so a table row can be a `Reveal`
 * (`<Reveal as={MotionTableRow}>`) and keep every class the primitive owns.
 * Built once here: wrapping it during render would remount the row each time.
 */
const MotionTableRow = motion.create(TableRow);

export default MotionTableRow;
