import { ChevronRight, Phone, Mail, Star, Truck, Shield } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Image Section */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BD8AC9173B7D49E813F8A58426_1622392046533.jpg-yBwD0pnGE4Yl3DwM09CGKnsssFk9Og.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/30 to-transparent z-20" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/30 to-transparent z-20" />
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/20 z-20" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/20 z-20" />

      {/* Content Section */}
      <div className="relative z-30 container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl text-white space-y-8">
          {/* Logo Section */}
          <div className="mb-16 relative">
            <h2 className="text-4xl font-semibold text-green-400 mb-1">Smart ItBox</h2>
            <p className="text-2xl text-gray-200">RICE TRADERS</p>
            <div className="absolute -top-6 -left-6 w-16 h-16 border-2 border-green-400 rounded-full opacity-20" />
          </div>

          {/* Main Content */}
          <h1 className="text-7xl font-bold leading-tight">
            Finest Quality Rice
            <span className="block text-5xl font-normal mt-4 text-gray-200">
              at Affordable Rate
            </span>
          </h1>

          <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
            Experience the perfect blend of tradition and quality with our premium selection of rice varieties. Direct from the finest farms to your table, ensuring unmatched freshness and flavor in every grain.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 pt-8">
  <button
    className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 text-lg rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    Enquire Now
    {/* <ChevronRight className="ml-2 h-6 w-12" /> */}
  </button>
  <button
    className="bg-white/10 hover:bg-white/20 border-white text-white px-8 py-2 text-lg rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    View Products
  </button>
</div>



          {/* Contact Information */}
          <div className="pt-16 flex flex-col sm:flex-row gap-8 text-gray-200">
            <div className="flex items-center gap-3 bg-white/10 rounded-full px-6 py-3 transition-all duration-300 hover:bg-white/20">
              <Phone className="h-6 w-6 text-green-400" />
              <span className="text-lg">+91-8888888888</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-full px-6 py-3 transition-all duration-300 hover:bg-white/20">
              <Mail className="h-6 w-6 text-green-400" />
              <span className="text-lg">ceo@smartitbox.in</span>
            </div>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="absolute bottom-10 right-10 hidden lg:flex gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white text-center transition-all duration-300 hover:bg-white/20 hover:scale-105">
            <Star className="h-10 w-10 text-yellow-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">100%</p>
            <p className="text-sm">Pure Quality</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white text-center transition-all duration-300 hover:bg-white/20 hover:scale-105">
            <Truck className="h-10 w-10 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">Fast</p>
            <p className="text-sm">Delivery</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white text-center transition-all duration-300 hover:bg-white/20 hover:scale-105">
            <Shield className="h-10 w-10 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">Secure</p>
            <p className="text-sm">Transactions</p>
          </div>
        </div>
      </div>
    </main>
  );
}
