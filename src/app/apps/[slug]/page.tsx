export default function AppDetailPage({ params }: { params: { slug: string } }) {
  // Static data for demonstration
  const apps = [
    {
      id: '1',
      title: 'Sample App 1',
      description: 'A sample application for demonstration',
      slug: 'sample-1',
      iconUrl: '/logo.png',
      featured: true,
      longDescription: 'This is a detailed description of Sample App 1. It demonstrates various features and capabilities.',
    },
    {
      id: '2',
      title: 'Sample App 2',
      description: 'Another sample application',
      slug: 'sample-2',
      iconUrl: '/logo.png',
      featured: false,
      longDescription: 'This is a detailed description of Sample App 2. It showcases different functionality.',
    },
    {
      id: '3',
      title: 'Sample App 3',
      description: 'Third sample application',
      slug: 'sample-3',
      iconUrl: '/logo.png',
      featured: true,
      longDescription: 'This is a detailed description of Sample App 3. It provides comprehensive features.',
    },
  ];

  const app = apps.find(a => a.slug === params.slug);

  if (!app) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold">App not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="aspect-[81/159] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {app.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={app.iconUrl} alt={app.title} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gray-100" />
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{app.title}</h1>
            <p className="mt-5 text-lg text-gray-700 leading-relaxed">{app.description}</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="text-sm text-gray-500">Category</div>
                <div className="mt-1 font-semibold text-gray-900">General</div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="text-sm text-gray-500">Status</div>
                <div className="mt-1 font-semibold text-gray-900">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


