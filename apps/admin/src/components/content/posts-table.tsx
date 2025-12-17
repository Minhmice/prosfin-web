"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { AppDataTable } from "@/components/admin/data-table/app-data-table";
import { TableRowActions, type RowAction } from "@/components/admin/data-table/table-row-actions";
import { Badge, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@prosfin/ui";
import {
  listPosts,
  updatePostStatus,
  deletePost,
  duplicatePost,
  publish,
  unpublish,
  archivePost,
  restorePost,
  publishNow,
  cancelSchedule,
  reschedulePost,
  isSlugUnique,
} from "@/lib/data/posts";
import { formatDistanceToNow } from "date-fns";
import type { Post, PostStatus, ContentBucket } from "@/types/content";
import type { DataTableColumn } from "@/components/admin/data-table/types";
import {
  MoreHorizontal,
  Plus,
  FileEdit,
  Copy,
  Eye,
  Calendar,
  Trash2,
  CheckCircle2,
  XCircle,
  Archive,
  RotateCcw,
  Play,
  X,
  AlertCircle,
} from "lucide-react";

const statusColors: Record<PostStatus, string> = {
  draft: "bg-gray-100 text-gray-800",
  published: "bg-green-100 text-green-800",
  scheduled: "bg-blue-100 text-blue-800",
  archived: "bg-red-100 text-red-800",
};

const bucketLabels: Record<ContentBucket, string> = {
  insights: "Insights",
  resources: "Resources",
  knowledge: "Knowledge",
};

interface PostsTableProps {
  initialBucket?: ContentBucket;
  onEdit?: (post: Post) => void;
  onPreview?: (post: Post) => void;
}

export function PostsTable({ initialBucket, onEdit, onPreview }: PostsTableProps) {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedStatus, setSelectedStatus] = React.useState<PostStatus[]>([]);
  const [selectedBucket, setSelectedBucket] = React.useState<ContentBucket[]>(
    initialBucket ? [initialBucket] : []
  );
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<Post[]>([]);
  const [needsAttentionFilter, setNeedsAttentionFilter] = React.useState(false);

  React.useEffect(() => {
    loadPosts();
  }, [selectedStatus, selectedBucket, selectedTags, needsAttentionFilter]);

  const loadPosts = async () => {
    setIsLoading(true);
    const bucket = selectedBucket.length === 1 ? selectedBucket[0] : undefined;
    let data = await listPosts(bucket, {
      status: selectedStatus.length > 0 ? selectedStatus : undefined,
      bucket: selectedBucket.length > 0 ? selectedBucket : undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    });

    // "Needs attention" filter (mock)
    if (needsAttentionFilter) {
      data = data.filter((post) => {
        const missingCover = !post.cover;
        const missingSEO = !post.seoTitle || !post.seoDescription;
        // Check slug uniqueness (mock - in Phase 3 will be real check)
        return missingCover || missingSEO;
      });
    }

    setPosts(data);
    setIsLoading(false);
  };

  const handleStatusChange = async (postId: string, status: PostStatus) => {
    await updatePostStatus(postId, status);
    loadPosts();
  };

  const handlePublish = async (postId: string) => {
    await publish(postId);
    loadPosts();
  };

  const handleUnpublish = async (postId: string) => {
    await unpublish(postId);
    loadPosts();
  };

  const handleDuplicate = async (post: Post) => {
    await duplicatePost(post.slug, post.bucket);
    loadPosts();
  };

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId);
      loadPosts();
    }
  };

  // Bulk actions
  const handleBulkPublish = async () => {
    if (selectedRows.length === 0) return;
    for (const post of selectedRows) {
      if (post.status !== "published") {
        await publish(post.id);
      }
    }
    loadPosts();
    setSelectedRows([]);
  };

  const handleBulkUnpublish = async () => {
    if (selectedRows.length === 0) return;
    for (const post of selectedRows) {
      if (post.status === "published") {
        await unpublish(post.id);
      }
    }
    loadPosts();
    setSelectedRows([]);
  };

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedRows.length} post(s)?`)) {
      for (const post of selectedRows) {
        await deletePost(post.id);
      }
      loadPosts();
      setSelectedRows([]);
    }
  };

  const handleBulkArchive = async () => {
    if (selectedRows.length === 0) return;
    for (const post of selectedRows) {
      if (post.status !== "archived") {
        await archivePost(post.id);
      }
    }
    loadPosts();
    setSelectedRows([]);
  };

  const handleBulkRestore = async () => {
    if (selectedRows.length === 0) return;
    for (const post of selectedRows) {
      if (post.status === "archived") {
        await restorePost(post.id);
      }
    }
    loadPosts();
    setSelectedRows([]);
  };

  const handleReschedule = async (post: Post) => {
    // TODO: Open schedule dialog
    window.location.assign(`/content/${post.slug}`);
  };

  const handlePublishNow = async (postId: string) => {
    await publishNow(postId);
    loadPosts();
  };

  const handleCancelSchedule = async (postId: string) => {
    await cancelSchedule(postId);
    loadPosts();
  };

  const handleArchive = async (postId: string) => {
    if (confirm("Are you sure you want to archive this post?")) {
      await archivePost(postId);
      loadPosts();
    }
  };

  const handleRestore = async (postId: string) => {
    await restorePost(postId);
    loadPosts();
  };

  const getRowActions = (post: Post): RowAction<Post>[] => {
    const actions: RowAction<Post>[] = [
      {
        label: "Edit",
        onClick: () => onEdit?.(post) || window.location.assign(`/content/${post.slug}`),
      },
    ];

    if (post.status === "draft") {
      actions.push(
        {
          label: "Preview",
          onClick: () => {
            const secret = "your-secret-token";
            window.open(`/api/draft?secret=${secret}&slug=${post.slug}&bucket=${post.bucket}`, "_blank");
          },
        },
        {
          label: "Publish",
          onClick: () => handlePublish(post.id),
        },
        {
          label: "Schedule",
          onClick: () => handleReschedule(post),
        }
      );
    } else if (post.status === "scheduled") {
      actions.push(
        {
          label: "Preview",
          onClick: () => {
            const secret = "your-secret-token";
            window.open(`/api/draft?secret=${secret}&slug=${post.slug}&bucket=${post.bucket}`, "_blank");
          },
        },
        {
          label: "Reschedule",
          onClick: () => handleReschedule(post),
        },
        {
          label: "Publish Now",
          onClick: () => handlePublishNow(post.id),
        },
        {
          label: "Cancel Schedule",
          onClick: () => handleCancelSchedule(post.id),
        }
      );
    } else if (post.status === "published") {
      actions.push(
        {
          label: "Preview Public",
          onClick: () => window.open(`/${post.bucket}/${post.slug}`, "_blank"),
        },
        {
          label: "Unpublish",
          onClick: () => handleUnpublish(post.id),
        },
        {
          label: "Archive",
          onClick: () => handleArchive(post.id),
        }
      );
    } else if (post.status === "archived") {
      actions.push({
        label: "Restore",
        onClick: () => handleRestore(post.id),
      });
    }

    actions.push(
      {
        label: "Duplicate",
        onClick: () => handleDuplicate(post),
      },
      {
        label: "Delete",
        onClick: () => handleDelete(post.id),
        variant: "destructive",
      }
    );

    return actions;
  };

  const columns: DataTableColumn<Post>[] = [
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      enableSorting: true,
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <Link
            href={`/content/${row.original.slug}`}
            className="font-medium hover:underline"
          >
            {row.original.title}
          </Link>
          {row.original.excerpt && (
            <span className="text-sm text-muted-foreground line-clamp-1">
              {row.original.excerpt}
            </span>
          )}
        </div>
      ),
    },
    {
      id: "bucket",
      header: "Bucket",
      accessorKey: "bucket",
      cell: ({ row }) => (
        <Badge variant="outline">{bucketLabels[row.original.bucket]}</Badge>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const post = row.original;
        let hint: string | null = null;

        if (post.status === "scheduled" && post.scheduledFor) {
          try {
            const scheduledDate = new Date(post.scheduledFor);
            const now = new Date();
            if (scheduledDate <= now) {
              hint = "Ready to publish";
            } else {
              hint = `Publishes ${formatDistanceToNow(scheduledDate, { addSuffix: true })}`;
            }
          } catch {
            hint = null;
          }
        } else if (post.status === "published" && post.publishedAt) {
          try {
            hint = `Published ${formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}`;
          } catch {
            hint = null;
          }
        }

        return (
          <div className="flex flex-col gap-1">
            <Badge className={statusColors[post.status]}>
              {post.status}
            </Badge>
            {hint && (
              <span className="text-muted-foreground text-xs">{hint}</span>
            )}
          </div>
        );
      },
    },
    {
      id: "tags",
      header: "Tags",
      accessorKey: "tags",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {row.original.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{row.original.tags.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: "updatedAt",
      header: "Updated",
      accessorKey: "updatedAt",
      enableSorting: true,
      cell: ({ row }) => format(new Date(row.original.updatedAt), "MMM dd, yyyy"),
    },
    {
      id: "publishedAt",
      header: "Published",
      accessorKey: "publishedAt",
      enableSorting: true,
      cell: ({ row }) =>
        row.original.publishedAt
          ? format(new Date(row.original.publishedAt), "MMM dd, yyyy")
          : "-",
    },
    {
      id: "author",
      header: "Author",
      accessorKey: "author",
      cell: ({ row }) => row.original.author.name,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <TableRowActions row={row.original} actions={getRowActions(row.original)} />,
    },
  ];

  // Filter components
  const statusOptions: PostStatus[] = ["draft", "published", "scheduled", "archived"];
  const bucketOptions: ContentBucket[] = ["insights", "resources", "knowledge"];

  const StatusFilter = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" suppressHydrationWarning>
          Status
          {selectedStatus.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedStatus.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {statusOptions.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => {
              setSelectedStatus((prev) =>
                prev.includes(status)
                  ? prev.filter((s) => s !== status)
                  : [...prev, status]
              );
            }}
          >
            <div className="flex items-center gap-2">
              {selectedStatus.includes(status) && <CheckCircle2 className="size-4" />}
              <span className="capitalize">{status}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const NeedsAttentionFilter = () => (
    <Button
      variant={needsAttentionFilter ? "default" : "outline"}
      size="sm"
      onClick={() => setNeedsAttentionFilter(!needsAttentionFilter)}
    >
      <AlertCircle className="mr-2 size-4" />
      Needs Attention
    </Button>
  );

  const BucketFilter = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" suppressHydrationWarning>
          Bucket
          {selectedBucket.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedBucket.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {bucketOptions.map((bucket) => (
          <DropdownMenuItem
            key={bucket}
            onClick={() => {
              setSelectedBucket((prev) =>
                prev.includes(bucket)
                  ? prev.filter((b) => b !== bucket)
                  : [...prev, bucket]
              );
            }}
          >
            <div className="flex items-center gap-2">
              {selectedBucket.includes(bucket) && <CheckCircle2 className="size-4" />}
              <span>{bucketLabels[bucket]}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const hasFilters = selectedStatus.length > 0 || selectedBucket.length > 0 || selectedTags.length > 0;
  const isEmpty = !isLoading && posts.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusFilter />
          {!initialBucket && <BucketFilter />}
          <NeedsAttentionFilter />
          {selectedRows.length > 0 && (
            <>
              <div className="mx-2 h-6 w-px bg-border" />
              <span className="text-sm text-muted-foreground">
                {selectedRows.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkPublish}
              >
                Publish
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkUnpublish}
              >
                Unpublish
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkArchive}
              >
                <Archive className="mr-2 size-4" />
                Archive
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkRestore}
              >
                <RotateCcw className="mr-2 size-4" />
                Restore
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                className="text-destructive"
              >
                Delete
              </Button>
            </>
          )}
        </div>
        <Link href="/content/new">
          <Button>
            <Plus className="mr-2 size-4" />
            New Post
          </Button>
        </Link>
      </div>
      <AppDataTable
        columns={columns}
        data={posts}
        isLoading={isLoading}
        enableRowSelection={true}
        onSelectionChange={setSelectedRows}
        searchPlaceholder="Search posts..."
        emptyMessage={isEmpty && !hasFilters ? "No posts yet" : "No results found"}
        emptyStateTitle={isEmpty && !hasFilters ? "No posts yet" : "No results found"}
        emptyStateDescription={
          isEmpty && !hasFilters
            ? "Get started by creating your first post"
            : hasFilters
            ? "Try adjusting your filters to see more results"
            : undefined
        }
      />
    </div>
  );
}

