"use client";

import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import FilterSelect from "@/components/forms/FilterSelect";
import SearchField from "@/components/forms/SearchField";
import DataTable from "@/components/tables/DataTable";
import TableCard from "@/components/tables/TableCard";
import TableCardList from "@/components/tables/TableCardList";
import TablePagination from "@/components/tables/TablePagination";
import TableToolbar from "@/components/tables/TableToolbar";
import { useTableView } from "@/hooks/useTableView";

/**
 * A whole list screen — Figma 198:22835 (agents) and 198:21625 (clients) —
 * from any store made by `createTableStore`.
 *
 * The toolbar holds the search, one select per `content.filters` entry, the
 * rows-per-page select and the add action; the table shows from `xl` up and
 * the same rows as cards below it; the pager sits underneath. Everything it
 * shows comes from the store's `content` and the URL (`useTableView`), and
 * every change writes the URL, so any view of a list is a link.
 *
 * `onRowAction(row, action)` handles row actions that do not navigate.
 */
export default function TableDirectory({ useStore, onRowAction, actionProps }) {
  const content = useStore((state) => state.content);
  const pageSizeLabel = useStore((state) => state.pageSizeLabel);
  const pageSizeOptions = useStore((state) => state.pageSizeOptions);
  const setQuery = useStore((state) => state.setQuery);
  const setFilter = useStore((state) => state.setFilter);
  const setPageSize = useStore((state) => state.setPageSize);
  const nextPage = useStore((state) => state.nextPage);
  const previousPage = useStore((state) => state.previousPage);
  const openAdd = useStore((state) => state.openAdd);
  const { query, filters, pageSize, visibleRows, page, pageCount, summary } =
    useTableView(useStore);

  return (
    <TableCard
      texture={content?.texture}
      toolbar={
        <TableToolbar
          start={
            <>
              <SearchField
                search={content?.search}
                value={query}
                onValueChange={setQuery}
                size="sm"
                className="w-full sm:w-[350px]"
              />
              {content?.filters?.map((filter) => (
                <FilterSelect
                  key={filter?.param}
                  label={filter?.label}
                  options={filter?.options}
                  value={filters?.[filter?.param]}
                  onValueChange={(value) => setFilter?.(filter?.param, value)}
                />
              ))}
              <FilterSelect
                label={pageSizeLabel}
                options={pageSizeOptions}
                value={`${pageSize}`}
                onValueChange={setPageSize}
              />
            </>
          }
          end={
            content?.addAction && (
              <Button variant="toolbar" size="sm" onClick={openAdd}>
                <AssetIcon icon={content?.addAction?.icon} />
                {content?.addAction?.label}
              </Button>
            )
          }
        />
      }
      footer={
        <TablePagination
          summary={summary}
          page={page}
          pageCount={pageCount}
          previousLabel={content?.pagination?.previousLabel}
          nextLabel={content?.pagination?.nextLabel}
          onPrevious={previousPage}
          onNext={nextPage}
        />
      }
    >
      <div className="hidden xl:block">
        <DataTable
          columns={content?.columns}
          rows={visibleRows}
          emptyLabel={content?.emptyLabel}
          onRowAction={onRowAction}
          actionProps={actionProps}
          className={content?.tableClassName}
        />
      </div>

      <TableCardList
        rows={visibleRows}
        layout={content?.card}
        emptyLabel={content?.emptyLabel}
        onRowAction={onRowAction}
        actionProps={actionProps}
        className="xl:hidden"
      />
    </TableCard>
  );
}
