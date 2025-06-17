import { useEffect } from "react";
import ApplicationForm from "@/components/ApplicationForm";
import Logo from "@/components/Logo";

export default function Apply() {
  useEffect(() => {
    // Update page title for iframe embedding
    document.title = "Rental Application - Rent Control";
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <Logo />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Rental Application</h1>
          <p className="text-lg text-neutral-600">
            Apply for a unit in our property. Fill out the form below to get started.
          </p>
        </div>

        <ApplicationForm />

        {/* Embeddable Widget Info */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-neutral-200">
          <div className="border-b border-neutral-200 p-6">
            <h3 className="text-xl font-bold text-neutral-900">Embed This Form</h3>
            <p className="text-neutral-600 mt-1">Use this code to embed the application form on your website</p>
          </div>
          
          <div className="p-6">
            <div className="bg-neutral-900 rounded-lg p-4 mb-4">
              <code className="text-green-400 text-sm font-mono break-all">
                {`<iframe src="${window.location.origin}/apply" width="100%" height="800px" frameborder="0"></iframe>`}
              </code>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-neutral-600">This iframe will display your rental application form on any website</p>
              <button 
                className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `<iframe src="${window.location.origin}/apply" width="100%" height="800px" frameborder="0"></iframe>`
                  );
                }}
              >
                Copy Code
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
