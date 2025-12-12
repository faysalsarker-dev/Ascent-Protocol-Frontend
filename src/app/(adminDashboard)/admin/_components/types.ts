// Admin Dashboard Types

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isVerified: boolean;
  status: "active" | "inactive" | "suspended";
}

export interface AdminStats {
  totalVisitors: number;
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  conversionRate: number;
  avgSessionDuration: number; // in minutes
}

export interface VisitorChartData {
  date: string;
  visitors: number;
}

export type SortOrder = "newest" | "oldest";

export interface UsersFilters {
  search: string;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
}

export interface PaginatedUsers {
  users: AdminUser[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
