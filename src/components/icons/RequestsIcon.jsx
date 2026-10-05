import IconBase from "@/components/icons/IconBase";

/**
 * vuesax/bold/document-text style — the client sidebar's Requests row.
 * Redrawn to match the rendered screenshot; not an exact Figma export
 * (rule 31): a filled page with a folded top-right corner and two text
 * lines cut out of it.
 */
export default function RequestsIcon(props) {
  return (
    <IconBase {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.833 1.667h5.417v3.125c0 1.15.933 2.083 2.083 2.083h3v7.292c0 2.3-1.866 4.166-4.166 4.166H5.833a4.167 4.167 0 0 1-4.166-4.166V5.833a4.167 4.167 0 0 1 4.166-4.166Zm.834 9.166a.625.625 0 1 0 0 1.25h5a.625.625 0 1 0 0-1.25h-5Zm0 3.334a.625.625 0 1 0 0 1.25h3.333a.625.625 0 1 0 0-1.25H6.667Z"
      />
      <path
        fill="currentColor"
        d="M12.5 2.15v2.642c0 .46.373.833.833.833h2.65L12.5 2.15Z"
      />
    </IconBase>
  );
}
