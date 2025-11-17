import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 py-4 text-center text-sm text-gray-400">
      <div className="container mx-auto">
        <span>© {year} TodoApp</span>
        <span className="mx-2">·</span>
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Source
        </a>
      </div>
    </footer>
  );
};

export default Footer;
