import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { yatraDiaries } from '../data/yatraDiaries';
import SEOHead from '../components/SEOHead';

const YatraDiariesPage = () => {
  return (
    <>
      <SEOHead
        title="Yatra Diaries — Sikh Pilgrimage Guides & Stories | Baarik Yatra"
        description="In-depth guides, visa information, and personal accounts from Sikh pilgrims who have completed the yatra to Pakistan. Written for Canadian families."
        canonical="https://yatra.baariktravel.ca/yatra-diaries"
        ogImage="/Darbar Sahib Kartarpur.jpg"
      />
      <div className="bg-navy min-h-screen pt-24">
        {/* Header */}
        <div className="w-full px-6 lg:px-12 py-16 border-b border-gold-dim">
          <div className="max-w-6xl mx-auto">
            <span className="eyebrow block mb-4">YATRA DIARIES</span>
            <h1 className="font-serif text-h2 text-text-primary mb-6">
              Guides, stories, and<br />everything you need to know.
            </h1>
            <p className="text-text-secondary max-w-2xl leading-relaxed">
              Written for Canadian Sikh families planning their first — or next — pilgrimage to Pakistan.
              Practical information, spiritual context, and honest accounts from the road.
            </p>
          </div>
        </div>

        {/* Featured Article */}
        <div className="w-full px-6 lg:px-12 py-16 border-b border-gold-dim">
          <div className="max-w-6xl mx-auto">
            {yatraDiaries[0] && (
              <Link to={`/yatra-diaries/${yatraDiaries[0].slug}`} className="group block">
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                  <div className="w-full lg:w-1/2 relative aspect-[16/9] rounded-lg overflow-hidden gold-border">
                    <img
                      src={yatraDiaries[0].heroImage}
                      alt={yatraDiaries[0].title}
                      className="w-full h-full object-cover image-cinematic transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                    <span className="absolute top-4 left-4 bg-gold text-navy text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-gold" />
                        {yatraDiaries[0].category}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        {yatraDiaries[0].readTime}
                      </span>
                      <span>{yatraDiaries[0].date}</span>
                    </div>
                    <h2 className="font-serif text-3xl lg:text-4xl text-text-primary mb-4 leading-tight group-hover:text-gold transition-colors duration-300">
                      {yatraDiaries[0].title}
                    </h2>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {yatraDiaries[0].excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300">
                      Read the full guide
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Article Grid */}
        <div className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {yatraDiaries.slice(1).map((diary) => (
                <Link
                  key={diary.slug}
                  to={`/yatra-diaries/${diary.slug}`}
                  className="group block card-luxury overflow-hidden"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={diary.heroImage}
                      alt={diary.title}
                      className="w-full h-full object-cover image-cinematic transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    <span className="absolute top-4 left-4 bg-navy/80 backdrop-blur-sm text-gold text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-gold-dim">
                      {diary.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-gold" />
                        {diary.readTime}
                      </span>
                      <span>{diary.date}</span>
                    </div>
                    <h3 className="font-serif text-xl text-text-primary mb-3 leading-tight group-hover:text-gold transition-colors duration-300">
                      {diary.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                      {diary.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YatraDiariesPage;
