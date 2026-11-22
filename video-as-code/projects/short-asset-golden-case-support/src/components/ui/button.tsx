import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        dashboardPrimary:
          'bg-[var(--dashboard-action-primary-bg)] text-[var(--dashboard-action-primary-fg)] hover:bg-[var(--dashboard-action-primary-hover-bg)] disabled:bg-[var(--dashboard-action-primary-disabled-bg)] disabled:text-[var(--dashboard-action-primary-fg)] disabled:opacity-100',
        dashboardTinted:
          'border border-[var(--dashboard-action-tinted-border)] bg-[var(--dashboard-action-tinted-bg)] text-[var(--dashboard-action-tinted-fg)] hover:bg-[var(--dashboard-action-tinted-hover-bg)] hover:text-[var(--dashboard-action-tinted-fg)] disabled:border-[var(--dashboard-action-tinted-disabled-border)] disabled:bg-[var(--dashboard-action-tinted-disabled-bg)] disabled:text-[var(--dashboard-action-tinted-disabled-text)] disabled:opacity-100',
        dashboardSecondary:
          'bg-[var(--dashboard-action-secondary-bg)] text-[var(--dashboard-action-secondary-text)] hover:bg-[var(--dashboard-action-secondary-hover-bg)] disabled:bg-[var(--dashboard-action-secondary-disabled-bg)] disabled:text-[var(--dashboard-action-secondary-disabled-text)] disabled:opacity-100',
        dashboardGhost:
          'text-[var(--dashboard-text-muted)] hover:bg-[var(--dashboard-row-hover-bg)] hover:text-[var(--dashboard-title-text)]',
        dashboardTintedGhost:
          'text-[var(--dashboard-action-tinted-fg)] hover:bg-[var(--dashboard-action-tinted-bg)] hover:text-[var(--dashboard-action-tinted-fg)] disabled:text-[var(--dashboard-action-tinted-disabled-text)]',
      },
      size: {
        default: 'h-[var(--button-height-default)] px-4 py-2',
        sm: 'h-[var(--button-height-sm)] rounded-md px-3 text-xs',
        lg: 'h-[var(--button-height-lg)] rounded-md px-8',
        icon: 'h-[var(--button-size-icon)] w-[var(--button-size-icon)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        data-slot="button"
        data-size={size ?? 'default'}
        data-variant={variant ?? 'default'}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
