import React from 'react';

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      {/* Header / Logo */}
      <header className="bg-primary text-bg py-12 flex flex-col items-center">
        <img
          src="/zw-logo.ico"
          alt="ZeroWords Logo"
          className="w-28 h-28 mb-6"
        />
        <h1 className="text-4xl font-bold mb-2">ZeroWords</h1>
        <p className="mt-3 text-lg text-bg/90 text-center max-w-xl px-6">
          A personal blog to share thoughts, experiences, and stories in words and wisdom.
        </p>
      </header>

      {/* About Section */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-heading">About ZeroWords</h2>
          <p className="text-lg text-text/90 leading-relaxed">
            ZeroWords is a personal blogging platform I created as a project to share my
            experiences, insights, and creative ideas with the world. Here, words carry
            thoughts beyond the ordinary, and every post is written with passion and clarity.
          </p>
        </section>

        {/* Developer Info */}
        <section className="text-center mt-12">
          <p className="text-lg text-text/70">
            Developed by{' '}
            <a
              href="https://pavishk.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Pc
            </a>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-text py-8 text-center text-lg">
        © {new Date().getFullYear()} ZeroWords. All rights reserved.
      </footer>
    </div>
  );
}

export default About;
