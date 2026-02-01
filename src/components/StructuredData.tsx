import siteData from "../../data/site.json";

// LocalBusiness + Organization 構造化データ
export default function StructuredData() {
  const { company, contact, locations, localVisual, stats, services, seo, images } = siteData;
  const siteUrl = seo.siteUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: company.name,
        alternateName: company.nameShort,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}${images.logo}`,
        },
        foundingDate: company.established,
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: parseInt(company.employees) || 15,
        },
        slogan: company.catchphrase,
      },
      // LocalBusiness
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: company.name,
        image: `${siteUrl}${images.companyExterior}`,
        "@context": "https://schema.org",
        url: siteUrl,
        telephone: contact.phone,
        email: contact.email,
        priceRange: "¥¥",
        address: {
          "@type": "PostalAddress",
          streetAddress: locations.headquarters.address,
          addressLocality: locations.headquarters.city,
          addressRegion: locations.headquarters.prefecture,
          postalCode: locations.headquarters.zipCode,
          addressCountry: "JP",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: locations.headquarters.lat,
          longitude: locations.headquarters.lng,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
        areaServed: localVisual.regions.map((region) => ({
          "@type": "City",
          name: region.name,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "サービス一覧",
          itemListElement: services.map((service, index) => ({
            "@type": "Offer",
            "@id": `${siteUrl}/service#${service.id}`,
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
            },
            position: index + 1,
          })),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: stats.projectsCompleted.toString(),
        },
      },
      // WebSite
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: company.name,
        description: seo.defaultDescription,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "ja",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
