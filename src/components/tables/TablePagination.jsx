import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";

/**
 * Table footer — Figma 198:23009: a summary on the left, pager on the right.
 * Prev and Next disable themselves at either end.
 */
export default function TablePagination({
  summary,
  page = 1,
  pageCount = 1,
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-2.5">
      <p className="text-label-md text-text-secondary">{summary}</p>

      <nav aria-label="Pagination" className="flex items-stretch gap-2.5">
        <Button
          variant="outline"
          size="xs"
          isDisabled={page <= 1}
          onClick={onPrevious}
        >
          <Icon name="ArrowLeft" size={16} />
          {previousLabel}
        </Button>

        <span
          aria-current="page"
          className="text-label-md flex size-8 items-center justify-center rounded-4 border border-solid border-border-default bg-surface-subtle text-text-primary"
        >
          {page}
        </span>

        <Button
          variant="outline"
          size="xs"
          isDisabled={page >= pageCount}
          onClick={onNext}
        >
          {nextLabel}
          <Icon name="ArrowRight" size={16} />
        </Button>
      </nav>
    </div>
  );
}
