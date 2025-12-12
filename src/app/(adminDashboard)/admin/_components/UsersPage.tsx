"use client";

import { useState, useCallback } from "react";
import { Search, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Badge } from "@/src/components/ui/badge";
import { useDebounce } from "@/src/hooks/useDebounce";
import { SortOrder, AdminUser } from "./types";
import { UserEditDialog } from "./UserEditDialog";
import { UserDeleteDialog } from "./UserDeleteDialog";
import { useUsers } from "@/src/hooks/useAdmin";

const PAGE_SIZE = 5;















export function UsersPage() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [page, setPage] = useState(1);
  
  // Dialog states
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);

  const debouncedSearch = useDebounce(search, 300);
const limit = 10

const {data ,isLoading,refetch} = useUsers(page,limit,debouncedSearch,sortOrder)

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  }, []);

  const handleSortChange = useCallback((order: SortOrder) => {
    setSortOrder(order);
    setPage(1);
  }, []);

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "d MMMM yyyy");
  };

  const getStatusBadge = (status: AdminUser["status"]) => {
    const variants: Record<AdminUser["status"], "default" | "secondary" | "destructive"> = {
      active: "default",
      inactive: "secondary",
      suspended: "destructive",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage all registered users</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Sort: {sortOrder === "newest" ? "Newest" : "Oldest"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSortChange("newest")}>
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("oldest")}>
              Oldest First
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-28" /></TableCell>
                  <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : data?.data?.users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              data?.data?.users.map((user:AdminUser) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(user.createdAt)}</TableCell>
                  <TableCell className="hidden sm:table-cell">{getStatusBadge("active")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setEditUser(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDeleteUser(user)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data?.data?.page > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, data?.data?.total)} of {data?.data?.total}
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: data?.data?.page }).map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setPage(i + 1)}
                    isActive={page === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(data?.data?.page, p + 1))}
                  className={page === data?.data?.page ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Dialogs */}
      <UserEditDialog user={editUser} onClose={() => setEditUser(null)} />
    
    <UserDeleteDialog
  user={deleteUser}
  onClose={() => {
    setDeleteUser(null);
    refetch();       
  }}
/>

    </div>
  );
}
