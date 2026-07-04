export default function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      text: "Working with Masoud was an amazing experience. The quality of code and UI design was outstanding.",
    },
    {
      name: "Sarah Smith",
      role: "UI/UX Designer",
      text: "Very clean and modern implementations. He understands both design and development deeply.",
    },
    {
      name: "Ali Reza",
      role: "Project Manager",
      text: "Fast delivery, clean architecture, and great communication throughout the project.",
    },
  ];

  return (
    <section className="w-full bg-white text-black py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          Testimonials
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="border border-black/10 rounded-2xl p-6 hover:shadow-md transition"
            >
              <p className="text-gray-700 leading-relaxed">
                &quot;{item.text}&quot;
              </p>

              <div className="mt-6">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}