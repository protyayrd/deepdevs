export default function AppsPage() {
  // Static data for demonstration
  const apps = [
    {
      id: '1',
      title: 'Sample App 1',
      description: 'A sample application for demonstration',
      slug: 'sample-1',
      iconUrl: '/logo.png',
      featured: true,
    },
    {
      id: '2',
      title: 'Sample App 2',
      description: 'Another sample application',
      slug: 'sample-2',
      iconUrl: '/logo.png',
      featured: false,
    },
    {
      id: '3',
      title: 'Sample App 3',
      description: 'Third sample application',
      slug: 'sample-3',
      iconUrl: '/logo.png',
      featured: true,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Our Apps</h1>
        <p className="mt-2 text-gray-600">Browse all apps managed in the admin panel.</p>

        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app: any) => (
            <li key={app._id} className="rounded-xl border border-gray-200 p-4 bg-white hover:shadow-sm transition">
              <a href={`/apps/${app.slug}`} className="flex items-start gap-3">
                <div className="aspect-[81/159] h-24 rounded-md bg-gray-100 overflow-hidden">
                  {app.iconUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={app.iconUrl} alt={app.title} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{app.title}</div>
                  <div className="text-sm text-gray-600 line-clamp-2">{app.description}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}


