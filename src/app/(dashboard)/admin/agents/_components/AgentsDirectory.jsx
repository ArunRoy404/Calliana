"use client";

import AgentCardContainer from "@/components/agents/AgentCardContainer";
import AppImage from "@/components/atoms/AppImage";
import Button from "@/components/atoms/Button";
import FilterSelect from "@/components/forms/FilterSelect";
import SearchField from "@/components/forms/SearchField";
import DataTable from "@/components/tables/DataTable";
import TableCard from "@/components/tables/TableCard";
import TablePagination from "@/components/tables/TablePagination";
import TableToolbar from "@/components/tables/TableToolbar";
import { useAgentsStore } from "@/store/admin/useAgentsStore";

/**
 * Agents directory — Figma 198:22835.
 *
 * A composition of the reusable table pieces; everything it shows and every
 * action it takes comes from `useAgentsStore`.
 *
 * From `xl` up the agents are a table; below it the same page of rows becomes
 * cards, since ten columns cannot fit a phone or tablet. Toolbar and pager are
 * shared by both views.
 */
export default function AgentsDirectory() {
  const content = useAgentsStore((state) => state.content);
  const query = useAgentsStore((state) => state.query);
  const filter = useAgentsStore((state) => state.filter);
  const pageSize = useAgentsStore((state) => state.pageSize);
  const pageSizeLabel = useAgentsStore((state) => state.pageSizeLabel);
  const pageSizeOptions = useAgentsStore((state) => state.pageSizeOptions);
  const rows = useAgentsStore((state) => state.visibleRows);
  const page = useAgentsStore((state) => state.page);
  const pageCount = useAgentsStore((state) => state.pageCount);
  const summary = useAgentsStore((state) => state.summary);
  const setQuery = useAgentsStore((state) => state.setQuery);
  const setFilter = useAgentsStore((state) => state.setFilter);
  const setPageSize = useAgentsStore((state) => state.setPageSize);
  const nextPage = useAgentsStore((state) => state.nextPage);
  const previousPage = useAgentsStore((state) => state.previousPage);

  const notFunctional = {
    notFunctional: true,
    notFunctionalMessage: content?.notFunctionalMessage,
    notFunctionalDescription: content?.notFunctionalDescription,
  };

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
              <FilterSelect
                label={content?.filter?.label}
                options={content?.filter?.options}
                value={filter}
                onValueChange={setFilter}
              />
              <FilterSelect
                label={pageSizeLabel}
                options={pageSizeOptions}
                value={`${pageSize}`}
                onValueChange={setPageSize}
              />
            </>
          }
          end={
            <Button variant="toolbar" size="sm" {...notFunctional}>
              <AppImage
                src={content?.addAction?.icon?.src}
                width={content?.addAction?.icon?.width}
                height={content?.addAction?.icon?.height}
              />
              {content?.addAction?.label}
            </Button>
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
          rows={rows}
          emptyLabel={content?.emptyLabel}
          actionProps={notFunctional}
          className={content?.tableClassName}
        />
      </div>

      <AgentCardContainer
        rows={rows}
        layout={content?.card}
        emptyLabel={content?.emptyLabel}
        actionProps={notFunctional}
        className="xl:hidden"
      />
    </TableCard>
  );
}
