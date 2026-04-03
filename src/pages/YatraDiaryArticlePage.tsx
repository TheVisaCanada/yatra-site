import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Calendar, ArrowRight } from 'lucide-react';
import { yatraDiaries } from '../data/yatraDiaries';
import SEOHead from '../components/SEOHead';

const renderContent = (content: string) => {
  return content
    .trim()
    .split('\n\n')
    .map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Bold headings: **text**
      if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.slice(2, -2).includes('\n')) {
        return (
          <h3 key={i} className="font-serif text-2xl text-text-primary mt-10 mb-4">
            {trimmed.slice(2, -2)}
          </h3>
        );
      }

      // Bullet list
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').filter(l => l.startsWith('- '));
        return (
          <ul key={i} className="list-disc list-outside pl-5 space-y-2 text-text-secondary leading-relaxed my-4">
            {items.map((item, j) => (
              <li key={j}>{item.slice(2)}</li>
            ))}
          </ul>
        );
      }

      // Inline bold + links within paragraph
      const parts = trimmed.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-text-primary font-semibold">{part.slice(2, -2)}</strong>;
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          return (
            <Link key={j} to={linkMatch[2]} className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">
              {linkMatch[1]}
            </Link>
          );
        }
        return part;
      });

      return (
        <p key={i} className="text-text-secondary leading-relaxed my-4">
          {rendered}
        </p>
      );
    });
};

const YatraDiaryArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const diary = yatraDiaries.find(d => d.slug === slug);

  if (!diary) return <Navigate to="/yatra-diaries" replace />;

  const currentIndex = yatraDiaries.findIndex(d => d.slug === slug);
  const nextDiary = yatraDiaries[currentIndex + 1] || yatraDiaries[0];

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: diary.title,
    description: diary.excerpt,
    image: `https://yatra.baariktravel.ca${diary.heroImage}`,
    datePublished: diary.date,
    author: {
      '@type': 'Organization',
      name: 'Baarik Travel & Tours Inc.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Baarik Travel & Tours Inc.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yatra.baariktravel.ca/barrik-logo-orange.png',
      },
    },
    mainEntityOfPage: `https://yatra.baariktravel.ca/yatra-diaries/${diary.slug}`,
  };

  return (
    <>
      <SEOHead
        title={`${diary.title} | Yatra Diaries — Baarik Yatra`}
        description={diary.excerpt}
        canonical={`https://yatra.baariktravel.ca/yatra-diaries/${diary.slug}`}
        ogImage={`https://yatra.baariktravel.ca${diary.heroImage}`}
        schema={blogPostingSchema}
      />
      <div className="bg-navy min-h-screen pt-24">
        {/* Back Nav */}
        <div className="w-full px-6 lg:px-12 pt-8 pb-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/yatra-diaries"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Yatra Diaries
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <div className="w-full px-6 lg:px-12 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 text-xs text-text-secondary mb-6">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-gold" />
                {diary.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {diary.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                {diary.date}
              </span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-text-primary leading-tight mb-8">
              {diary.title}
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed italic border-l-2 border-gold pl-6">
              {diary.excerpt}
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full px-6 lg:px-12 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/7] rounded-lg overflow-hidden gold-border">
              <img
                src={diary.heroImage}
                alt={diary.title}
                className="w-full h-full object-cover image-cinematic"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="w-full px-6 lg:px-12 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="prose-yatra">
              {renderContent(diary.content)}
            </div>

            {/* CTA Block */}
            <div className="mt-16 p-8 rounded-lg bg-charcoal gold-border text-center">
              <h3 className="font-serif text-2xl text-text-primary mb-3">
                Ready to plan your yatra?
              </h3>
              <p className="text-text-secondary mb-6">
                Our team responds within 24 hours. Tell us your dates and group size.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Contact Baarik Yatra
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Next Article */}
            {nextDiary && nextDiary.slug !== slug && (
              <div className="mt-12 pt-12 border-t border-gold-dim">
                <span className="eyebrow block mb-4">NEXT IN YATRA DIARIES</span>
                <Link
                  to={`/yatra-diaries/${nextDiary.slug}`}
                  className="group flex items-center justify-between gap-4 hover:text-gold transition-colors duration-300"
                >
                  <h4 className="font-serif text-xl text-text-primary group-hover:text-gold transition-colors duration-300">
                    {nextDiary.title}
                  </h4>
                  <ArrowRight className="w-5 h-5 text-gold flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default YatraDiaryArticlePage;
