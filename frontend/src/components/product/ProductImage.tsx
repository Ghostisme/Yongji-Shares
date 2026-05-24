'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  images: string[];
  activeImage?: string;
  productName: string;
}

export function ProductImage({ images, activeImage, productName }: ProductImageProps) {
  const resolvedMain = activeImage || images[0];
  const [current, setCurrent] = useState(resolvedMain);
  const displayImage = activeImage || current;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
        <Image
          src={displayImage}
          alt={productName}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(img)}
              className={`
                relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all
                ${displayImage === img
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <Image src={img} alt={`${productName} ${idx + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
