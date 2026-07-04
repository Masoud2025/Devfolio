export default function ContactMe() {
  return (
    <section className="w-full bg-white text-black py-20 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Contact Me
        </h2>

        <form className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-black/20 rounded-xl focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="Enter subject"
              className="w-full px-4 py-3 border border-black/20 rounded-xl focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
          >
            Send Message
          </button>

        </form>
      </div>
    </section>
  );
}