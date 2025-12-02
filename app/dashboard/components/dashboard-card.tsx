"use client"

import { ReactNode } from "react"
import { Card } from "@/components/ui/card"
// Utility for dynamic class generation
import { cva } from "class-variance-authority" 
import { twMerge } from "tailwind-merge"

const accentStyles = cva(
    "flex items-center justify-center p-3 rounded-md w-fit transition-colors duration-300",
    {
        variants: {
            accent: {
                // Teal Accent (primary-accent defined in globals.css)
                "primary-accent": "bg-primary-accent/10 text-primary-accent group-hover:bg-primary-accent/20",
                // Red Accent for Urgency
                "destructive": "bg-destructive/10 text-destructive group-hover:bg-destructive/20",
                // Default/Secondary
                "secondary": "bg-secondary/50 text-secondary-foreground group-hover:bg-secondary/70",
            },
        },
        defaultVariants: {
            accent: "primary-accent",
        },
    }
);

export default function DashboardCard({
    title,
    value,
    footer,
    icon,
    accent,
    onClick
}: {
    title: string
    value: string | number
    footer?: string
    icon?: ReactNode
    accent?: 'primary-accent' | 'destructive' | 'secondary'
    onClick?: () => void
}) {
    return (
        <Card
            className="p-5 border-2 border-border group-hover:border-primary-accent/50 group-hover:shadow-lg transition-all duration-300 cursor-pointer bg-card"
            onClick={onClick}
        >
            <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-muted-foreground">{title}</p>
                {/* Apply dynamic accent styling to the icon container */}
                {icon && <div className={twMerge(accentStyles({ accent }))}>{icon}</div>}
            </div>

            <p className="text-4xl font-extrabold tracking-tight mt-1">{value}</p>
            
            {footer && (
                <p className="text-xs text-muted-foreground mt-4 border-t border-border pt-3">
                    {footer}
                </p>
            )}
        </Card>
    )
}