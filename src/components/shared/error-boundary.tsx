"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-lg font-semibold text-danger">Something went wrong</h2>
          <p className="mt-2 text-sm text-muted">{this.state.error?.message ?? "An unexpected error occurred"}</p>
        </div>
      )
    }
    return this.props.children
  }
}
