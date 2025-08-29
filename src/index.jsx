import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">🚀 Welcome to My Portfolio</h1>
        <p className="text-lg mb-6">Showcasing my projects and skills with Next.js</p>
        <Link
          href="/about"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Learn More About Me
        </Link>
      </section>

      {/* Placeholder for Projects */}
      <section className="w-full max-w-4xl mt-16">
        <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">Project 1</div>
          <div className="p-6 bg-white rounded-lg shadow-md">Project 2</div>
        </div>
      </section>
    </main>
  );
}