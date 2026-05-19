"use client"

import Image from "next/image"
import Link from "next/link"
import { LayoutDashboard } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

interface LogoProps {
  className?: string
  href?: string
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl"
  showText?: boolean
  /** Optional class for the text wrapper - useful for hiding in collapsed sidebars */
  textClassName?: string
}

export function Logo({ className = "", href = "/dashboard", size = "md", showText = false, textClassName = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
    xxl: "h-32 w-32",
    xxxl: "h-40 w-40"
  }

  const iconSizeClasses = {
    sm: "h-5 w-5",
    md: "h-7 w-7",
    lg: "h-9 w-9",
    xl: "h-12 w-12",
    xxl: "h-16 w-16",
    xxxl: "h-20 w-20"
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-2xl",
    xxl: "text-3xl",
    xxxl: "text-3xl"
  }

  const useLogoImage = !!siteConfig.logoUrl

  const logoElement = (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg ${!useLogoImage ? "bg-primary/20" : ""}`}>
        {useLogoImage ? (
          <Image
            src={siteConfig.logoUrl}
            alt={`${siteConfig.siteName} Logo`}
            fill
            className="object-contain"
            sizes={size === "sm" ? "32px" : size === "md" ? "48px" : size === "lg" ? "64px" : "96px"}
          />
        ) : (
          <LayoutDashboard className={`${iconSizeClasses[size]} text-primary`} />
        )}
      </div>
      {showText && (
        <div className={`flex flex-col shrink-0 min-w-0 ${textClassName}`}>
          <span className={`${textSizeClasses[size]} font-bold text-sidebar-primary truncate`}>{siteConfig.siteName}</span>
          {siteConfig.organizationName && (
            <span className="text-xs text-sidebar-foreground/60 truncate">{siteConfig.organizationName}</span>
          )}
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {logoElement}
      </Link>
    )
  }

  return logoElement
}
