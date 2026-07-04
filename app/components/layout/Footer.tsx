export default function Footer() {
  return (
    <footer className="w-full bg-white text-black border-t border-black/10 mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">Masoud Jafari</h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Full-Stack Developer focused on building modern, fast and scalable web applications.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-black cursor-pointer">Home</li>
              <li className="hover:text-black cursor-pointer">About</li>
              <li className="hover:text-black cursor-pointer">Projects</li>
              <li className="hover:text-black cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-gray-600">Email: masoud@example.com</p>
            <p className="text-gray-600">Location: Azerbaijan</p>

            <div className="flex gap-4 mt-4">
              <a className="text-gray-600 hover:text-black">GitHub</a>
              <a className="text-gray-600 hover:text-black">LinkedIn</a>
              <a className="text-gray-600 hover:text-black">Twitter</a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-black/10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Masoud Jafari. All rights reserved.
        </div>

      </div>
    </footer>
  );
}