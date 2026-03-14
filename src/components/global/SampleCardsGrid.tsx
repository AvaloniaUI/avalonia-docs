import React from 'react';

interface Sample {
  title: string;
  description: string;
  tags?: string[];
  url: string;
}

interface SampleCardProps {
  title: string;
  description: string;
  tags?: string[];
  url: string;
}

interface SampleCardsGridProps {
  samples: Sample[];
}

// Single card component
const SampleCard = ({ title, description, tags = [], url }: SampleCardProps) => {
  return (
    <div className="bg-white border-gray-200 border-solid  rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-medium mb-2">
        <a
          href={url}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {title}
        </a>
      </h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-slate-200 text-gray-700 rounded-md text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// Grid container component
const SampleCardsGrid = ({ samples }: SampleCardsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {samples.map((sample, index) => (
        <SampleCard
          key={index}
          title={sample.title}
          description={sample.description}
          tags={sample.tags}
          url={sample.url}
        />
      ))}
    </div>
  );
};

export default SampleCardsGrid;
