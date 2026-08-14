export function SpotifyPodcast() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-navy mb-4">
            Listen to Sounia's Podcast
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get insights on stock market investing, financial freedom, and wealth building strategies
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Spotify Embed */}
          <div className="w-full md:w-1/2 flex justify-center">
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/show/033hurWHniBuxqx1hGmjjp?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Podcast"
            ></iframe>
          </div>

          {/* Description */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-navy mb-4">
              Stock Market Made Easy Podcast
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Join Sounia Gill as she breaks down complex stock market concepts into simple, actionable strategies. Whether you're a beginner or experienced investor, this podcast will help you make informed financial decisions.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-gold font-bold mr-3">✓</span>
                <span className="text-gray-700">Weekly episodes on stock market trends</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold font-bold mr-3">✓</span>
                <span className="text-gray-700">Expert interviews with successful investors</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold font-bold mr-3">✓</span>
                <span className="text-gray-700">Practical tips for building your portfolio</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold font-bold mr-3">✓</span>
                <span className="text-gray-700">Q&A sessions from our community</span>
              </li>
            </ul>
            <a
              href="https://open.spotify.com/show/033hurWHniBuxqx1hGmjjp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Listen on Spotify
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
