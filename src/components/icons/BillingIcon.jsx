import IconBase from "@/components/icons/IconBase";

/** vuesax/bold/card — sidebar Billing (client role). See AGENTS.md rule 30. */
export default function BillingIcon(props) {
  return (
    <IconBase {...props}>
      <path
        fill="currentColor"
        d="M18.333 7.559H1.667V6.25c0-2.517 1.35-3.917 3.75-3.917h9.166c2.4 0 3.75 1.4 3.75 3.917v1.309Z"
      />
      <path
        fill="currentColor"
        d="M1.667 9.059v4.191c0 2.517 1.35 3.917 3.75 3.917h9.166c2.4 0 3.75-1.4 3.75-3.917V9.059H1.667Zm5.416 5.983H5.417a.627.627 0 0 1-.625-.625c0-.342.283-.625.625-.625h1.666c.342 0 .625.283.625.625 0 .341-.283.625-.625.625Zm5.834 0h-3.334a.627.627 0 0 1-.625-.625c0-.342.284-.625.625-.625h3.334c.341 0 .625.283.625.625 0 .341-.284.625-.625.625Z"
      />
    </IconBase>
  );
}
