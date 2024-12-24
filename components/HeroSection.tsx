// components/HeroSection.tsx
export default function HeroSection() {
    return (
      <section className="relative h-64 bg-gray-200">
        <img
          src="https://www.fashionkida.com/cdn/shop/files/2_2b7fc7a3-f519-4e04-a946-5e1961bf8f2b_1200x.jpg?v=1613791870"
          alt="Fashion Jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold">Discover Fashion Jewelry</h2>
        </div>
      </section>
    );
  }
  