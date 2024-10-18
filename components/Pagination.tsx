import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  export default function Component({ page = 1, totalPages = 1 }: { page?: number; totalPages?: number }) {
    return (
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/posts?page=${page - 1}`} />
            </PaginationItem>
          )}
          
          {page > 2 && (
            <PaginationItem>
              <PaginationLink href="/posts?page=1">1</PaginationLink>
            </PaginationItem>
          )}
          
          {page > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          
          {page > 1 && (
            <PaginationItem>
              <PaginationLink href={`/posts?page=${page - 1}`}>{page - 1}</PaginationLink>
            </PaginationItem>
          )}
          
          <PaginationItem>
            <PaginationLink href={`/posts?page=${page}`} isActive>{page}</PaginationLink>
          </PaginationItem>
          
          {page < totalPages && (
            <PaginationItem>
              <PaginationLink href={`/posts?page=${page + 1}`}>{page + 1}</PaginationLink>
            </PaginationItem>
          )}
          
          {page < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          
          {page < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink href={`/posts?page=${totalPages}`}>{totalPages}</PaginationLink>
            </PaginationItem>
          )}
          
          {page < totalPages && (
            <PaginationItem>
              <PaginationNext href={`/posts?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }