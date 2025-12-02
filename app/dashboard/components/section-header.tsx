import Link from "next/link"

export default function SectionHeader({ 
    title, 
    linkHref, 
    linkText 
}: { 
    title: string,
    linkHref?: string,
    linkText?: string
}) {
    return (
        <div className="flex justify-between items-end border-b border-border pt-6 pb-2">
            <h2 className="text-xl font-bold tracking-tight">
                {title}
            </h2>
            {linkHref && linkText && (
                <Link 
                    href={linkHref} 
                    className="text-sm font-semibold text-primary-accent hover:text-primary-accent/80 transition-colors"
                >
                    {linkText} →
                </Link>
            )}
        </div>
    )
}