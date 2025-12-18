export default function ContentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content: {params.slug}</h1>
        <p className="text-muted-foreground">Content detail page</p>
      </div>
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">Content detail coming soon...</p>
      </div>
    </div>
  );
}
