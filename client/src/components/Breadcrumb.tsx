import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { addJsonLdSchema, createBreadcrumbSchema } from "@/lib/meta";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  useEffect(() => {
    // Add breadcrumb schema markup
    const schema = createBreadcrumbSchema(items);
    addJsonLdSchema(schema);
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-gray-50 border-b border-gray-200">
      <div className="container max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              {index === items.length - 1 ? (
                <span className="text-gray-900 font-medium">{item.name}</span>
              ) : (
                <Link href={item.url} className="text-blue-600 hover:text-blue-800 hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
