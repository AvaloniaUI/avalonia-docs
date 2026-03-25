import React from 'react';

export default function HelloBar(): JSX.Element {
  return (
    <a
      href="https://github.com/AvaloniaUI/Avalonia/discussions/19108"
      target="_blank"
      className="hidden md:flex w-full items-center justify-center bg-blue-50 py-3 hover:bg-blue-100 transition-colors"
    >
      <div className="flex items-center justify-center gap-4 px-4">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium text-blue-900">
            Devolutions sponsors Avalonia with $3M over three years
          </div>
        </div>
        <div className="h-4 w-px bg-blue-200"></div>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-blue-700">Learn more</div>
        </div>
      </div>
    </a>
  );
}
