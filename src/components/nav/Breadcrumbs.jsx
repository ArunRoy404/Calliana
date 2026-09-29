import Link from "next/link";

import AssetIcon from "@/components/atoms/AssetIcon";

/**
 * Where a page sits — Figma 198:31040 ("CLIENTS › CLIENT DETAILS"). Every
 * item but the last is a link; the last is the current page, in primary blue.
 * `items` is data: `[{ id, label, href }]`; `separator` is the icon between.
 */
export default function Breadcrumbs({ items = [], separator }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="text-body-lg flex flex-wrap items-center gap-1.5">
        {items?.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={item?.id} className="flex items-center gap-1.5">
              {isCurrent ? (
                <span aria-current="page" className="text-action-primary">
                  {item?.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item?.href ?? "#"}
                    className="text-brand-gray-dark transition-colors duration-200 ease-out hover:text-text-primary"
                  >
                    {item?.label}
                  </Link>
                  <AssetIcon icon={separator} className="shrink-0" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
